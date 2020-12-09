import { ModelUserSetting } from 'models/user/ModelUserSetting'

export const updateUserSettings = async (idExternal: string, userSettings: ModelUserSetting): Promise<boolean> => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${idExternal}/settings`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userSettings)
  })
    .then(resp => {
      return resp.ok
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

export const updateDarkMode = async (idExternal: string, userSettings: ModelUserSetting): Promise<boolean> => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${idExternal}/settings`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userSettings)
  })
    .then(resp => {
      return resp.ok
    })
    .catch(err => {
      return false
    })
}