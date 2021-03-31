import { getNavigationLinks } from 'lib/navigation/NavigationLinks'
import { FunctionComponent } from 'react'
import styles from './NavbarMobileLinks.module.scss'

type NavbarMobileLinksProps = {
  visible: boolean;
}

export const NavbarMobileLinks: FunctionComponent<NavbarMobileLinksProps> = ({ visible }) => {
  return (
    <div className="space-y-4">
      {getNavigationLinks().map(link => {
        return <a className="block" href={link.href}>
          <button key={link.id} className={`${styles['service-button']} ${styles[`service-button-${link.id}`]}`}>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={link.iconPath} />
            </svg>
            <p>{link.title}</p>
          </button>
        </a>
      })}
    </div>
  )
}