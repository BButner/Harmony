import React, { FunctionComponent } from 'react'
import { CSSTransition } from 'react-transition-group'

type PopupBlurProps = {
  visible: boolean;
}

const PopupBlur: FunctionComponent<PopupBlurProps> = ({ visible, children }) => {
  return (
    <CSSTransition in={visible} timeout={250} unmountOnExit classNames="fade-in">
      <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center`}
      style={{ backgroundColor: 'var(--blur-color)', transition: 'all .25s ease' }}>
        {children}
      </div>
    </CSSTransition>
  )
}

export default PopupBlur
