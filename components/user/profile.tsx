import React, { FunctionComponent, useState, useRef } from 'react'
import Card from '../card'
import useSWR, { mutate } from 'swr'
import { getSelf, updateUser } from '../../libs/fetcher/userFetcher'
import LoadingCard from '../cards/loadingcard'
import Config from '../../config/default.json'
import ImagePopup from '../popups/image'

const ProfileSettings: FunctionComponent = () => {
  const { data, error } = useSWR('/api/user', getSelf)
  const [showAvatar, setShowAvatar] = useState<boolean>(false)
  const [changeAvatar, setChangeAvatar] = useState<boolean>(false)
  const [changeEmail, setChangeEmail] = useState<boolean>(false)
  const [emailErrors, setEmailErrors] = useState<string[]>([])
  const emailRef = useRef(null)
  const avatarRef = useRef(null)

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
      updateUser({ email: emailRef.current.value, userName: data.self.userName })
        .then(resp => {
          if (resp.success) {
            emailRef.current.value = ''
            setChangeEmail(false)
          } else setEmailErrors(resp.message as string[])
        })
    } else {
      emailRef.current.value = ''
      setChangeEmail(false)
    }
  }

  function handleAvatarOnSubmit (form: React.FormEvent<HTMLFormElement>): void {
    form.preventDefault()

    if (avatarRef.current.files[0]) {
      const avatarData = new FormData()
      avatarData.append('avatar', avatarRef.current.files[0])

      fetch(`${Config.apiUrl}/user/${data.self.userName}/avatar`, {
        method: 'POST',
        body: avatarData,
        credentials: 'include'
      })
        .then(resp => resp.json())
        .then(respData => {
          if (respData.success) {
            mutate('/api/user', data)
            setChangeAvatar(false)
          } else {

          }
        })
    } else {
      setChangeAvatar(false)
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
            className="m-auto flex justify-center animated mb-10 soft-shadow avatar"
            onClick={(): void => handleAvatarOnClick()}
            style={{
              backgroundImage: `url(${Config.bucketUrl}${data.self.avatarUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}>
          </div>
          {changeAvatar && <form className="text-center" onSubmit={(e): void => handleAvatarOnSubmit(e)}>
            <input type="file" ref={avatarRef} id="avatar" className="text-center w-full m-auto inline-block items-middle"/>
            <button className="button button-teal mt-5">Save</button>
          </form>}
          {!changeAvatar && <button className="button button-blue mt-5" onClick={(): void => setChangeAvatar(true)}>Change Avatar</button>}
          <input type="email" ref={emailRef} className="text-center mt-10 border border-bluegrey-300 rounded pl-5 pr-5 pt-1 pb-1 focus:border-purple-500 animated w-full" readOnly={!changeEmail} placeholder={data.self.email}/><br/>
          {emailErrors.length > 0 && emailErrors.map((error, index) => {
            return <p key={index} className="text-red-500">{error}</p>
          })}
          {!changeEmail && <button className="button button-blue mt-2" onClick={(): void => handleChangeEmailOnClick()}>Change Email</button>}
          {changeEmail && <button className="button button-teal mt-2" onClick={(): void => handleSaveEmailOnClick()}>Save</button>}
        </div>
      </Card>

      {showAvatar && <ImagePopup self={data.self} onValueChange={handleImagePopup} imageUrl={`${Config.bucketUrl}${data.self.avatarUrl}`}></ImagePopup>}
    </>
  )
}

export default ProfileSettings
