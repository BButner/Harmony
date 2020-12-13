import React, { FunctionComponent } from 'react'
import Droplet from './Droplet'

const ServiceBackground: FunctionComponent = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
      {Array.from({ length: 50 }, () => 0).map((_, index) => {
        return ( <Droplet key={index} /> )
      })}
    </div>
  )
}

export default ServiceBackground