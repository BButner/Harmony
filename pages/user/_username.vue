<template>
  <div class="username-wrapper">
    <UserCard :user="user" :is-own-profile="isOwnProfile" />
    <UserSettings v-if="isOwnProfile" :user-name="user.userName" :settings="ownSettings" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Config from '@/config/default.json'
import { userStore } from '@/store'
import { ModelUser, emptyModelUser } from '@/models/ModelUser'
import { ModelUserSetting } from '@/models/ModelUserSetting'

@Component({
  async asyncData ({ params }) {
    const promise = await new Promise((resolve, reject) => {
      fetch(`${Config.apiUrl}/user/${params.username}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json()
          } else {
            return null
          }
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
    })

    return { user: promise }
  }
})
export default class Username extends Vue {
  user: ModelUser = emptyModelUser

  get isOwnProfile (): boolean {
    return this.user.userName === userStore.userName
  }

  get ownSettings (): ModelUserSetting {
    return userStore.settings
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_settings'

@media (max-width: $screen-small)
  .username-wrapper
    width: 100%
</style>
