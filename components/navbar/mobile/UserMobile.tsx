import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { ModelUserSelf } from 'models/user/ModelUser'
import Config from 'config/default.json'
import styles from './usermobile.module.scss'
import Image from 'next/image'
import InformationWrapper from 'components/generic/information/InformationWrapper'
import useSWR from 'swr'
import { fetchUserSettings } from 'lib/fetcher/FetcherUserSettings'
import DarkModeCheckbox from 'components/generic/DarkModeCheckbox'

type UserMobileProps = {
  self: ModelUserSelf;
}

const UserMobile: FunctionComponent<UserMobileProps> = ({ self }) => {
  const { data: dataSettings, mutate: mutateSettings } = useSWR('/self/settings', () => fetchUserSettings(self.idExternal))

  return (
    <div className={`p-2 space-y-4 ${styles['user-mobile-wrapper']} z-50`}>
      <div className="w-full flex justify-center">
        <Image className="rounded-full avatar-shadow" width={75} height={75} src={`${Config.bucketUrl}${self.avatarUrl}`} quality={100} priority />
      </div>
      <InformationWrapper>
        <p className="text-lg">{self.username}</p>
        <p className="text-color-alt">{self.displayName}</p>
        <p className="text-color-alt text-sm">{self.email}</p>
      </InformationWrapper>
      <DarkModeCheckbox idExternal={self.idExternal} dataSettings={dataSettings} mutateSettings={mutateSettings} />
      <div className="space-y-2">
        <Link href={`/user/${self.idExternal}`}>
          <button className="w-full">Profile</button>
        </Link>
        <button className="w-full">Settings</button>
        <form action={`${Config.apiUrl}/logout`} method="post">
          <button className="button-red w-full">Logout</button>
        </form>
      </div>
    </div>
  )
}

export default UserMobile
