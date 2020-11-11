import Config from 'config/default.json'
import { ModelUserSetting, ModelUserSettingCategory } from 'models/user/ModelUserSetting'

export const fetchUserSettings = async (externalId: String) => {
  const promise = fetch(`${Config.apiUrl}/users/${externalId}/settings`, {
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