import React, { FunctionComponent } from 'react'
import styles from './indexphone.module.scss'
import Image from 'next/image'
import IndexTextPlaceholder from './IndexTextPlaceholder'

const IndexPhone: FunctionComponent = () => {
  return (
    <div className={`${styles.phone}`}>
      <div className={`w-full h-full bg-main-300 ${styles.content} p-2`}>
        <div className={`w-full h-full space-y-2 flex flex-wrap flex-col bg-main-200 rounded-lg p-2`}>
            <div className="w-full space-y-2">
              <Image className="w-3/4 m-auto" src="/images/logo_circle.png" unsized quality={100} />
              <IndexTextPlaceholder />
              <IndexTextPlaceholder width={45} className="m-auto" />
              <IndexTextPlaceholder width={65} className="m-auto" />
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

export default IndexPhone