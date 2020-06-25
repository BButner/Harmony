import React, { FunctionComponent } from 'react'
import Card from '../card'
import PropTypes from 'prop-types'

interface LoadingCardProps {
  title: string;
  className: string;
}

const LoadingCard: FunctionComponent<LoadingCardProps> = ({ title, className }) => {
  return (
    <>
      <Card title={title} className={`${className} m-4`}>
        <div className="loading-bar"></div>
      </Card>
    </>
  )
}

LoadingCard.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default LoadingCard
