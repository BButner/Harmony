import React, { FunctionComponent, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { ModelUser } from '../../models/user/ModelUser'
import PropTypes from 'prop-types'
import { getSelf } from '../../libs/fetcher/userFetcher'
import Layout from '../../components/layout'

type UserIndexProps = {
  user: ModelUser;
}

const UserIndex: FunctionComponent<UserIndexProps> = ({ user }) => {
  useEffect(() => {
    if (user) Router.push(`/user/${user.userName}`)
    else Router.push('/login')
  })

  return (
    <Layout pageTitle="Redirecting..." showNavBar={true} user={null}>
      <div className="w-screen h-screen flex">
        <p className="m-auto text-xl1 font-bold">Redirecting...</p>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getSelf(ctx)
  return { props: { user: data.self, self: data.self } }
}

UserIndex.propTypes = {
  user: PropTypes.any.isRequired
}

export default UserIndex
