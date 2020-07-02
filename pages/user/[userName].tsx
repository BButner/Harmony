import React, { FunctionComponent, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'
import Layout from '../../components/layout'
import { User, UserSelf } from '../../models/User'
import Router from 'next/router'
import Confirmation from '../../components/popups/PopupConfirmation'
import { GetServerSideProps } from 'next'
import { getUserByUserName } from '../../libs/fetcher/userFetcher'
import PropTypes from 'prop-types'
import ImagePopup from '../../components/popups/PopupImage'
import Icon from '@mdi/react'
import { mdiLogout, mdiCog } from '@mdi/js'
import CardError from '../../components/cards/CardError'

type UserProps = {
  user: User;
  self: UserSelf;
}

const UserView: FunctionComponent<UserProps> = ({ user, self }) => {
  const [showLogout, setShowLogout] = useState(false)
  const [showAvatar, setShowAvatar] = useState<boolean>(false)

  if (!user) {
    return (
      <CardError title="User Not Found" message="Could not find a user by that username!" self={self}/>
    )
  }

  function handleAvatarOnClick (): void {
    setShowAvatar(true)
  }

  function handleLogoutConfirmationChange (e): void {
    if (e) {
      fetch(Config.apiUrl + '/logout', {
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
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
    <Layout pageTitle={user.userName} showNavBar={true} user={self} title="User Information" subtitle={(!self || (user.userName !== self.userName)) ? `Viewing Profile of ${user.userName}` : 'View your profile, change your settings, etc.'}>
      <div className="flex justify-center flex-wrap items-start pt-56">
        <div className="text-center md:text-left md:flex md:mt-0 items-center flex-wrap bg-white soft-shadow pr-5 w-11/12 md:w-auto card-animated p-2 avatar-container rounded-lg">
          <div
            className="w-48 h-48 m-auto animated image-hover"
            onClick={(): void => handleAvatarOnClick()}
            style={{
              backgroundImage: `url(${Config.bucketUrl}${user.avatarUrl})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}>
            <div className="avatar-public-inner"></div>
          </div>

          <div className="mt-5 md:mt-0 md:ml-10">
            <p className="text-2xl">{user.userName}</p>
            <p className="text-lg text-bluegrey-600">{user.displayName}</p>
            <p className="text-md text-bluegrey-600">{user.email}</p>
            <p className="text-xs text-bluegrey-500 mt-4">Member since {new Date(user.date.toString()).toDateString()}</p>
          </div>
          {self && user.userName === self.userName && <div className="m-auto md:m-0 md:ml-10 text-center mt-5 md:mt-0 h-full pb-4 md:pb-0">
            <button className="m-auto button button-icon mb-2 animated" onClick={(): Promise<any> => Router.push(`/user/${user.userName}/settings`)}>Settings<Icon path={mdiCog} size={0.75}/></button>
            <button onClick={handleLogoutOnClick} className="button button-red button-icon m-auto">Logout<Icon path={mdiLogout} size={0.75}/></button>
          </div>}
        </div>

        {showAvatar && <ImagePopup self={self} imageUrl={`${Config.bucketUrl}${user.avatarUrl}`} onValueChange={handleImagePopup}/>}
        {showLogout && <Confirmation title={'Logout'} message={'Are you sure you wish to logout?'} onChangeValue={(e): void => handleLogoutConfirmationChange(e)} />}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getUserByUserName(ctx)
  return { props: { user: data.user, self: data.self } }
}

UserView.propTypes = {
  user: PropTypes.any.isRequired,
  self: PropTypes.any.isRequired
}

export default UserView
