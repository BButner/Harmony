import Icon from '@mdi/react'
import { mdiMagnify, mdiLock, mdiCog } from '@mdi/js'
import CardGeneric from 'components/generic/card/CardGeneric'
import React, { FunctionComponent, useState } from 'react'
import useSWR from 'swr'
import styles from './usersettings.module.scss'
import { fetchSettingCategories, fetchUserSettings } from 'lib/fetcher/FetcherUserSettings'
import { getIconFromSettingCategory, getSettingsFromCategory, getUniqueSettingCategories } from 'lib/util/SettingsUtil'
import Closable from 'components/generic/Closable'

type UserSettingsProps = {
  userId: string;
  closeFunction: Function;
}

const UserSettings: FunctionComponent<UserSettingsProps> = ({ userId, closeFunction }) => {
  const { data: dataSettings, error } = useSWR('/self/settings', url => fetchUserSettings(userId))
  const { data: dataCategories, error: errorCategories } = useSWR('/self/settings/categories', fetchSettingCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>("PRIVACY")

  if (!dataCategories) return (<p>loading...</p>)

  return (
    <CardGeneric className={`w-3/5 ${styles['settings-card']} relative`}>
      <Closable closeFunction={closeFunction} />
      <div className="flex items-center mb-4">
        <Icon path={mdiMagnify} size={1} className="text-color-alt mr-2" />
        <input type="text"/>
      </div>
      <div className="flex w-full">
        <div className="space-y-2">
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
                  <h1 className="font-bold capitalize">{setting.settingNameClean}</h1>
                  <p className="text-sm">{setting.settingDescription}</p>
                </div>
                <div className="checkbox">
                  <input type="checkbox" className="checkbox" id={setting.settingName} checked={setting.settingValue} />
                  <label htmlFor={setting.settingName}></label>
                </div>
              </div>
            })}
        </div>
      </div>
    </CardGeneric>
  )
}

export default UserSettings
