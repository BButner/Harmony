import { ENDPOINT_IMAGES } from 'lib/api/Endpoints'
import { ModelUserSelf } from 'models/user/ModelUser'
import { FunctionComponent } from 'react'
import { LogoutIcon, CogIcon } from '@heroicons/react/outline'

type NavbarMobileUserProps = {
  self: ModelUserSelf;
}

export const NavbarMobileUser: FunctionComponent<NavbarMobileUserProps> = ({ self }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-36 h-36 rounded-full m-auto bg-gradient-to-br from-purple-400 to-pink-400">
        <img src={ENDPOINT_IMAGES + self.avatarUrl} className="rounded-full w-32 h-32 m-auto bg-gray-100" />
      </div>
      <div className="bg-gray-200 rounded-2xl p-2 text-center">
        <p className="text-xl">{self.username}</p>
        <p className="text-gray-600 text-lg">{self.displayName}</p>
        <p className="text-gray-500 text-sm italic">{self.email}</p>
      </div>
      <button className="button-blue w-full flex items-center justify-center space-x-2">
        <p>Settings</p>
        <CogIcon className="w-5 h-5 text-gray-200" />
      </button>
      <button className="button-red w-full flex items-center justify-center space-x-2">
        <p>Logout</p>
        <LogoutIcon className="w-5 h-5 text-gray-200" />
      </button>
    </div>
  )
}