import React, { FunctionComponent } from 'react'
import { ModelUserSelf } from 'models/user/ModelUser'
import UserLogin from './UserLogin'
import UserInfo from './UserInfo'

type UserProps = {
  self?: ModelUserSelf
}

const User: FunctionComponent<UserProps> = ({ self }) => {
  return (
    <>
      {!self && <UserLogin />}
      {self && <UserInfo self={self} />}
    </>
  )
}

export default User