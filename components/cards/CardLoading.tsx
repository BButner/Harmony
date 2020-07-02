import React, { FunctionComponent } from 'react'
import CardGeneric from './CardGeneric'
import PropTypes from 'prop-types'

interface CardLoadingProps {
  title: string;
  className: string;
}

const CardLoading: FunctionComponent<CardLoadingProps> = ({ title, className }) => {
  return (
    <>
      <CardGeneric title={title} className={`${className} m-4`}>
        <div className="loading-bar"></div>
      </CardGeneric>
    </>
  )
}

CardLoading.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default CardLoading
