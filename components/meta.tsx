import Head from 'next/head'
import { Component } from 'react'

export default class Meta extends Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Head>
        <meta
          name="description"
          content={"A cross-platform music playlist management and transfer system."}
        />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Ubuntu" />
        <script src="https://kit.fontawesome.com/24376cde76.js" crossOrigin="anonymous"></script>
      </Head>
    )
  }
}