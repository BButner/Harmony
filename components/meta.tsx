import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

interface MetaProps {
  title: string;
}

const Meta: FunctionComponent<MetaProps> = ({ title }) => {
  return (
    <Head>
      <meta
        name="description"
        content={'"A cross-platform music playlist management and transfer system."'}
      />
      <title>{title}</title>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Ubuntu&display=swap" />
    </Head>
  )
}

Meta.propTypes = {
  title: PropTypes.string.isRequired
}

export default Meta
