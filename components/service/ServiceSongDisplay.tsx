import React, { FunctionComponent } from 'react'

type ServiceSongDisplayProps = {
  visible: boolean;
  setVisible: Function;
}

const ServiceSongDisplay: FunctionComponent<ServiceSongDisplayProps> = ({ visible, setVisible }) => {
  return (
    <div className="w-10 h-10 bg-purple-500">
      <div className="w-2 h-2 bg-red-500" onClick={setVisible(false)}></div>
    </div>
  )
}

export default ServiceSongDisplay