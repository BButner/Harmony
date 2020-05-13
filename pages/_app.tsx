import '../styles/global.css'
import '../styles/tailwind.css'

import React from 'react'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}