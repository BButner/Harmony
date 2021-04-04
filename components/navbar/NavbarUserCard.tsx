import { motion } from 'framer-motion'
import { ENDPOINT_IMAGES } from 'lib/api/Endpoints'
import { handleModalInteraction } from 'lib/navigation/ModalHandler'
import { ModelUserSelf } from 'models/user/ModelUser'
import { FunctionComponent, useEffect } from 'react'

type NavbarUserCardProps = {
  self: ModelUserSelf;
  setVisible: Function;
}

export const NavbarUserCard: FunctionComponent<NavbarUserCardProps> = ({ self, setVisible }) => {
  const handleClick = (event: MouseEvent): void => {
    const buttonUser: Element = document.getElementById('navbar-button-user')
    const cardUser: Element = document.getElementById('navbar-user')

    handleModalInteraction (
      event,
      buttonUser,
      cardUser,
      setVisible
    )
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return function cleanup () {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <motion.div
      initial={{
        left: '-100%'
      }}
      animate={{
        left: '-1rem'
      }}
      exit={{
        left: '-120%'
      }}
      id="navbar-user"
      className="w-72 absolute bottom-full"
    >
      <div className="space-y-4 bg-gray-800 p-4 rounded-xl text-center m-2 ">
        <div className="flex items-center justify-center w-24 h-24 rounded-full m-auto bg-gray-900">
          <img src={ENDPOINT_IMAGES + self.avatarUrl} className="rounded-full w-20 h-20 m-auto bg-gray-800" />
        </div>
        <div>
          <p className="text-xl">{self.username}</p>
          <p className="text-gray-400 text-lg">{self.displayName}</p>
          <p className="text-gray-400 text-sm italic">{self.email}</p>
        </div>
        <div className="space-y-2">
          <button className="block w-full">Profile</button>
          <button className="block w-full">Settings</button>
          <button className="block w-full button-red">Logout</button>
        </div>
      </div>
    </motion.div>
  )
}