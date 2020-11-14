import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from './indextextplaceholder.module.scss'

type IndexTextPlaceholderProps = {
  random?: boolean;
  width?: number;
  className?: string;
}

const IndexTextPlaceholder: FunctionComponent<IndexTextPlaceholderProps> = ({ random, width, className }) => {
  const [currentWidth, setCurrentWidth] = useState<number>(0)

  const randomizeWidth = () => {
    setCurrentWidth(Math.floor(Math.random() * 80) + 21)

    setTimeout(() => randomizeWidth(), 5000)
  }

  const getWidth = (): number => {
    if (random) {
      return currentWidth
    } else if (!random && width) {
      return width
    } else {
      return 100
    }
  }

  useEffect(() => {
    if (random && currentWidth === 0) {
      randomizeWidth()
    }
  }, [])

  return (
    <div
      style={{ width: getWidth() + '%' }}
      className={`h-2 rounded-full bg-main-300 ${className} ${styles.placeholder}`}
    >
    </div>
  )
}

export default IndexTextPlaceholder
