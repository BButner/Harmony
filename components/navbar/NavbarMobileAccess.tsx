import { BackgroundBlur } from 'components/popup/BackgroundBlur'
import { motion } from 'framer-motion'
import { fetchUserSelf } from 'lib/api/user/UserFetcher'
import { ModelUserSelf } from 'models/user/ModelUser'
import { FunctionComponent, useState } from 'react'
// import useSWR from 'swr'
import * as AnimatePopup from 'lib/animations/PopupGeneric'
import styles from './NavbarMobileAccess.module.scss'

type NavbarMobileAccessProps = {
  visible: boolean;
}

export const NavbarMobileAccess: FunctionComponent<NavbarMobileAccessProps> = ({ visible }) => {
  // const { data: self, error } = useSWR<ModelUserSelf, any>('/user/self', fetchUserSelf)
  const self = null
  const variants = AnimatePopup.mobilePopupVariants

  if (self) {
    return <p>test</p>
  } else {
    return (
      <div className="block md:hidden z-10">
        <BackgroundBlur visible={visible}>
          <motion.li
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`w-full rounded-t-2xl bg-white p-4 absolute bottom-0 space-y-4 z-10 text-center ${styles.wrapper}`}
          >
            <p>Already have an account?</p>
          </motion.li>
        </BackgroundBlur>
      </div>
    )
  }
}