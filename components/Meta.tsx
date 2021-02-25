import { FunctionComponent } from 'react'
import Head from 'next/head'

type MetaProps = {
  pageTitle: string;
}

export const Meta: FunctionComponent<MetaProps> = ({ pageTitle }) => {
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