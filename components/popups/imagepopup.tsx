import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

type ImagePopupProps = {
  imageUrl: string;
  onValueChange: any;
}

const ImagePopup: FunctionComponent<ImagePopupProps> = ({ imageUrl, onValueChange }) => {
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center align-middle confirmation-card bg-animated"
        onClick={(): void => onValueChange()}>
        <div className="m-auto hard-shadow border-4 border-white image-popup">
          <img src={imageUrl} alt=""/>
        </div>
      </div>
    </>
  )
}

ImagePopup.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onValueChange: PropTypes.any.isRequired
}

export default ImagePopup
