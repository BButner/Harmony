import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

interface CardGenericProps {
  children: any;
  className?: string;
  title?: string;
}

const CardGeneric: FunctionComponent<CardGenericProps> = ({ children, className, title }) => {
  return (
    <div className={`bg-white p-10 soft-shadow card-animated ${className} rounded-lg`}>
      {title && <p className="text-2xl text-center mb-10">{title}</p>}
      {children}
    </div>
  )
}

CardGeneric.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
}

export default CardGeneric
