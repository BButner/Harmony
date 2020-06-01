import React, { FunctionComponent } from 'react'
import Card from '../card'

const ConnectedServices: FunctionComponent = () => {
  return (
    <Card title="Connected Services" className="m-4">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <img className="w-16 h-16" src="/images/logos/spotify.png" alt="spotify"/>
          <p className="text-bluegrey-500 font-bold mr-16 ml-5">Not Connected</p>
        </div>
        <button className="button">Connect</button>
      </div>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <img className="w-16 h-16" src="/images/logos/applemusic.png" alt="apple music"/>
          <p className="text-bluegrey-500 font-bold mr-16 ml-5">Not Connected</p>
        </div>
        <button className="button">Connect</button>
      </div>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <img className="w-16 h-16" src="/images/logos/youtubemusic.png" alt="youtube music"/>
          <p className="text-bluegrey-500 font-bold mr-16 ml-5">Not Connected</p>
        </div>
        <button className="button">Connect</button>
      </div>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <img className="w-16 h-16" src="/images/logos/pandora.png" alt="pandora"/>
          <p className="text-bluegrey-500 font-bold mr-16 ml-5">Not Connected</p>
        </div>
        <button className="button">Connect</button>
      </div>
    </Card>
  )
}

export default ConnectedServices
