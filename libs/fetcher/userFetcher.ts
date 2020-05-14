import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'

export async function getUser (ctx) {
  const response = await fetch(Config.apiUrl + '/user', {
    method: 'POST',
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    body: JSON.stringify({ userName: null })
  })

  console.log('testing')

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
  return response.json()
}
