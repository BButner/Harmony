import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

interface CardGenericSlimProps {
  children: any;
  className?: string;
  title?: string;
}

const CardGenericSlim: FunctionComponent<CardGenericSlimProps> = ({ children, className, title }) => {
  return (
    <div className={`bg-white soft-shadow card-animated ${className} rounded-lg`}>
      {title && <p className="text-2xl text-center pt-1 pb-1">{title}</p>}
      {children}
    </div>
  )
}

CardGenericSlim.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
}

export default CardGenericSlim
