import React, { FunctionComponent } from 'react'
import Soundwave from './components/Soundwave'
import styles from './sectionsplash.module.scss'

const SectionSplash: FunctionComponent = () => {
  return (
    <div className="w-full h-full relative flex justify-center">
      <div className="absolute top-0 left-0 w-full h-full">
        <Soundwave />
      </div>
      <div className="z-30 h-1/2 flex items-center justify-center text-white text-center">
        <div className={styles['fade-in']}>
          <h1 className="text-9xl tracking-wider">Harmony</h1>
          <h2 className="text-4xl">Playlist Sharing, Made Easy</h2>
        </div>
        <button className={`absolute bottom-16 text-3xl mt-16 ${styles['button-how']}`}>How?</button>
      </div>
    </div>
  )
}

export default SectionSplash