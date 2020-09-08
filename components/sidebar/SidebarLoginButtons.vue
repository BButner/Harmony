<template>
  <CardGeneric id="login" class="card-buttons" closable namespace="popups" commit="SIDEBAR_LOGIN_BUTTONS">
    <p class="has-account">
      Already have an account?
    </p>
    <div class="buttons">
      <button v-for="service in services" :key="service" :class="service" @click="handleServiceButtonClick(service)">
        <img class="loginImage" :src="getServiceImage(service)">
        <p>Continue with <span style="text-transform:capitalize">{{ service }}</span></p>
      </button>
    </div>
    <p class="no-account">
      Don't have an account?
    </p>
    <button>Register</button>
  </CardGeneric>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'
import Config from '@/config/default.json'
const loginServices: string[] = ['google', 'spotify', 'facebook', 'twitter']

@Component
export default class SidebarLoginButtons extends Vue {
  get services (): string[] {
    return loginServices
  }

  @Emit()
  getServiceImage (service: string): NodeRequire {
    return require(`@/assets/images/login/${service}-login.png`)
  }

  @Emit()
  handleServiceButtonClick (service: string): void {
    window.location.href = `${Config.apiUrl}/login/${service}`
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_colors'
@import '@/assets/css/_settings'

.card-buttons
  text-align: center
  position: relative

.has-account
  margin-bottom: 20px

.no-account
  margin: 20px 0 20px 0

.buttons
  display: block

  button
    display: block
    padding: 12px 15px 12px 15px
    width: 300px
    text-align: center
    transition: transform $animation-duration ease, background-color $animation-duration ease;
    font-size: 100%
    position: relative

    &:hover
      transform: translateY(-7px)

    &:not(:last-of-type)
      margin-bottom: 10px

    img
      position: absolute
      top: 6px
      left: 6px

.loginImage
  height: 32px
  width: 32px

.google
  background-color: hsl(0, 0%, 100%)
  color: $primary-dark-500
  &:hover
    background-color: hsl(0, 0%, 92%)
  &:active
    background-color: hsl(0, 0%, 84%)

.facebook
  background-color: hsl(221, 44%, 41%)
  &:hover
    background-color: hsl(221, 44%, 35%)
  &:active
    background-color: hsl(221, 44%, 29%)

.twitter
  background-color: hsl(203, 89%, 53%)
  &:hover
    background-color: hsl(203, 89%, 47%)
  &:active
    background-color: hsl(203, 89%, 41%)

.spotify
  background-color: hsl(141, 73%, 42%)
  &:hover
    background-color: hsl(141, 73%, 36%)
  &:active
    background-color: hsl(141, 73%, 30%)

@media (max-width: $screen-small)
  .card-buttons
    position: fixed
    bottom: 0
    left: 0
    width: 100%

  #login
    border-radius: 15px 15px 0 0

  .buttons button
    margin: 0 auto
</style>
