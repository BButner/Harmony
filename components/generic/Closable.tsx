import React, { FunctionComponent } from 'react'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

type ClosableProps = {
  closeFunction: Function
}

const Closable: FunctionComponent<ClosableProps> = ({ closeFunction }) => {
  return (
    <div className="absolute" style={{ top: '10px', right: '10px' }} onClick={(): void => closeFunction(false)}>
      <Icon path={mdiClose} size={1} />
    </div>
  )
}

export default Closable