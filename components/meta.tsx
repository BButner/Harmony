import React, { FunctionComponent } from 'react'
import Head from 'next/head'

type MetaProps = {
  pageTitle: string;
}

const Meta: FunctionComponent<MetaProps> = ({ pageTitle }) => {
  return (
    <Head>
      <meta
        name="Harmony"
        content={'"A cross platform music playlist management and transfer system."'}
      />
      <title>{pageTitle}</title>
    </Head>
  )
}

export default Meta
