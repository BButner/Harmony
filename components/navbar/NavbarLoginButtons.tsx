import { getLoginLinks } from 'lib/navigation/NavigationLinks'
import Link from 'next/link'
import { FunctionComponent } from 'react'

export const NavbarLoginButtons: FunctionComponent = () => {
  return (
    <div className="space-y-4">
      {getLoginLinks().map(link => {
        return (
          <Link key={link.id} href={`${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/authorization/${link.id}`}>
            <button className={`block w-full py-4 md:py-2 m-auto button-${link.id} relative shadow-lg`}>
              {link.title}
              <div className="absolute left-4 h-full w-6 flex items-center justify-center top-1/2 transform -translate-y-1/2">
                <img className="w-6 h-6" src={`/img/login/${link.id}-login.png`} />
              </div>
            </button>
          </Link>
        )
      })}
    </div>
  )
}