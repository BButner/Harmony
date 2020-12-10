import Icon from '@mdi/react'
import { mdiSpotify } from '@mdi/js'
import React, { FunctionComponent } from 'react'
import styles from './servicebackground.module.scss'
import Droplet from './Droplet'

const ServiceBackground: FunctionComponent = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
      {Array.from({ length: 100 }, () => 0).map((_, index) => {
        return ( <Droplet key={index} /> )
      })}
    </div>
  )
}

export default ServiceBackground