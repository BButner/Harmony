import Icon from '@mdi/react'
import { mdiChevronLeft } from '@mdi/js'
import React, { FunctionComponent, useState, useEffect } from 'react'
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

  const paginate = (page: number) => {
    setCurrentValues(
      allValues.slice((page * perPage), (page * perPage) + perPage)
    )
    setCurrentPage(page)
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
        <p>{currentPage + 1}</p>
        <button className={`${styles['pagination-button']}`} onClick={(): void => paginate(currentPage + 1)} disabled={currentPage === pageCount - 1}>Next</button>
      </div>
    </div>
  )
}

export default Pagination