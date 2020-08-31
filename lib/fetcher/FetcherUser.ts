import { ModelUserSelf } from '@/models/ModelUser'
import Config from '@/config/default.json'

export const fetchUserSelf = async (): Promise<ModelUserSelf | null> => {
  const response = await fetch(`${Config.apiUrl}/user`, {
    credentials: 'include'
  })

  if (!response.ok) {
    return null
  } else {
    return response.json()
  }
}