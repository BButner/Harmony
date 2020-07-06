import React, { FunctionComponent, useState } from 'react'
import Card from '../cards/CardGeneric'
import useSWR, { mutate } from 'swr'
import { getUserSettings, updateUserSettings } from '../../libs/fetcher/userFetcher'
import LoadingCard from '../cards/CardLoading'
import { ModelUserSettings } from '../../models/user/ModelUserSettings'
import { ModelUserSelf } from '../../models/user/ModelUser'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiAlertCircle, mdiCheckCircle, mdiCloseCircle } from '@mdi/js'

interface UserSettingsTypes {
  self: ModelUserSelf;
}

const UserSettings: FunctionComponent<UserSettingsTypes> = ({ self }) => {
  const { data, error } = useSWR(`/user/${self.userName}/settings`, getUserSettings)
  const [settingChanged, setSettingChanged] = useState<boolean>(false)
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false)
  const [settingsReverted, setSettingsReverted] = useState<boolean>(false)
  const [settingsBackup, setSettingsBackup] = useState<ModelUserSettings[]>(null)

  if (error != null) {
    console.log(error)
    return <div>Failed to load.</div>
  }
  if (data == null) return <LoadingCard title={'Settings'} className="w-11/12 md:w-3/5"/>

  function handleSettingChanged (key: string, newValue: boolean): void {
    const currentValues = data
    if (settingsSaved) setSettingsSaved(false)
    if (settingsReverted) setSettingsReverted(false)
    if (settingsBackup == null) {
      setSettingsBackup(JSON.parse(JSON.stringify(data)))
    }

    currentValues.map(setting => {
      if (setting.settingKey === key) {
        setting.settingValue = newValue
      }
    })

    mutate('/user/settings', currentValues, false)
    setSettingChanged(true)
  }

  function handleSaveOnClick (): void {
    const settingsData: any[] = []
    data.map(set => {
      settingsData.push({
        [set.settingKey]: set.settingValue
      })
    })
    updateUserSettings(self.userName, settingsData)
      .then(data => {
        if (data.success) {
          setSettingChanged(false)
          setSettingsSaved(true)
          setSettingsBackup(null)
          setTimeout(() => setSettingsSaved(false), 3000)
        }
      })
  }

  function handleRevertOnClick (): void {
    setSettingChanged(false)
    setSettingsReverted(true)
    setTimeout(() => setSettingsReverted(false), 3000)
    mutate('/user/settings', settingsBackup, false)
    settingsBackup.map(setting => {
      (document.getElementById(setting.settingKey) as HTMLInputElement).checked = setting.settingValue
    })
    setSettingsBackup(null)
  }

  return (
    <>
      <Card title="Settings" className="w-11/12 md:w-2/5 m-4">
        <div className="flex justify-center flex-wrap animated relative mb-24 md:mb-12">
          <div className={`w-full flex justify-center animated absolute ${settingChanged ? 'opacity-1' : 'opacity-0'}`}>
            <Icon path={mdiAlertCircle} size={1} className="text-yellow-500 unsaved-settings text-2xl"/>
            <p className="ml-4 text-md italic">You have unsaved settings</p>
          </div>
          <div className={`w-full flex justify-center animated mb-10 absolute ${settingsSaved ? 'opacity-1' : 'opacity-0'}`}>
            <Icon path={mdiCheckCircle} size={1} className="text-teal-500 text-2xl"/>
            <p className="ml-4 text-md italic">Settings saved!</p>
          </div>
          <div className={`w-full flex justify-center animated mb-10 absolute ${settingsReverted ? 'opacity-1' : 'opacity-0'}`}>
            <Icon path={mdiCloseCircle} size={1} className="text-red-500 text-2xl"/>
            <p className="ml-4 text-md italic">Settings reverted!</p>
          </div>
        </div>
        {data.map(setting => {
          return <div key={setting.settingKey} className="md:flex md:items-center setting-wrapper">
            <p className="w-full text-center text-lg md:w-1/4 capitalize font-bold md:font-normal">{setting.settingTitle}</p>
            <p className="w-full text-center md:w-1/2 italic md:text-sm">{setting.settingDescription}</p>
            <div className="w-full text-center md:w-1/4 md:text-right md:flex md:items-center md:justify-end mt-4 md:mt-0">
              <div className="checkbox">
                <input type="checkbox" name={setting.settingKey} id={setting.settingKey} defaultChecked={setting.settingValue} onChange={(e): void => handleSettingChanged(setting.settingKey, e.target.checked)}/>
                <label htmlFor={setting.settingKey}>{setting.settingTitle}</label>
              </div>
            </div>
          </div>
        })}
        {settingChanged && <div className="m-auto text-center mt-10">
          <button className="button animated m-auto block md:inline-block" onClick={(): void => handleSaveOnClick()}>Save Changes</button>
          <button className="button animated md:ml-10 mt-4 md:mt-0 button-red" onClick={(): void => handleRevertOnClick()}>Revert Changes</button>
        </div>}
      </Card>
    </>
  )
}

UserSettings.propTypes = {
  self: PropTypes.any.isRequired
}

export default UserSettings
