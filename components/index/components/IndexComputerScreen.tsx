import React, { FunctionComponent } from 'react'
import styles from './indexcomputerscreen.module.scss'
import Image from 'next/image'
import IndexTextPlaceholder from './IndexTextPlaceholder'

const IndexComputerScreen: FunctionComponent = () => {
  return (
    <div className={styles.screen}>
      <div className="flex h-full">
        <div className={`${styles.card} w-1/5 h-full space-y-2 flex flex-wrap flex-col`}>
          <div className="w-full space-y-2">
            <Image className="w-3/4 m-auto" src="/images/logo_circle.png" unsized quality={100} />
            <IndexTextPlaceholder random className="m-auto" />
            <IndexTextPlaceholder random className="m-auto" />
            <IndexTextPlaceholder random className="m-auto" />
          </div>
          <div className="flex-1">

          </div>
          <div className="w-full space-y-2">
            <div className="bg-blue-500 h-2 w-full rounded-sm"></div>
            <div className="bg-red-500 h-2 w-full rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexComputerScreen