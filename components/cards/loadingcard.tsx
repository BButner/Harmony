import React, { FunctionComponent } from 'react'
import Card from '../card'
import PropTypes from 'prop-types'

interface LoadingCardProps {
  title: string;
}

const LoadingCard: FunctionComponent<LoadingCardProps> = ({ title }) => {
  return (
    <Card title={title}>
      <div className="loading-bar">
        <div className="loading-bar-inner"></div>
      </div>
    </Card>
  )
}

LoadingCard.propTypes = {
  title: PropTypes.string.isRequired
}

export default LoadingCard
