import React, { FunctionComponent, useEffect } from 'react'
import Layout from '../../components/layout'
import { GetServerSideProps } from 'next'
import { getUser } from '../../libs/fetcher/userFetcher'
import PropTypes from 'prop-types'
import { User } from '../../models/User'
import Router from 'next/router'
import Settings from '../../components/user/settings'
import ProfileSettings from '../../components/user/profile'

type UserSettingsProps = {
  self: User;
}

const UserSettings: FunctionComponent<UserSettingsProps> = ({ self }) => {
  useEffect(() => {
    if (!self) Router.push('/login')
  })

  return (
    <Layout showNavBar={true} user={self} title={'User Settings'} subtitle={'Change your general experience, privacy settings, etc.'}>
      <div className="mt-56 flex justify-center items-baseline flex-wrap">
        <ProfileSettings/>
        <Settings/>
      </div>
    </Layout>
  )
}

export default UserSettings

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getUser(ctx)
  return { props: { self: data.self } }
}

UserSettings.propTypes = {
  self: PropTypes.any.isRequired
}
