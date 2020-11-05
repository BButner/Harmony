import Config from 'config/default.json'
import { ModelUserSelf, ModelUser } from 'models/user/ModelUser'

export async function fetchUserSelf (ctx): Promise<ModelUserSelf> {
  const response = await fetch(`${Config.apiUrl}/users/me`, {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    method: "GET"
  })

  if (!response.ok) return null
  else return response.json()
}

export async function fetchUserLogout (): Promise<any> {
  const response = await fetch(Config.apiUrl + '/logout', {
    method: 'POST',
    credentials: 'include'
  })

  return response.ok
}

export const fetchUserById = async (ctx): Promise<ModelUser> => {
  const response = await fetch(`${Config.apiUrl}/users/${ctx.params.id}`, {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  })

  if (!response.ok) return null
  else return response.json()
}
