import { FunctionComponent, useState } from 'react'
import useSWR from 'swr'
import { ModelUserSelf } from 'models/user/ModelUser'
import styles from './NavbarAccess.module.scss'
import { NavbarLogin } from './NavbarLogin'
import { AnimatePresence } from 'framer-motion'
import { fetchUserSelf } from 'lib/api/user/UserFetcher'
import { NavbarUser } from './NavbarUser'

export const NavbarAccess: FunctionComponent = () => {
  const { data: self, error } = useSWR<ModelUserSelf, any>('/user/self', fetchUserSelf)
  const [loginButtonsVisible, setLoginButtonsVisible] = useState<boolean>(false)
  
  if (self) {
    return <NavbarUser self={self} />
  } else {
    return (
      <div className="hidden md:block md:w-full space-y-2 relative">
        <button className={`block w-full ${styles['access-button']}`} onClick={(): void => setLoginButtonsVisible(!loginButtonsVisible)} id="button-login">Login</button>
        <button className={`block w-full ${styles['access-button']}`}>Register</button>

        <AnimatePresence>
          {loginButtonsVisible && <NavbarLogin visible={loginButtonsVisible} setVisible={setLoginButtonsVisible} />}
        </AnimatePresence>
      </div>
    )
  }
}