import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

interface LoadingIconProps {
  className?: string;
}

const LoadingIcon: FunctionComponent<LoadingIconProps> = ({ className }) => {
  return (
    <div className={`w-full h-full absolute top-0 left-0 flex justify-center align-center loading-icon rounded-card ${className}`}>
      <div className="m-auto">
      </div>
    </div>
  )
}

LoadingIcon.propTypes = {
  className: PropTypes.string
}

export default LoadingIcon
