import { Dialog, Transition } from '@headlessui/react'
import { Fragment, FunctionComponent } from 'react'

type ModalProps = {
  visible: boolean;
  setVisible: Function;
  title: string;
  description: string;
}

export const Modal: FunctionComponent<ModalProps> = (props) => {
  return (
    <Transition
      show={props.visible}
      as={Fragment}
    >
      <Dialog
        static
        open={props.visible}
        onClose={(): void => props.setVisible(false)}
      >
        <div className="fixed z-50 bottom-0 overflow-y-hidden">
          <div className="lg:flex lg:items-center lg:justify-center h-screen w-screen">
            <Dialog.Overlay className="fixed inset-0 w-screen h-screen opacity-90">
              <Transition.Child
                className="fixed w-screen h-screen inset-0 bg-gray-900"
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              />
            </Dialog.Overlay>
            <Transition.Child
              className="fixed bottom-0 left-0 w-screen lg:w-auto bg-white rounded-t-2xl lg:rounded-2xl p-4 z-50"
              enter="transition duration-200 transform"
              enterFrom="translate-y-full lg:translate-y-0 lg:opacity-0"
              enterTo="translate-y-0 lg:opacity-100"
              leave="transition duration-200 transform"
              leaveFrom="translate-y-0 lg:opacity-100"
              leaveTo="translate-y-full lg:opacity-0 lg:translate-y-0"
            >
              <Dialog.Title className="text-center lg:text-left text-2xl">
                {props.title}
              </Dialog.Title>
              <Dialog.Description className="text-center lg:text-left text-lg text-gray-700 mb-8">
                {props.description}
              </Dialog.Description>

              {props.children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}