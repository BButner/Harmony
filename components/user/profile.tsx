import React, { FunctionComponent, useState } from 'react'
import Card from '../card'
import useSWR from 'swr'
import { getUser } from '../../libs/fetcher/userFetcher'
import LoadingCard from '../cards/loadingcard'
import Config from '../../config/default.json'
import ImagePopup from '../popups/imagepopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProfileSettings: FunctionComponent = () => {
  const { data, error } = useSWR('/api/user', getUser)
  const [showAvatar, setShowAvatar] = useState<boolean>(false)

  function handleAvatarOnClick (): void {
    setShowAvatar(true)
  }

  function handleImagePopup (): void {
    setShowAvatar(false)
  }

  if (error != null) {
    console.log(error)
    return <div>Failed to load.</div>
  }
  if (data == null) return <LoadingCard title={'Profile'} className="w-11/12 md:w-1/5"/>

  return (
    <>
      <Card title="Profile" className="w-11/12 md:w-1/5 flex-start">
        <div className="text-center w-full">
          <div
            className="w-32 h-32 m-auto flex justify-center text-center rounded-full bg-bluegrey-100 avatar-shadow hover:opacity-75 cursor-pointer animated"
            onClick={() => handleAvatarOnClick()}
            style={{
              backgroundImage: `url(${Config.bucketUrl}${data.user.avatarUrl}.jpg)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}>
          </div>
          <button className="button mt-5">Change Avatar</button><br/>
          <input type="email" className="text-center mt-10 border border-bluegrey-300 rounded pl-5 pr-5 pt-1 pb-1" placeholder={data.user.email}/><br/>
          <button className="button button-blue mt-2">Change Email</button>
        </div>
      </Card>

      {showAvatar && <ImagePopup onValueChange={handleImagePopup} imageUrl={`${Config.bucketUrl}${data.user.avatarUrl}.jpg`}></ImagePopup>}
    </>
  )
}

export default ProfileSettings
