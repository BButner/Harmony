
import { ModelUser } from 'models/user/ModelUser'
import { ModelUserSetting, ModelUserSettingCategory } from 'models/user/ModelUserSetting'

export const fetchUserSettings = async (idExternal: String): Promise<ModelUserSetting> => {
  const promise = fetch(`${process.env.API_URL}/users/${idExternal}/settings`, {
    credentials: 'include'
  })
    .then(resp => resp.json())

  return promise
}

export const fetchUserSettingsImplicit = async (ctx): Promise<ModelUserSetting> => {
  const response = await fetch(`${process.env.API_URL}/users/me/settings`, {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  })
    .then(resp => {
      if (resp.ok) return resp.json()
      else return null
    })

  return response
}

export const fetchSettingCategories = async (): Promise<ModelUserSettingCategory[]> => {
  const promise = fetch(`${process.env.API_URL}/settings/categories`, {
    credentials: 'include'
  })
    .then(resp => resp.json())

  return promise
}