import React, { FunctionComponent, useEffect, useState } from 'react'
import Soundbar from './Soundbar'
import styles from './soundwave.module.scss'

const Soundwave: FunctionComponent = () => {
  const BAR_WIDTH = 10
  const BAR_MARGIN = 12

  const getBarCount = (): number => {
    return Math.ceil(window.innerWidth / (BAR_WIDTH + BAR_MARGIN))
  }

  const handleResize = (): void => {
    setBarCount(getBarCount())
  }

  const [barCount, setBarCount] = useState<number>(0)

  useEffect(() => {
    setBarCount(getBarCount())

    window.addEventListener('resize', handleResize)

    return function cleanup () {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={`flex items-center justify-center h-full w-full overflow-hidden bg-gradient-to-br from-green-400 to-blue-400 relative`}>
      <div className={`absolute top-0 left-0 w-full h-full ${styles.wrapper} flex items-center`}>
        <div>
          <div className="w-full h-1 flex space-x-3 flex-end">
            {Array.from({length: barCount}, () => Math.floor(Math.random() * 3)).map((x, index) => {
              return (
                <Soundbar key={index} animationIndex={x} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Soundwave