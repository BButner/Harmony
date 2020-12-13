import React, { FunctionComponent } from 'react'
import ServiceBackground from './components/ServiceBackground'
import Scroll from 'react-scroll'

const SectionHow: FunctionComponent = () => {
  const Element = Scroll.Element

  return (
    <Element name="index-how" className="flex w-full bg-gradient-to-br relative z-40 text-white" style={{ height: 'calc(100% - 60px)' }}>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400">
          <div className="w-full h-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></div>
          <ServiceBackground />
        </div>
      </div>
      <div className="z-30 w-full h-full flex justify-center items-center">

        <p>Testing</p>
      </div>
    </Element>
  )
}

export default SectionHow