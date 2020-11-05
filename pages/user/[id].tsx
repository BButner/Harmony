import Layout from 'components/layout'
import { fetchUserById } from 'lib/fetcher/FetcherUser'
import { ModelUser } from 'models/user/ModelUser'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent } from 'react'

type ProfileProps = {
  user?: ModelUser
}

const Profile: FunctionComponent<ProfileProps> = ({ user }) => {
  return (
    <Layout pageTitle={user.username}>

    </Layout>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async ctx => {
  const dataUser = await fetchUserById(ctx)
  return { props: { user: dataUser }}
}