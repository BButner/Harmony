import React, { FunctionComponent, useState } from 'react'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiMinusBox, mdiPlusBox, mdiClose } from '@mdi/js'

interface PaginationProps {
  count: number;
  active: number;
  paginate: any;
}

const Pagination: FunctionComponent<PaginationProps> = ({ count, active, paginate }) => {
  const nums: number[] = []
  const [pagesVisible, setPagesVisible] = useState<boolean>(false)

  for (let i = 1; i <= count; i++) nums.push(i)

  const getPageNums = (): number[] => {
    if (active < 6) return [2, 3, 4, 5]
    else if (active > count - 5) return [count - 4, count - 3, count - 2, count - 1]
    else return [active - 1, active, active + 1]
  }

  return (
    <div className="pagination-wrapper">
      <button className="pagination-arrow mr-1" disabled={active === 1} onClick={(): void => paginate(active - 1)}>
        <div>
          <Icon path={mdiMinusBox} size={1}/>
        </div>
      </button>
      {nums.length < 7 && nums.map(n => {
        return <button key={n} onClick={(): void => paginate(n)} className={`button-pagination ${n === active ? 'button-pagination-active' : ''}`}>{n}</button>
      })}
      {nums.length >= 7 && <button onClick={(): void => paginate(1)} className={`button-pagination ${active === 1 ? 'button-pagination-active' : ''}`}>1</button>}
      {nums.length >= 7 && active >= 6 && active <= count - 5 && <button onClick={(): void => setPagesVisible(true)} className="button-pagination">...</button>}
      {nums.length >= 7 && active > count - 5 && <button onClick={(): void => setPagesVisible(true)} className="button-pagination">...</button>}
      {nums.length >= 7 && getPageNums().map(n => {
        return <button key={n} onClick={(): void => paginate(n)}
          className={`button-pagination ${n === active ? 'button-pagination-active' : ''}`}>
          {n}
        </button>
      })}
      {nums.length >= 7 && active < count - 4 && <button onClick={(): void => setPagesVisible(true)} className="button-pagination">...</button>}
      {nums.length >= 7 && <button onClick={(): void => paginate(count)} className={`button-pagination ${active === count ? 'button-pagination-active' : ''}`}>{count}</button>}
      <button className="pagination-arrow" disabled={active === count} onClick={(): void => paginate(active + 1)}>
        <div>
          <Icon path={mdiPlusBox} size={1}/>
        </div>
      </button>
      <div className={`bg-white fixed rounded-lg soft-shadow flex flex-wrap max-w-lg z-50
        justify-center align-center p-4 ${pagesVisible ? 'visible opacity-1' : 'hidden opacity-0'} card-animated
        border border-bluegrey-300`}
      style={{
        maxHeight: '32rem',
        overflowY: 'auto'
      }}>
        <div className="absolute top-0 right-0 m-auto cursor-pointer"
          onClick={(): void => setPagesVisible(false)}><Icon
            className="text-shadow
            hover:text-red-500 animated mb-10 text-bluegrey-300 animated"
            path={mdiClose} size={1}/></div>
        {nums.map(n => {
          return <button key={n} className={`button-pagination m-1 ${active === n ? 'button-pagination-active' : ''}`} onClick={(): void => {
            paginate(n)
            setPagesVisible(false)
          }}>{n}</button>
        })}
      </div>
    </div>
  )
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  paginate: PropTypes.any.isRequired
}

export default Pagination
