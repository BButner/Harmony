import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import CardGeneric from '../cards/CardGeneric'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

interface PopupGenericProps {
  children: any;
  className?: string;
  title?: string;
  closable?: boolean;
  onValueChange?: any;
}

const PopupGeneric: FunctionComponent<PopupGenericProps> = ({ children, className, title, closable, onValueChange }) => {
  return (
    <div className="flex justify-center align-middle h-screen w-screen fixed top-0 left-0 confirmation-card bg-animated">
      <div className="m-auto">
        <CardGeneric title={title} className={className + ' relative'}>
          {closable &&
            <div onClick={onValueChange}>
              <Icon className="absolute top-0 right-0 w-8 h-8 m-auto cursor-pointer text-shadow hover:text-red-500 animated mb-10 card-animated text-bluegrey-300 mr-2 mt-2" path={mdiClose} size={1}/>
            </div>
          }
          {children}
        </CardGeneric>
      </div>
    </div>
  )
}

PopupGeneric.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  closable: PropTypes.bool,
  onValueChange: PropTypes.any
}

export default PopupGeneric
