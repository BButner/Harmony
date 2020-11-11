import React, { FunctionComponent } from 'react'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import styles from './closable.module.scss'

type ClosableProps = {
  closeFunction: Function
}

const Closable: FunctionComponent<ClosableProps> = ({ closeFunction }) => {
  return (
    <div className={`absolute cursor-pointer ${styles.icon}`} style={{ top: '10px', right: '10px' }} onClick={(): void => closeFunction(false)}>
      <Icon path={mdiClose} size={1} />
    </div>
  )
}

export default Closable