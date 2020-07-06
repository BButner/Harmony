import React, { FunctionComponent, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import CardGeneric from '../cards/CardGeneric'
import Icon from '@mdi/react'
import { mdiBadgeAccountOutline, mdiCheck, mdiRefresh, mdiAlertOutline } from '@mdi/js'
import { ModelUserSelf } from '../../models/user/ModelUser'
import { validateUsername, updateUser } from '../../libs/fetcher/userFetcher'
import LoadingIcon from '../LoadingIcon'

interface SetUsernameTypes {
  self: ModelUserSelf;
}

enum CheckStatus {
  VALID = 2,
  INVALID = 1,
  CHECKING = 0,
  NOT_SET = -1
}

const SetUsername: FunctionComponent<SetUsernameTypes> = ({ self }) => {
  const inputUsername = useRef(null)
  let timer = null
  const [status, setStatus] = useState<CheckStatus>(CheckStatus.NOT_SET)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [settingUsername, setSettingUsername] = useState<boolean>(false)

  const checkUsername = (): void => {
    setStatus(CheckStatus.CHECKING)
    validateUsername(inputUsername.current.value)
      .then(resp => {
        if (resp.success) {
          setStatus(CheckStatus.VALID)
          setErrorMessage('')
        } else {
          setStatus(CheckStatus.INVALID)
          setErrorMessage(resp.message as string)
        }
      })
  }

  const startTimer = (): void => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(checkUsername, 750)
  }

  const handleUsernameTextChanged = (): void => {
    if (inputUsername.current.value.length > 0) startTimer()
    else {
      clearTimeout(timer)
      setStatus(CheckStatus.NOT_SET)
      setErrorMessage('')
    }
  }

  const getInputStatus = (): string => {
    switch (status) {
      case CheckStatus.VALID: return 'input-text-ok'
      case CheckStatus.INVALID: return 'input-text-error'
      default: return ''
    }
  }

  const handleSetUsernameOnClick = (): void => {
    setSettingUsername(true)
    updateUser({ userName: inputUsername.current.value })
      .then(resp => {
        setSettingUsername(false)
      })
  }

  return (
    <CardGeneric className="flex justify-between align-center items-center relative">
      <Icon path={mdiBadgeAccountOutline} size={4} className="text-purple-500"/>
      <div className="ml-10">
        <p className="mb-4 text-2xl">How about a username?</p>
        <div className="flex justify-between">
          <input type="text" placeholder="e.g. JohnAppleseed" className={`animated w-full block ${getInputStatus()}`} onChange={handleUsernameTextChanged} ref={inputUsername}/>
          <div className="relative pt-1 pb-1 pl-2">
            <Icon path={mdiCheck} size={1} className={`text-teal-500 absolute animated ${status === CheckStatus.VALID && inputUsername.current.value.length > 0 ? 'opacity-1' : 'opacity-0'}`}/>
            <Icon path={mdiRefresh} size={1} className={`text-blue-500 absolute animated ${status === CheckStatus.CHECKING && inputUsername.current.value.length > 0 ? 'opacity-1' : 'opacity-0'}`} spin/>
            <Icon path={mdiAlertOutline} size={1} className={`text-red-500 absolute animated ${status === CheckStatus.INVALID && inputUsername.current.value.length > 0 ? 'opacity-1' : 'opacity-0'}`}/>
          </div>
        </div>
        <p className={`text-red-500 mt-2 mb-2 ${errorMessage.length > 0 ? 'opacity-100' : 'opacity-0'} animated`}>{errorMessage}&nbsp;</p>
        <div className="w-full">
          <button className="button-teal" disabled={status !== CheckStatus.VALID} onClick={handleSetUsernameOnClick}>Set Username</button>
        </div>
      </div>
      {settingUsername && <LoadingIcon/>}
    </CardGeneric>
  )
}

SetUsername.propTypes = {
  self: PropTypes.any.isRequired
}

export default SetUsername
