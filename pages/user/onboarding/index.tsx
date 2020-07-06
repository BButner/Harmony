import React, { FunctionComponent } from 'react'
import { ModelUserSelf } from '../../../models/user/ModelUser'
import { GetServerSideProps } from 'next'
import PropTypes from 'prop-types'
import Layout from '../../../components/layout'
import SetUsername from '../../../components/onboarding/SetUsername'
import { getSelf } from '../../../libs/fetcher/userFetcher'

type OnboardingIndexProps = {
  self: ModelUserSelf;
}

const OnboardingIndex: FunctionComponent<OnboardingIndexProps> = ({ self }) => {
  return (
    <Layout pageTitle={'User Onboarding'} showNavBar={false} user={self} title="User Onboarding" subtitle="Lets get some information!">
      <div className="flex justify-center flex-wrap pt-56">
        <SetUsername self={self}/>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getSelf(ctx)
  return { props: { self: data.self } }
}

OnboardingIndex.propTypes = {
  self: PropTypes.any.isRequired
}

export default OnboardingIndex
