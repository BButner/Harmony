import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { UserSelf } from '../../models/User'
import Icon from '@mdi/react'
import { mdiCloseCircle } from '@mdi/js'

type PopupImageProps = {
  imageUrl: string;
  onValueChange: any;
  self: UserSelf;
}

const PopupImage: FunctionComponent<PopupImageProps> = ({ imageUrl, onValueChange, self }) => {
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center align-middle confirmation-card bg-animated">
        <div className="m-auto text-center">
          <div onClick={onValueChange}><Icon className="text-white w-10 h-10 m-auto cursor-pointer text-shadow mb-10 rounded-full bg-gray-600 hover:bg-red-500 animated" path={mdiCloseCircle}/></div>
          <div className="m-auto image-popup flex flex-wrap justify-center hidden lg:block">
            <div style={{
              background: `url(${imageUrl})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '32rem',
              height: '32rem'
            }}
            className="relative text-white w-64 h-64">
            </div>
          </div>
          <img src={imageUrl} className="lg:hidden" alt="" onClick={(): void => onValueChange()}/>
          <div className="hidden lg:block m-auto">
            <a href={`${imageUrl}`} rel="noreferrer" target="_blank" className="button mt-4 button-teal" download>Download</a>
          </div>
        </div>
      </div>
    </>
  )
}

PopupImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onValueChange: PropTypes.any.isRequired,
  self: PropTypes.any.isRequired
}

export default PopupImage
