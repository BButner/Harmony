import React, { FunctionComponent } from 'react'

type CardGenericProps = {
  className?: string;
  noPadding?: boolean;
}

const CardGeneric: FunctionComponent<CardGenericProps> = ({ children, className, noPadding }) => {
  return (
    <div className={`bg-main-200 ${noPadding ? '' : 'p-4'} shadow-xl ${className ? className : ''} rounded-std`}>
      {children}
    </div>
  )
}

export default CardGeneric
