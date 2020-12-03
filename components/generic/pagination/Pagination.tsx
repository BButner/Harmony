import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import { TransitionGroup } from 'react-transition-group'
import styles from './pagination.module.scss'

type PaginationProps = {
  allValues: any[];
  setCurrentValues: Function;
  perPage: number;
  minHeight?: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({ children, allValues, setCurrentValues, perPage, minHeight }) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const pageCount = Math.ceil(allValues.length / perPage)
  const [pageInputError, setPageInputError] = useState<boolean>(false)
  const inputPageRef = useRef(null)

  const handlePageInputChange = (value: string) => {
    const input: number = Number(value)

    if ((Number.isNaN(input) || (input < 1 || input > pageCount) && value.length > 0)) {
      setPageInputError(true)
    } else if (value.length === 0) {
      setPageInputError(false)
    } else {
      if (pageInputError) setPageInputError(false)
      paginate(input)
    }
  }

  const paginate = (page: number) => {
    setCurrentValues(
      allValues.slice((page * perPage), (page * perPage) + perPage)
    )
    setCurrentPage(page)
    inputPageRef.current.value = page + 1
  }
  
  useEffect(() => {
    setCurrentValues(allValues.slice(0, perPage))
  }, [])

  return (
    <div className="space-y-4 flex flex-wrap justify-center">
      <TransitionGroup className="flex w-full justify-center space-x-2" style={{ minHeight: minHeight ? minHeight : 'auto' }}>
        {children}
      </TransitionGroup>
      <div className="flex items-center justify-center space-x-2 rounded-std p-2 bg-main-200">
        <button className={`${styles['pagination-button']}`} onClick={(): void => paginate(currentPage - 1)} disabled={currentPage === 0}>
          <Icon path={mdiChevronLeft} size={1} />
        </button>
        <div className="relative">
          <input ref={inputPageRef} type="text" defaultValue={currentPage + 1} onChange={(e): void => handlePageInputChange(e.currentTarget.value)} className={`w-10 text-center`} />
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