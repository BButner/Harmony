import { ModelUserSettingUpdate } from '@/models/ModelUserSetting'
import Config from '@/config/default.json'

export const updateUserSettings = async (userName: string, settings: ModelUserSettingUpdate): Promise<boolean> => {
  const promise = await new Promise<boolean>((resolve, reject) => {
    fetch(`${Config.apiUrl}/user/${userName}/settings`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    })
      .then((resp) => {
        if (resp.ok) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(err => reject(err))
  })

  return promise
}
