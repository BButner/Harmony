<template>
  <CardGeneric class="card-buttons" closable namespace="popups" commit="SIDEBAR_LOGIN_BUTTONS">
    <button v-for="service in services" :key="service" :class="service" @click="handleServiceButtonClick(service)">
      <img class="loginImage" :src="getServiceImage(service)">
      <p>Continue with <span style="text-transform:capitalize">{{ service }}</span></p>
    </button>
  </CardGeneric>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'
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
    window.location.href = `http://10.0.0.97:3001/login/${service}`
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_colors'
@import '@/assets/css/_settings'

.card-buttons
  position: fixed
  bottom: 0
  left: 75px

.card-buttons button
  padding: 8px 10px 8px 10px
  width: 100%
  display: flex
  justify-content: between
  align-items: center
  transition: transform $animation-duration ease, background-color $animation-duration ease;
  font-size: 100%

  &:hover
    transform: translateY(-7px)

  &:not(:last-of-type)
    margin-bottom: 10px

  p
    margin-left: 40px

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
</style>
