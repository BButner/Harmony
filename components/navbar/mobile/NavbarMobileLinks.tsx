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
  return (
    <div className="space-y-4">
      {getNavigationLinks().map(link => {
        return <a className="block" href={link.href}>
          <button key={link.id} className={`${styles['service-button']} ${styles[`service-button-${link.id}`]}`}>
            <Icon path={link.icon} size={1} />
            <p>{link.title}</p>
          </button>
        </a>
      })}
    </div>
  )
}