import Config from '@/config/default.json'
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $darkMode: boolean
  }
}

export default async (context: any, inject: any) => {
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
    .catch((err) => {
      console.log(err)
      return null
    })
}
