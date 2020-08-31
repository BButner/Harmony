<template>
  <CardGeneric class="card-user" closable namespace="popups" commit="SIDEBAR_USER_CARD">
    <div class="avatar" />
    <div class="details">
      <p class="userName">
        {{ user.userName }}
      </p>
      <p class="displayName">
        {{ user.displayName }}
      </p>
      <p class="email">
        {{ user.email }}
      </p>
      <div class="dark-mode">
        <div class="checkbox">
          <input id="darkMode" type="checkbox" name="darkMode" @click="handleTest" :checked="user.settings.darkMode">
          <label for="darkMode" />
        </div>
        <p>Dark Mode</p>
      </div>
      <div class="buttons">
        <nuxt-link :to="`/user/${user.userName}`">
          <button>Profile</button>
        </nuxt-link>
        <button class="button-red">
          Logout
        </button>
      </div>
    </div>
  </CardGeneric>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'
import { userStore } from '@/store'

@Component({
})
export default class SidebarUserCard extends Vue {
  @Emit()
  handleTest (): void {
    document.body.classList.toggle('dark')
  }

  get user () {
    return userStore
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_settings'

.card-user
  position: fixed
  bottom: 10px
  left: 75px
  display: flex
  justify-content: center
  align-items: center

.avatar
  height: 115px
  width: 115px
  border-radius: 50%
  background-image: url('/default.jpg')
  background-position: center
  background-size: cover
  margin-right: 20px

.userName
  font-size: 140%

.displayName
  font-size: 115%

.email
  color: var(--text-color-alt)
  margin-bottom: 10px

.dark-mode
  display: flex
  justify-content: flex-start
  align-items: center

  p
    margin-left: 10px

.buttons
  margin-top: 10px

@media (max-width: $screen-small)
  .card-user
    display: block
    width: calc(100% - 85px)
    text-align: center

  .avatar
    margin: 0 auto 20px auto

  .dark-mode
    justify-content: center
</style>
