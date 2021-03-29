import { FunctionComponent } from 'react'
import { NavbarLoginButtons } from '../NavbarLoginButtons'
import { Modal } from 'components/popup/Modal'
import { NavbarMobileAccessLogin } from './NavbarMobileAccessLogin'

type NavbarMobileAccessProps = {
  visible: boolean;
  setVisible: Function;
}

export const NavbarMobileAccess: FunctionComponent<NavbarMobileAccessProps> = ({ visible, setVisible }) => {
  const self = null
  
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      title={
        self === null ? 'Login' : ''
      }
      description={
        self === null ? 'Choose a selection below to access your profile.' : ''
      }
    >
      {self && <p>logged in</p>}
      {!self && <NavbarMobileAccessLogin />}
    </Modal>
  )
}