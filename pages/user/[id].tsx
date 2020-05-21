import React, { FunctionComponent, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'
import Layout from '../../components/layout'
import { User, UserSelf } from '../../models/User'
import Card from '../../components/card'
import Router from 'next/router'
import Confirmation from '../../components/popups/confirmation'
import { GetServerSideProps } from 'next'
import { getUserById } from '../../libs/fetcher/userFetcher'
import PropTypes from 'prop-types'
import ImagePopup from '../../components/popups/image'

type UserProps = {
  user: User;
  self: UserSelf;
}

const UserView: FunctionComponent<UserProps> = ({ user, self }) => {
  const [showLogout, setShowLogout] = useState(false)
  const [showAvatar, setShowAvatar] = useState<boolean>(false)

  function handleAvatarOnClick (): void {
    setShowAvatar(true)
  }

  function handleLogoutConfirmationChange (e): void {
    console.log(e)
    if (e) {
      fetch(Config.apiUrl + '/logout', {
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.success) {
            Router.push('/')
          }
        })
    } else {
      setShowLogout(false)
    }
  }

  function handleLogoutOnClick (): void {
    setShowLogout(true)
  }

  function handleImagePopup (): void {
    setShowAvatar(false)
  }

  return (
    <Layout showNavBar={true} user={self} title="User Information" subtitle="View your profile, change your settings, etc.">
      <div className="flex justify-center flex-wrap items-start pt-56">
        <Card className="text-center">
          <div className="md:flex md:items-center md:text-left">
            <div
              className="w-32 h-32 rounded-full m-auto mb-10 md:m-0 bg-bluegrey-100 avatar-shadow cursor-pointer hover:opacity-75 animated"
              onClick={(): void => handleAvatarOnClick()}
              style={{
                backgroundImage: `url(${Config.bucketUrl}${user.avatarUrl}.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}>
            </div>
            <div className="md:ml-10">
              <p className="text-2xl">{user.userName}</p>
              <p className="text-lg text-bluegrey-600">{user.displayName}</p>
              <p className="text-md text-bluegrey-600">{user.email}</p>
              <p className="text-xs text-bluegrey-500 mt-4">Member since {new Date(user.date.toString()).toDateString()}</p>
            </div>
            {self && user.userName === self.userName && <div className="m-auto md:m-0 md:ml-10 text-center mt-5 md:mt-0">
              <button className="m-auto button mb-2 animated block" onClick={(): Promise<any> => Router.push('/user/settings')}>Settings</button>
              <button onClick={handleLogoutOnClick} className="m-auto md:m-0 bg-red-500 text-white rounded hover:bg-red-700 button animated red-active">Logout</button>
            </div>}
          </div>
        </Card>

        {showAvatar && <ImagePopup self={self} imageUrl={`${Config.bucketUrl}${user.avatarUrl}.jpg`} onValueChange={handleImagePopup}/>}
        {showLogout && <Confirmation title={'Logout'} message={'Are you sure you wish to logout?'} onChangeValue={(e): void => handleLogoutConfirmationChange(e)} />}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getUserById(ctx, true)
  return { props: { user: data.user, self: data.self } }
}

UserView.propTypes = {
  user: PropTypes.any.isRequired,
  self: PropTypes.any.isRequired
}

export default UserView
