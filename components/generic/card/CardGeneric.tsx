import React, { FunctionComponent } from 'react'

type CardGenericProps = {
  className?: string;
}

const CardGeneric: FunctionComponent<CardGenericProps> = ({ children, className }) => {
  return (
    <div className={`bg-main-200 p-4 shadow-xl ${className ? className : ''} rounded-std`}>
      {children}
    </div>
  )
}

export default CardGeneric
