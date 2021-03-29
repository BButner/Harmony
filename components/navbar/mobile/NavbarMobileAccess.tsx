import { FunctionComponent } from 'react'
import { NavbarLoginButtons } from '../NavbarLoginButtons'
import { Modal } from 'components/popup/Modal'
import { NavbarMobileAccessLogin } from './NavbarMobileAccessLogin'
import HarmonyApi from 'lib/api/HarmonyApi'
import { NavbarMobileUser } from './NavbarMobileUser'

type NavbarMobileAccessProps = {
  visible: boolean;
  setVisible: Function;
}

export const NavbarMobileAccess: FunctionComponent<NavbarMobileAccessProps> = ({ visible, setVisible }) => {
  const self = new HarmonyApi().userApi.getUserSelf()

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      title={
        (self.isLoading || self.isError || !self.data) === null ? 'Login' : 'Profile'
      }
      description={
        (self.isLoading || self.isError || !self.data) === null ? 'Choose a selection below to access your profile.' : 'Basic information, settings, etc'
      }
    >
      {(self.isSuccess && self.data) && <NavbarMobileUser self={self.data} />}
      {(self.isLoading || self.isError || !self.data) && <NavbarMobileAccessLogin />}
    </Modal>
  )
}