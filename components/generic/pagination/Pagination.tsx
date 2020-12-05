import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './pagination.module.scss'
import PaginationSearch from './PaginationSearch'

type PaginationProps = {
  allValues: any[];
  setCurrentValues: Function;
  perPage: number;
  minHeight?: number;
  searchPrefix: string;
  schemaFilter?: string[];
  noFlex?: boolean;
  className?: string;
}

const Pagination: FunctionComponent<PaginationProps> = ({ children, allValues, setCurrentValues, perPage, minHeight, searchPrefix, schemaFilter, noFlex, className }) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const pageCount = Math.ceil(allValues.length / perPage)
  const [pageInputError, setPageInputError] = useState<boolean>(false)
  const inputPageRef = useRef(null)
  const [filteredProperty, setFilterdProperty] = useState<string>('')

  const handlePageInputChange = (value: string) => {
    const input: number = Number(value)

    if ((Number.isNaN(input) || (input < 1 || input > pageCount) && value.length > 0)) {
      setPageInputError(true)
    } else if (value.length === 0) {
      setPageInputError(false)
    } else {
      if (pageInputError) setPageInputError(false)
      paginate(input - 1)
    }
  }

  const handlePageInputBlur = (empty: boolean) => {
    if (empty) inputPageRef.current.value = currentPage + 1
  }

  const paginate = (page: number, filter: string = '') => {
    if (filter.length > 0) {
      setCurrentValues(
        allValues.filter(value => value[filteredProperty].toLowerCase().includes(filter.toLowerCase())).slice((page * perPage), (page * perPage) + perPage)
      )
    } else {
      setCurrentValues(
        allValues.slice((page * perPage), (page * perPage) + perPage)
      )
    }
    setCurrentPage(page)
    inputPageRef.current.value = page + 1
  }
  
  useEffect(() => {
    setCurrentValues(allValues.slice(0, perPage))
  }, [])

  return (
    <div className={`space-y-4 flex flex-wrap justify-center ${className ? className : ''}`}>
      <TransitionGroup className={`w-full ${noFlex ? 'space-y-2 m-auto' : 'flex justify-center space-x-2'}`} style={{ minHeight: minHeight ? minHeight : 'auto' }}>
        {children}
      </TransitionGroup>

      <PaginationSearch schemaFilter={schemaFilter} prefix={searchPrefix} setFilteredProperty={setFilterdProperty} filteredProperty={filteredProperty} paginate={paginate} schemaValue={allValues.length == 0 ? null : allValues[0]} />

      <div className="ml-2 flex items-center justify-center space-x-2 rounded-std p-2 bg-main-200">
        <button className={`${styles['pagination-button']}`} onClick={(): void => paginate(currentPage - 1)} disabled={currentPage === 0}>
          <Icon path={mdiChevronLeft} size={1} />
        </button>
        <div className="relative">
          <input
            onFocus={(e): void => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
            onBlur={(e) : void => handlePageInputBlur(e.currentTarget.value.length === 0)}
            className={`w-10 text-center ${pageInputError ? 'input-error' : ''}`}
            ref={inputPageRef} type="text"
            defaultValue={currentPage + 1}
            onChange={(e): void => handlePageInputChange(e.currentTarget.value)}
          />
          {pageInputError && <div className="w-2 h-2 rounded-full absolute top-0 right-0 bg-red-500 animate-ping"></div>}
          {pageInputError && <div className="w-2 h-2 rounded-full absolute top-0 right-0 bg-red-500"></div>}
        </div>
        <p className="text-color-alt">/ {pageCount}</p>
        <button className={`${styles['pagination-button']}`} onClick={(): void => paginate(currentPage + 1)} disabled={currentPage === pageCount - 1}>
          <Icon path={mdiChevronRight} size={1} />
        </button>
      </div>
    </div>
  )
}

export default Pagination