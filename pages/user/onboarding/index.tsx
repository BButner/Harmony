import React, { FunctionComponent } from 'react'
import { UserSelf } from '../../../models/User'
import PropTypes from 'prop-types'
import Layout from '../../../components/layout'
import Card from '../../../components/card'

type OnboardingIndexProps = {
  user: UserSelf;
}

const OnboardingIndex: FunctionComponent<OnboardingIndexProps> = ({ user }) => {
  return (
    <Layout pageTitle={'User Onboarding'} showNavBar={false} user={user} title="User Onboarding" subtitle="Lets get some information!">
      <div className="flex justify-center flex-wrap pt-56">
        <Card title={'How about a proper Username?'}>
          <input type="text"/>
        </Card>
      </div>
    </Layout>
  )
}

OnboardingIndex.propTypes = {
  user: PropTypes.any.isRequired
}

export default OnboardingIndex
