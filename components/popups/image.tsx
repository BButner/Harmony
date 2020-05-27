import React, { FunctionComponent, useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { UserSelf } from '../../models/User'

type ImagePopupProps = {
  imageUrl: string;
  onValueChange: any;
  self: UserSelf;
}

const ImagePopup: FunctionComponent<ImagePopupProps> = ({ imageUrl, onValueChange, self }) => {
  const imgRef = useRef(null)
  const [imgSize, setImgSize] = useState<any>({ width: 0, height: 0, rectWidth: 0, rectHeight: 1 })

  useEffect(() => {
    const img = new Image()
    img.addEventListener('load', function () {
      setImgSize({
        width: this.naturalWidth,
        height: this.naturalHeight,
        rectWidth: this.naturalWidth / 2 - 35,
        rectHeight: this.naturalHeight / 2 - 35
      })
    })
    img.src = imageUrl
  }, [imgRef.current])

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center align-middle confirmation-card bg-animated">
        <div className="m-auto text-center">
          <FontAwesomeIcon className="text-white text-4xl cursor-pointer mb-10 text-shadow hover:text-red-500 animated" icon={faTimesCircle} onClick={(): void => onValueChange()}/>
          <div className="m-auto image-popup flex flex-wrap justify-center hidden lg:block" style={{
            maxWidth: imgSize.width + 100,
            width: 'auto'
          }}>
            <div style={{
              background: `url(${imageUrl})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '32rem',
              height: '32rem'
            }}
            className="relative text-white w-64 h-64">
              {(self == null || self.settings.showImageStats) && <><div className="flex justify-center align-center items-center flex-grow justify-center absolute text-center" style={{ top: '-30px' }}>
                <svg style={{
                  width: '13rem',
                  height: '1px'
                }}>
                  <rect width={imgSize.rectWidth} height={'1'} className="stroke-current"/>
                </svg>
                <div style={{
                  width: '6rem'
                }} className="text-sm">{imgSize.width}px</div>
                <svg style={{
                  width: '13rem',
                  height: '1px'
                }}>
                  <rect width={imgSize.rectWidth} height={'1'} className="stroke-current"/>
                </svg>
              </div>
              <div className="absolute top-0" style={{ left: '-20px' }}>
                <svg style={{
                  height: '13rem',
                  width: '1px'
                }}>
                  <rect height={imgSize.rectHeight} width={'1'} className="stroke-current"/>
                </svg>
                <div style={{
                  height: '6rem',
                  lineHeight: '50px'
                }} className="text-sm transform -rotate-90">{imgSize.height}px</div>
                <svg style={{
                  height: '13rem',
                  width: '1px'
                }}>
                  <rect height={imgSize.rectHeight} width={'1'} className="stroke-current"/>
                </svg>
              </div></>}
            </div>
          </div>
          <img src={imageUrl} className="hard-shadow lg:hidden" alt="" onClick={(): void => onValueChange()}/>
          <div className="hidden lg:block m-auto">
            <a href={`${imageUrl}`} rel="noreferrer" target="_blank" className="button mt-4 button-teal" download>Download</a>
          </div>
        </div>
      </div>
    </>
  )
}

ImagePopup.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onValueChange: PropTypes.any.isRequired,
  self: PropTypes.any.isRequired
}

export default ImagePopup
