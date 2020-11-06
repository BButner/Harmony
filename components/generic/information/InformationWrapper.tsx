import React, { FunctionComponent } from 'react'

type InformationWrapperProps = {
  className?: String;
}

const InformationWrapper: FunctionComponent<InformationWrapperProps> = ({ className, children }) => {
  return (
    <div className={`bg-main-300 p-2 rounded-std-sm text-center ${className}`}>
      {children}
    </div>
  )
}

export default InformationWrapper