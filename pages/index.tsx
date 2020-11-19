import React, { FunctionComponent } from 'react'
import Layout from 'components/layout'
import IndexComputer from 'components/index/IndexComputer'
import IndexLaptop from 'components/index/IndexLaptop'
import IndexPhone from 'components/index/IndexPhone'
import { fetchUserSettingsImplicit } from 'lib/fetcher/FetcherUserSettings'
import { GetServerSideProps } from 'next'

type IndexProps = {
  darkMode?: boolean;
}

const index: FunctionComponent<IndexProps> = ({ darkMode }) => {
  return (
    <Layout pageTitle="Index" darkMode={darkMode}>
      <div className="flex justify-center items-end flex-wrap space-x-4 transform scale-35 md:scale-75 lg:scale-100">
        <div className="relative">
          <IndexComputer />
          <div className="absolute" style={{ bottom: '-90px', left: '-70px' }}>
            <IndexLaptop />
          </div>
          <div className="absolute" style={{ bottom: '-90px', left: '500px' }}>
            <IndexPhone />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ctx => {
  const settings = await fetchUserSettingsImplicit(ctx)
  if (settings) return { props: { darkMode: settings.darkMode }}
  else return { props: { darkMode: null }}
}
