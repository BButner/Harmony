import Config from '@/config/default.json'

export default async (context, inject) => {
  await fetch(`${Config.apiUrl}/user`, {
    credentials: 'include',
    headers: context.req ? { cookie: context.req.headers.cookie } : undefined
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json()
      } else {
        return null
      }
    })
    .then((data) => {
      let darkMode: boolean = false

      if (data) {
        darkMode = data.settings.darkMode
      }

      inject('darkMode', darkMode)
      context.$darkMode = darkMode
    })
}
