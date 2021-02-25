import { BackgroundBlur } from 'components/popup/BackgroundBlur'
import { motion } from 'framer-motion'
import { getNavigationLinks } from 'lib/navigation/NavigationLinks'
import { FunctionComponent } from 'react'
import * as AnimatePopup from 'lib/animations/PopupGeneric'
import styles from './NavbarMobileLinks.module.scss'
import Icon from '@mdi/react'

type NavbarMobileLinksProps = {
  visible: boolean;
}

export const NavbarMobileLinks: FunctionComponent<NavbarMobileLinksProps> = ({ visible }) => {
  const variants = AnimatePopup.mobilePopupVariants

  return (
    <div className="block md:hidden z-10">
      <BackgroundBlur visible={visible}>
        <motion.li className={`w-full rounded-t-2xl bg-white p-4 absolute bottom-0 space-y-4 z-10 ${styles.wrapper}`} variants={variants} initial="hidden" animate="visible" exit="exit">
          <p className="text-gray-400 text-center">Service Selection</p>

          {getNavigationLinks().map(link => {
            return <button key={link.id} className={`${styles['service-button']} ${styles[`service-button-${link.id}`]}`}>
              <Icon path={link.icon} size={1} />
              <p>{link.title}</p>
            </button>
          })}
        </motion.li>
      </BackgroundBlur>
    </div>
  )
}