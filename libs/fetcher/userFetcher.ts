import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'
import { User, UserSelf } from '../../models/User'
import { UserSettings } from '../../models/UserSettings'
import { SuccessFailResponse } from '../../models/Generic'

interface UserResponse {
  user: User;
  self: UserSelf;
}

interface SelfResponse {
  self: UserSelf;
}

export async function getUserByUserName (ctx): Promise<UserResponse> {
  const response = await fetch(`${Config.apiUrl}/user/${ctx.params.userName}`, {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  })

  return response.json()
}

export async function getSelf (ctx): Promise<SelfResponse> {
  const response = await fetch(`${Config.apiUrl}/user`, {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  })

  return response.json()
}

export async function getUserSettings (ctx): Promise<UserSettings[]> {
  const response = await fetch(`${Config.apiUrl}${ctx}`, {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie, 'Content-Type': 'application/json' } : undefined
  })

  const data = await response.json()
  return data
}

export async function updateUserSettings (userName: string, settingsData: any): Promise<SuccessFailResponse> {
  const response = await fetch(`${Config.apiUrl}/user/${userName}/settings`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      settings: settingsData
    })
  })

  const data = await response.json()
  return data
}

export async function updateUser (user: any): Promise<SuccessFailResponse> {
  const response = await fetch(`${Config.apiUrl}/user/${user.userName}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user: user })
  })

  return response.json()
}

export async function validateUsername (userName: string): Promise<SuccessFailResponse> {
  const response = await fetch(`${Config.apiUrl}/user/validate/username`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName: userName })
  })

  return response.json()
}
