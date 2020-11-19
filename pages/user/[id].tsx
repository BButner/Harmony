import Layout from 'components/layout'
import { fetchUserById } from 'lib/fetcher/FetcherUser'
import { ModelUser } from 'models/user/ModelUser'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent } from 'react'
import UserProfile from 'components/profile/UserProfile'
import { fetchUserSettingsImplicit } from 'lib/fetcher/FetcherUserSettings'

type ProfileProps = {
  user?: ModelUser,
  darkMode: boolean
}

const Profile: FunctionComponent<ProfileProps> = ({ user, darkMode }) => {
  return (
    <Layout pageTitle={user.username} darkMode={darkMode}>
      <div className="flex h-full">
        <UserProfile user={user} />
        <div className="flex">
          
        </div>
      </div>
    </Layout>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async ctx => {
  const dataUser = await fetchUserById(ctx)
  const darkMode = (await fetchUserSettingsImplicit(ctx)).darkMode
  return { props: { user: dataUser, darkMode }}
}