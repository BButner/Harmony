import { FunctionComponent, useEffect } from 'react'
import { motion } from 'framer-motion'
import { handleModalInteraction } from 'lib/navigation/ModalHandler'
import { NavbarLoginButtons } from './NavbarLoginButtons'

type NavbarLoginProps = {
  visible: boolean;
  setVisible: Function;
}

export const NavbarLogin: FunctionComponent<NavbarLoginProps> = ({ visible, setVisible }) => {
  const handleClick = (event: MouseEvent): void => {
    const buttonLogin: Element = document.getElementById('button-login')
    const navbarLogin: Element = document.getElementById('navbar-login')

    handleModalInteraction (
      event,
      buttonLogin,
      navbarLogin,
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
      id="navbar-login"
      className="w-72 absolute bottom-full"
    >
        <div className="space-y-4 bg-gray-800 p-4 rounded-xl m-2 text-center">
          <p>
            Already have an Account?
          </p>
          <NavbarLoginButtons />
          <p className="text-sm">
            Don't have an account? Please click Register below!
          </p>
        </div>
    </motion.div>
  )
}