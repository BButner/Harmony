import { ENDPOINT_IMAGES } from 'lib/api/Endpoints'
import { ModelUserSelf } from 'models/user/ModelUser'
import Link from 'next/link'
import { FunctionComponent } from 'react'

type NavbarMobileUserProps = {
  self: ModelUserSelf;
}

export const NavbarMobileUser: FunctionComponent<NavbarMobileUserProps> = ({ self }) => {
  return (
    <div className="space-y-4">
      <img src={ENDPOINT_IMAGES + self.avatarUrl} className="rounded-full w-32 h-32 m-auto" />
      <div className="bg-gray-200 rounded-2xl p-2 text-center">
        <p className="text-xl">{self.username}</p>
        <p className="text-gray-600 text-lg">{self.displayName}</p>
        <p className="text-gray-500 text-sm italic">{self.email}</p>
      </div>
      <button className="button-blue w-full">Settings</button>
      <button className="button-red w-full">Logout</button>
    </div>
  )
}