import { ModelUserSelf } from 'models/user/ModelUser'

export async function fetchUserSelf (ctx): Promise<ModelUserSelf> {
  const response = await fetch(`${process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    method: "GET"
  })
    .catch(err => {
      console.log(err)
      return null
    })

  if (!response.ok) return null
  else return response.json()
}