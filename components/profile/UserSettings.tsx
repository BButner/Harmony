import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'
import CardGeneric from 'components/generic/card/CardGeneric'
import React, { FunctionComponent } from 'react'
import useSWR from 'swr'
import styles from './usersettings.module.scss'

type UserSettingsProps = {
  userId: string;
}

const UserSettings: FunctionComponent<UserSettingsProps> = ({ userId }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <CardGeneric className="w-3/5">
        <div className="flex items-center mb-2">
          <Icon path={mdiMagnify} size={1.25} className="text-color-alt" />
          <input type="text"/>
        </div>
        <div className="flex">
          <div className="space-y-2">
            <button className={styles['category-button']}>
              Privacy
            </button>
            <button className={styles['category-button']}>
              Miscellaneous
            </button>
          </div>
          <div>

          </div>
        </div>
      </CardGeneric>
    </div>
  )
}

export default UserSettings
