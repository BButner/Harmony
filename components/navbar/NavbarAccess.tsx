import { FunctionComponent, useState } from 'react'
import styles from './NavbarAccess.module.scss'
import { NavbarLogin } from './NavbarLogin'
import { AnimatePresence } from 'framer-motion'
import { NavbarUser } from './NavbarUser'
import HarmonyApi from 'lib/api/HarmonyApi'
import { LoginIcon, PencilAltIcon } from '@heroicons/react/outline'

export const NavbarAccess: FunctionComponent = () => {
  const self = new HarmonyApi().userApi.getUserSelf()
  const [loginButtonsVisible, setLoginButtonsVisible] = useState<boolean>(false)

  if (self.isLoading || self.isError || !self.data) {
    return (
      <div className="hidden md:block md:w-full space-y-2 relative">
        <button
          className={`w-full ${styles['access-button']}`}
          onClick={(): void => setLoginButtonsVisible(!loginButtonsVisible)}
          id="button-login"
        >
          <p>Login</p>
          <LoginIcon className="w-5 h-5 text-gray-400" />
        </button>
        <button
          className={`w-full ${styles['access-button']}`}
        >
          <p>Register</p>
          <PencilAltIcon className="w-5 h-5 text-gray-400" />
        </button>

        <AnimatePresence>
          {loginButtonsVisible && <NavbarLogin visible={loginButtonsVisible} setVisible={setLoginButtonsVisible} />}
        </AnimatePresence>
      </div>
    )
  } else if (self.isSuccess && self.data) {
    return <NavbarUser self={self.data} />
  }
}