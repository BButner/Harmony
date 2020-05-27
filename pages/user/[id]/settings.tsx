import React, { FunctionComponent, useEffect } from 'react'
import Layout from '../../../components/layout'
import { GetServerSideProps } from 'next'
import { getSelf } from '../../../libs/fetcher/userFetcher'
import PropTypes from 'prop-types'
import { UserSelf } from '../../../models/User'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

type UserSettingsProps = {
  self: UserSelf;
}

const UserSettings: FunctionComponent<UserSettingsProps> = ({ self }) => {
  const ProfileSettings = dynamic(() => import('../../../components/user/profile'))
  const Settings = dynamic(() => import('../../../components/user/settings'))

  const router = useRouter()
  const { id: userName } = router.query

  useEffect(() => {
    if (!self) Router.push('/login')
    if (self.userName !== userName) Router.push(`/user/${self.userName}/settings`)
  })

  return (
    <Layout showNavBar={true} user={self} title={'User Settings'} subtitle={'Change your general experience, privacy settings, etc.'}>
      <div className="mt-56 flex justify-center items-baseline flex-wrap">
        {self.userName !== userName && <p className="m-auto text-xl1 font-bold">Redirecting...</p>}
        {self.userName === userName && <><ProfileSettings/>
          <Settings self={self}/>
        </>}
      </div>
    </Layout>
  )
}

export default UserSettings

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getSelf(ctx)
  return { props: { self: data.self } }
}

UserSettings.propTypes = {
  self: PropTypes.any.isRequired
}
