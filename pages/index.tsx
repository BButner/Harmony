import { TiltedSquare } from 'components/index/TiltedSquare'
import { FunctionComponent, useState } from 'react'
import { Layout } from '../components/Layout'

const index: FunctionComponent = () => {
  return (
    <Layout pageTitle="Harmony">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="rounded-xl relative">
          {/* Background Tilted Square */}
          <TiltedSquare animated className="bg-gradient-to-br from-green-200 to-blue-300" />
          <div className="w-full h-full bg-white relative rounded-xl p-8 shadow-2xl">
            <img src="/img/logos/logo_written.png" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default index