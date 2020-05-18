import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'

export async function getUser (ctx) {
  const response = await fetch(Config.apiUrl + '/user', {
    method: 'POST',
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    body: JSON.stringify({ userName: null })
  })

  return response.json()
}

export async function getUserById (ctx) {
  const response = await fetch(Config.apiUrl + '/user', {
    method: 'POST',
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie, 'Content-Type': 'application/json' } : undefined,
    body: JSON.stringify({
      userName: ctx.params.id
    })
  })
  const data = await response.json()
  console.log(data)
  return data
}

export async function getUserSettings (ctx) {
  const response = await fetch(Config.apiUrl + '/user/settings', {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie, 'Content-Type': 'application/json' } : undefined
  })

  const data = await response.json()
  return data
}

export async function updateUserSettings (settingsData: any) {
  const response = await fetch(Config.apiUrl + '/user/settings', {
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
