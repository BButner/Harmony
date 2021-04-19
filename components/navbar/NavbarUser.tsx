import { ModelUserSelf } from 'models/user/ModelUser'
import { FunctionComponent, useState, useEffect } from 'react'
import { ENDPOINT_IMAGES } from 'lib/api/Endpoints'
import { AnimatePresence } from 'framer-motion'
import { NavbarUserCard } from './NavbarUserCard'

type NavbarUserProps = {
  self: ModelUserSelf;
}

export const NavbarUser: FunctionComponent<NavbarUserProps> = ({ self }) => {
  const [userCardVisible, setUserCardVisible] = useState<boolean>(false)

  return (
    <div className="hidden lg:block lg:w-full relative">
      <div
        className="w-full bg-gray-800 rounded-xl p-2 flex items-center text-lg transition duration-200 hover:bg-gray-900 cursor-pointer"
        onClick={(): void => setUserCardVisible(!userCardVisible)}
        id="navbar-button-user"
      >
        <img src={ENDPOINT_IMAGES + self.avatarUrl} className="w-10 h-10 rounded-full mr-4" />
        <p>{self.username}</p>
      </div>
      <AnimatePresence>
        {userCardVisible && <NavbarUserCard self={self} setVisible={setUserCardVisible} />}
      </AnimatePresence>
    </div>
  )
}