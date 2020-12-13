import React, { FunctionComponent } from 'react'
import Soundwave from './components/Soundwave'
import styles from './sectionsplash.module.scss'
import Scroll from 'react-scroll'

const SectionSplash: FunctionComponent = () => {
  const scroll = Scroll.scroller

  const scrollTo = (): void => {
    scroll.scrollTo(
      'index-how',
      {
        smooth: true,
        duration: 750,
        containerId: 'layout',
        offset: -60
      }
    )
  }

  return (
    <div className="w-full h-full relative flex justify-center">
      <div className="absolute top-0 left-0 w-full h-full">
        <Soundwave />
      </div>
      <div className="z-30 h-1/2 flex items-center justify-center text-white text-center">
        <div className={styles['fade-in']}>
          <img className="m-auto " src="/images/logo_h.png" />
          <h1 className="text-6xl md:text-9xl tracking-wider">Harmony</h1>
          <h2 className="text-2xl md:text-4xl">Playlist Sharing, Made Easy</h2>
        </div>
        <button onClick={scrollTo} className={`absolute bottom-16 text-2xl mt-16 ${styles['button-how']}`}>How Does It Work?</button>
      </div>
    </div>
  )
}

export default SectionSplash