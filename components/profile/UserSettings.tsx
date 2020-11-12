import Icon from '@mdi/react'
import { mdiMagnify, mdiAccount } from '@mdi/js'
import CardGeneric from 'components/generic/card/CardGeneric'
import React, { FunctionComponent, useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import styles from './usersettings.module.scss'
import { fetchSettingCategories, fetchUserSettings } from 'lib/fetcher/FetcherUserSettings'
import { getIconFromSettingCategory, getSettingsFromCategory, getUniqueSettingCategories, settingsChanged } from 'lib/util/SettingsUtil'
import Closable from 'components/generic/Closable'

type UserSettingsProps = {
  userId: string;
  closeFunction: Function;
}

const UserSettings: FunctionComponent<UserSettingsProps> = ({ userId, closeFunction }) => {
  const { data: dataSettings, error, mutate: mutateSettings  } = useSWR('/self/settings', url => fetchUserSettings(userId))
  const { data: dataCategories, error: errorCategories } = useSWR('/self/settings/categories', fetchSettingCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>("GENERAL")

  if (!dataCategories || !dataSettings) return (<p>loading...</p>)

  const handleCheckboxClick = (checkbox: HTMLInputElement) => {
    mutateSettings({...dataSettings, [checkbox.id]: !dataSettings[checkbox.id] }, false)
  }

  return (
    <CardGeneric className={`w-3/5 ${styles['settings-card']} relative`}>
      <Closable closeFunction={closeFunction} />
      <div className="flex items-center mb-4">
        <Icon path={mdiMagnify} size={1} className="text-color-alt mr-2" />
        <input type="text" id="settings-search"/>
      </div>
      <div className="flex w-full">
        <div className="space-y-2">
          <button
            className={`${styles['category-button']} ${selectedCategory === "GENERAL" ? styles['category-button-selected'] : ''} capitalize`}
            onClick={(): void => setSelectedCategory("GENERAL")}
          >
            <Icon path={mdiAccount} size={0.8} className="absolute text-color-alt" />
            General
          </button>
          {getUniqueSettingCategories(dataCategories).map(cat => {
            return <button
              className={`${styles['category-button']} ${selectedCategory === cat ? styles['category-button-selected'] : ''} capitalize`}
              onClick={(): void => setSelectedCategory(cat)}
            >
              <Icon path={getIconFromSettingCategory(cat)} size={0.8} className="absolute text-color-alt" />
              {cat.toLowerCase()}
            </button>
          })}
        </div>
        <div className="ml-4 w-full space-y-2">
          {getSettingsFromCategory(selectedCategory, dataCategories, dataSettings).map(setting => {
              return <div className={`flex justify-between items-center w-full ${styles['setting-node']}`}>
                <div>
                  <h1 className="capitalize">{setting.settingNameClean}</h1>
                  <p className="text-xs text-color-alt">{setting.settingDescription}</p>
                </div>
                <div className="checkbox">
                  <input type="checkbox" className="checkbox" id={setting.settingName} checked={dataSettings[setting.settingName]} onChange={(e): void => handleCheckboxClick(e.target)} />
                  <label htmlFor={setting.settingName}></label>
                </div>
              </div>
            })}
        </div>
        <div className="absolute bottom-0 right-0 p-4 space-x-2">
          <button className="button-teal">Save</button>
          <button className="button-red">Cancel</button>
        </div>
      </div>
    </CardGeneric>
  )
}

export default UserSettings
