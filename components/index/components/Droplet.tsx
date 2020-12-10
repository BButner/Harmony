import Icon from '@mdi/react'
import { mdiSpotify, mdiApple, mdiPandora, mdiYoutube } from '@mdi/js'
import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import styles from './droplet.module.scss'

const Droplet: FunctionComponent = () => {
  const [left, setLeft] = useState<number>(0)
  const icon = useRef(null)

  const getIcon = (): string => {
    return [mdiSpotify, mdiApple, mdiPandora, mdiYoutube][Math.floor(Math.random() * (3 - 0) + 0)]
  }

  const getSpeed = (size: number): string => {
    return size * Math.floor(Math.random() * (30 - 10) + 10) + 's'
  }

  const SIZE_MAX: number = 3;
  const SIZE_MIN: number = 1;
  const SIZE: number = parseFloat((Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN).toFixed(1))
  const TOP: number = -Math.ceil(Math.random() * (1200 - 0) + 0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newLeft = Math.ceil(Math.random() * (window.innerWidth - 0) + 0)
      setLeft(newLeft)
    }
  }, [])

  return (
    <Icon ref={icon} className={`${styles.droplet}`} style={{ animationDuration: getSpeed(SIZE), left: left + 'px', top: TOP + 'px' }} path={getIcon()} size={SIZE} />
  )
}

export default Droplet