import CardGeneric from 'components/generic/card/CardGeneric'
import InformationWrapper from 'components/generic/information/InformationWrapper'
import StatsWrapper from 'components/generic/information/StatsWrapper'
import { ModelUser } from 'models/user/ModelUser'
import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import Config from 'config/default.json'

type UserProfileProps = {
  user: ModelUser;
}

const UserProfile: FunctionComponent<UserProfileProps> = ({ user }) => {
  return (
    <CardGeneric className="w-64 h-full flex flex-wrap flex-col justify-center">
      <div className="p-4 w-full flex justify-center items-center">
        <Image className="w-full rounded-full avatar-shadow" width={125} height={125} src={`${Config.bucketUrl}${user.avatarUrl}`} quality={100} priority />
      </div>
      <InformationWrapper className="w-full">
        <p className="text-xl">{user.username}</p>
        <p className="text-color-alt">{user.displayName}</p>
        <p className="text-color-alt">{user.email}</p>
      </InformationWrapper>
      <div className="flex-1 w-full mt-2 mb-2 space-y-2">
        <StatsWrapper>
          <b>97</b> Followers
        </StatsWrapper>
        <StatsWrapper>
          <b>29</b> Shared Playlists
        </StatsWrapper>
        <StatsWrapper>
          <b>192</b> Playlists Transferred
        </StatsWrapper>
      </div>
      <div className="space-y-2 w-full">
        <button className="button-blue w-full">Settings</button>
        <form action={`${Config.apiUrl}/logout`} method="post">
          <button className="button-red w-full">Logout</button>
        </form>
      </div>
    </CardGeneric>
  )
}

export default UserProfile