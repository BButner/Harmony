import React, { FunctionComponent, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiClose, mdiMagnify } from '@mdi/js'

interface PopupSearchPaginateProps {
  paginate: Function;
}

const PopupSearchPaginate: FunctionComponent<PopupSearchPaginateProps> = ({ paginate }) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const searchInput = useRef(null)
  const searchField = useRef(null)

  useEffect(() => {
    searchInput.current.focus()
  })

  return (
    <div className="relative z-50">
      <div onClick={(): void => {
        setShowInput(!showInput)
        searchInput.current.focus()
      }} className="flex justify-center align-center h-full">
        <Icon path={mdiMagnify} size={1.25} className="text-bluegrey-600 hover:text-bluegrey-800 animated cursor-pointer m-auto"/>
      </div>
      <div className={`absolute soft-shadow ${showInput ? 'visible' : 'hidden'} pt-4 pb-4 pr-6 pl-6 bg-white rounded-lg flex card-animated border border-bluegrey-300`} style={{ left: '2rem', top: '-1rem' }}>
        <div className="absolute top-0 right-0 m-auto cursor-pointer"
          onClick={(): void => setShowInput(false)}><Icon
            className="text-shadow
                hover:text-red-500 animated mb-10 text-bluegrey-300 animated"
            path={mdiClose} size={1}/></div>
        <select className="mr-2" ref={searchField} onChange={(): void => {
          paginate(1, searchInput.current.value, searchField.current.value)
        }}>
          <option value="name">Name</option>
          <option value="description">Description</option>
        </select>
        <input autoFocus={true} type="text" ref={searchInput} onChange={(): void => {
          paginate(1, searchInput.current.value, searchField.current.value)
        }}/>
      </div>
    </div>
  )
}

PopupSearchPaginate.propTypes = {
  paginate: PropTypes.func.isRequired
}

export default PopupSearchPaginate
