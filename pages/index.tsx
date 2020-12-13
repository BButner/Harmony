import React, { FunctionComponent } from 'react'
import Layout from 'components/layout'
import { fetchUserSettingsImplicit } from 'lib/fetcher/FetcherUserSettings'
import { GetServerSideProps } from 'next'
import SectionSplash from 'components/index/SectionSplash'
import SectionHow from 'components/index/SectionHow'
import SectionStarted from 'components/index/SectionStarted'

type IndexProps = {
  darkMode?: boolean;
}

const index: FunctionComponent<IndexProps> = ({ darkMode }) => {
  return (
    <Layout pageTitle="Index" darkMode={darkMode} noPadding navNoFill navFixed>
      <SectionSplash />
      <SectionHow />
      <SectionStarted />
    </Layout>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ctx => {
  const settings = await fetchUserSettingsImplicit(ctx)
  if (settings) return { props: { darkMode: settings.darkMode }}
  else return { props: { darkMode: null }}
}
