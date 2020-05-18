import React, { FunctionComponent, useState } from 'react'
import Card from '../card'
import useSharedState from '../../libs/useSharedState'
import useSWR from 'swr'
import { getUserSettings, updateUserSettings } from '../../libs/fetcher/userFetcher'
import LoadingCard from '../cards/loadingcard'
import { UserSettings } from '../../models/UserSettings'
import { faDotCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Settings: FunctionComponent = () => {
  const { data, error } = useSWR('/user/settings', getUserSettings)
  const [userState, setUserState] = useSharedState('user', null)
  const [settings, setSettings] = useState<UserSettings[]>(data)
  const [settingChanged, setSettingChanged] = useState<boolean>(false)
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false)

  if (error != null) {
    console.log(error)
    return <div>Failed to load.</div>
  }
  if (data == null) return <LoadingCard title={'Settings'}/>

  function handleSettingChanged (key: string, newValue: boolean): void {
    let currentValues = settings == null ? data : settings
    const currentSetting = currentValues.filter(setting => setting.settingKey === key)[0]
    currentSetting.settingValue = newValue

    currentValues = currentValues
      .filter(setting => setting.settingKey !== key)
      .concat(
        currentSetting
      )

    setSettings(currentValues)
    setSettingChanged(true)
  }

  function handleSaveOnClick (): void {
    const settingsData: any[] = []
    settings.map(set => {
      settingsData.push({
        [set.settingKey]: set.settingValue
      })
    })
    updateUserSettings(settingsData)
      .then(data => {
        if (data.success) {
          setSettingChanged(false)
          setSettingsSaved(true)
          setTimeout(() => setSettingsSaved(false), 3000)
        }
      })
  }

  return (
    <>
      <Card title="Settings" className="w-11/12 md:w-2/5 card-success">
        <div className="flex justify-center flex-wrap animated relative mb-12">
          <div className={`w-full flex justify-center animated absolute ${settingChanged ? 'opacity-1' : 'opacity-0'}`}>
            <FontAwesomeIcon className="text-yellow-500 unsaved-settings text-2xl" icon={faDotCircle}/>
            <p className="ml-4 text-md italic">You have unsaved settings</p>
          </div>
          <div className={`w-full flex justify-center animated mb-10 absolute ${settingsSaved ? 'opacity-1' : 'opacity-0'}`}>
            <FontAwesomeIcon className="text-green-500 text-2xl" icon={faDotCircle}/>
            <p className="ml-4 text-md italic">Settings saved!</p>
          </div>
        </div>
        {data.map(setting => {
          return <div key={setting.settingKey} className="md:flex md:items-center setting-wrapper">
            <p className="w-full text-center text-lg md:w-1/4 capitalize font-bold md:font-normal">{setting.settingTitle}</p>
            <p className="w-full text-center md:w-1/2 text-center italic md:text-sm">{setting.settingDescription}</p>
            <div className="w-full text-center md:w-1/4 md:text-right md:flex md:items-center md:justify-end mt-4 md:mt-0">
              <div className="checkbox">
                <input type="checkbox" name={setting.settingKey} id={setting.settingKey} defaultChecked={setting.settingValue} onChange={(e): void => handleSettingChanged(setting.settingKey, e.target.checked)}/>
                <label htmlFor={setting.settingKey}>{setting.settingTitle}</label>
              </div>
            </div>
          </div>
        })}
        {settingChanged && <div className="m-auto text-center mt-10"><button className="button animated" onClick={() => handleSaveOnClick()}>Save Changes</button></div>}
      </Card>
    </>
  )
}

export default Settings
