import React, { FunctionComponent } from 'react'

type CardGenericProps = {
  className?: string;
  noPadding?: boolean;
  onClick?: any;
}

const CardGeneric: FunctionComponent<CardGenericProps> = ({ children, className, noPadding, onClick }) => {
  return (
    <div className={`bg-main-200 ${noPadding ? '' : 'p-4'} shadow-xl rounded-std ${className ? className : ''}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default CardGeneric
