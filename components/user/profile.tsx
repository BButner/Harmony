import React, { FunctionComponent, useState, useRef } from 'react'
import Card from '../card'
import useSWR from 'swr'
import { getSelf } from '../../libs/fetcher/userFetcher'
import LoadingCard from '../cards/loadingcard'
import Config from '../../config/default.json'
import ImagePopup from '../popups/image'

const ProfileSettings: FunctionComponent = () => {
  const { data, error } = useSWR('/api/user', getSelf)
  const [showAvatar, setShowAvatar] = useState<boolean>(false)
  const [changeEmail, setChangeEmail] = useState<boolean>(false)
  const emailRef = useRef(null)

  function handleAvatarOnClick (): void {
    setShowAvatar(true)
  }

  function handleImagePopup (): void {
    setShowAvatar(false)
  }

  function handleChangeEmailOnClick (): void {
    setChangeEmail(true)
    emailRef.current.value = data.self.email
  }

  function handleSaveEmailOnClick (): void {
    if (emailRef.current.value !== data.self.email) {

    } else {
      emailRef.current.value = ''
      setChangeEmail(false)
    }
  }

  if (error != null) {
    console.log(error)
    return <div>Failed to load.</div>
  }
  if (data == null) return <LoadingCard title={'Profile'} className="w-11/12 md:w-1/5"/>

  return (
    <>
      <Card title="Profile" className="w-11/12 md:w-1/5 flex-start md:mr-4">
        <div className="text-center w-full">
          <div
            className="w-32 h-32 m-auto flex justify-center text-center rounded-full bg-bluegrey-100 avatar-shadow hover:opacity-75 cursor-pointer animated"
            onClick={(): void => handleAvatarOnClick()}
            style={{
              backgroundImage: `url(${Config.bucketUrl}${data.self.avatarUrl}.jpg)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}>
          </div>
          <button className="button mt-5">Change Avatar</button><br/>
          <input type="email" ref={emailRef} className="text-center mt-10 border border-bluegrey-300 rounded pl-5 pr-5 pt-1 pb-1 focus:border-purple-500 animated w-full" readOnly={!changeEmail} placeholder={data.self.email}/><br/>
          {!changeEmail && <button className="button button-blue mt-2" onClick={(): void => handleChangeEmailOnClick()}>Change Email</button>}
          {changeEmail && <button className="button button-teal mt-2" onClick={(): void => handleSaveEmailOnClick()}>Save</button>}
        </div>
      </Card>

      {showAvatar && <ImagePopup self={data.self} onValueChange={handleImagePopup} imageUrl={`${Config.bucketUrl}${data.self.avatarUrl}.jpg`}></ImagePopup>}
    </>
  )
}

export default ProfileSettings
