import React, { FunctionComponent } from 'react'

type CardGenericProps = {
  className?: string;
  noPadding?: boolean;
  noFill?: boolean;
  onClick?: any;
}

const CardGeneric: FunctionComponent<CardGenericProps> = ({ children, className, noPadding, onClick, noFill }) => {
  return (
    <div className={`${noFill ? '' : 'bg-main-200'} ${noPadding ? '' : 'p-4'} shadow-xl rounded-std ${className ? className : ''}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default CardGeneric
