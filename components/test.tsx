import React, { FunctionComponent, useState } from 'react'
import useSharedState from '../libs/useSharedState'
import { useUserState } from '../libs/store/userStore'

const TestView: FunctionComponent = () => {
  const [user, setUser] = useUserState()

  return (
    <div>
      This is a test
      {user && <div>This is a testing {user.userName}</div>}
    </div>
  )
}

export default TestView
