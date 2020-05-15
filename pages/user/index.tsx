import React, { FunctionComponent, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { User } from '../../models/User'
import PropTypes from 'prop-types'
import { getUser } from '../../libs/fetcher/userFetcher'
import Layout from '../../components/layout'

type UserIndexProps = {
  user: User;
}

const UserIndex: FunctionComponent<UserIndexProps> = ({ user }) => {
  useEffect(() => {
    if (user) Router.push(`/user/${user.userName}`)
    else Router.push('/login')
  })

  return (
    <Layout showNavBar={true} user={null}>
      <div className="w-screen h-screen flex">
        <p className="m-auto text-xl1 font-bold">Redirecting...</p>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getUser(ctx)
  return { props: { user: data.user, self: data.self } }
}

UserIndex.propTypes = {
  user: PropTypes.any.isRequired
}

export default UserIndex
