import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

type CardProps = {
  children: any;
  className?: string;
  title?: string;
}

const Card: FunctionComponent<CardProps> = ({ children, className, title }) => {
  return (
    <div className={`bg-white p-10 soft-shadow card-animated ${className}`}>
      {title && <p className="text-2xl text-center mb-10">{title}</p>}
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
}

export default Card
