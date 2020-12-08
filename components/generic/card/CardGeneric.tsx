import React, { FunctionComponent } from 'react'

type CardGenericProps = {
  className?: string;
  noPadding?: boolean;
  noFill?: boolean;
  onClick?: any;
  id?: string;
}

const CardGeneric: FunctionComponent<CardGenericProps> = ({ children, className, noPadding, onClick, noFill, id }) => {
  return (
    <div id={id} className={`${noFill ? '' : 'bg-main-200'} ${noPadding ? '' : 'p-4'} shadow-xl rounded-std ${className ? className : ''}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default CardGeneric
