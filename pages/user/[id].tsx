import Layout from 'components/layout'
import { fetchUserById } from 'lib/fetcher/FetcherUser'
import { ModelUser } from 'models/user/ModelUser'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import Config from 'config/default.json'
import CardGeneric from 'components/generic/card/CardGeneric'
import InformationWrapper from 'components/generic/information/InformationWrapper'
import StatsWrapper from 'components/generic/information/StatsWrapper'
import UserProfile from 'components/profile/UserProfile'

type ProfileProps = {
  user?: ModelUser
}

const Profile: FunctionComponent<ProfileProps> = ({ user }) => {
  return (
    <Layout pageTitle={user.username}>
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
  return { props: { user: dataUser }}
}