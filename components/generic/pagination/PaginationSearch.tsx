import Icon from '@mdi/react'
import { mdiMagnify, mdiChevronDown } from '@mdi/js'
import React, { FunctionComponent, useEffect, useState } from 'react'
import CardGeneric from '../card/CardGeneric'
import styles from './paginationsearch.module.scss'
import Closable from '../Closable'
import { CSSTransition } from 'react-transition-group'

type PaginationSearchProps = {
  setFilteredProperty: Function;
  filteredProperty: string;
  schemaValue: any;
  prefix: string;
  schemaFilter?: string[];
  paginate: Function;
}

const PaginationSearch: FunctionComponent<PaginationSearchProps> = ({ setFilteredProperty, filteredProperty, schemaValue, schemaFilter, prefix, paginate }) => {
  const getSearchableFields = (): string[] => {
    const fields: string[] = Object.entries(schemaValue).map(entry => { return entry[0] })

    if (!schemaFilter) {
      return fields
    } else {
      const lowerSchemaFilter = schemaFilter.map(field => field.toLowerCase())

      return fields.filter(field => lowerSchemaFilter.includes(field.toLowerCase()))
    }
  }

  const [searchSelectorVisible, setSearchSelectorVisible] = useState<boolean>(false)
  const [searchableFields] = useState<string[]>(getSearchableFields())

  useEffect(() => {
    setFilteredProperty(searchableFields[0])
  }, [])

  return (
    <div className="p-2 space-y-2 md:space-y-0 rounded-std md:flex items-center justify-center bg-main-200">
      <div className={`md:h-full ${styles['search-key-selector']} flex items-center justify-center relative`}>
        <button onClick={(): void => setSearchSelectorVisible(!searchSelectorVisible)} className={`w-full md:w-52 ${styles['search-key-button']} flex justify-center items-center pl-4 pr-2 capitalize`}>
          {prefix} {filteredProperty} <Icon path={mdiChevronDown} size={1} /></button>
        <CSSTransition in={searchSelectorVisible} timeout={{ exit: 250 }} classNames="appear" unmountOnExit>
          <CardGeneric className={`absolute left-0 shadow-2xl border-main-500 capitalize space-y-2 text-center ${styles['search-selections-wrapper']} p-5`}>
            <Closable closeFunction={setSearchSelectorVisible} />
            {searchableFields.map(field => {
              return (
                <button key={field} onClick={(): void => {
                  setFilteredProperty(field)
                  setSearchSelectorVisible(false)
                }} className={`m-auto capitalize w-full hover:bg-main-400 cursor-pointer rounded-lg pt-1 pb-1 pl-2 pr-2 block ${styles['search-selection']}`}>
                  {field}
                </button>
              )
            })}
          </CardGeneric>
        </CSSTransition>
      </div>
      <div className="flex items-center">
        <Icon className="md:ml-2 mr-2 text-color-alt" path={mdiMagnify} size={1} />
        <input type="text" onChange={(e): void => {
          paginate(0, e.currentTarget.value)
        }} />
      </div>
    </div>
  )
}

export default PaginationSearch