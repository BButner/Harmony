import Config from 'config/default.json'
import { ModelUserSetting, ModelUserSettingCategory } from 'models/user/ModelUserSetting'

export const fetchUserSettings = async (idExternal: String) => {
  const promise = fetch(`${Config.apiUrl}/users/${idExternal}/settings`, {
    credentials: 'include'
  })
    .then(resp => resp.json())

  return promise
}

export const fetchSettingCategories = async (): Promise<ModelUserSettingCategory[]> => {
  const promise = fetch(`${Config.apiUrl}/settings/categories`, {
    credentials: 'include'
  })
    .then(resp => resp.json())

  return promise
}