import Config from 'config/default.json'
import fetch from 'isomorphic-unfetch'

export const updateUserSettings = async (username: string, settingField: string, settingValue: any): Promise<boolean> => {
  return await fetch(`${Config.apiUrl}/user/${username}/settings`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      settings: [
        { field: settingField, value: settingValue }
      ]
    })
  })
    .then(resp => {
      return resp.ok
    })
}