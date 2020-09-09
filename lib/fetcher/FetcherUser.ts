import { ModelUserSelf } from '@/models/ModelUser'
import Config from '@/config/default.json'

export const fetchUserSelf = async (): Promise<ModelUserSelf | null> => {
  const response = await fetch(`${Config.apiUrl}/user`, {
    credentials: 'include'
  })
    .catch((err) => {
      console.log(err)
      return null
    })

  if (!response || !response.ok) {
    return null
  } else {
    return response.json()
  }
}

export const logout = async(): Promise<boolean> => {
  const response = await fetch(`${Config.apiUrl}/logout`, {
    credentials: 'include'
  })
    .catch((err) => {
      console.log(err)
      return null
    })

  if (!response) {
    return false
  } else {
    return response.ok
  }
}
