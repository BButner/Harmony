import React, { FunctionComponent } from 'react'
import styles from './cardgeneric.module.scss'

type CardGenericProps = {
  className?: string;
}

const CardGeneric: FunctionComponent<CardGenericProps> = ({ children, className }) => {
  return (
    <div className={`bg-main-200 p-4 ${styles.card} shadow-xl ${className ? className : ''}`}>
      {children}
    </div>
  )
}

export default CardGeneric
