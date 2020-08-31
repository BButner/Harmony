<template>
  <div class="">
    <div
      :class="{
        'avatar': true,
        'avatar-active': loginButtonsVisible
      }"
      @click="handleSidebarLoginClick">
      <fa class="icon" :icon="['far', 'user']" />
    </div>

    <transition name="slide">
      <SidebarLoginButtons v-if="loginButtonsVisible" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'
import { popupsStore } from '@/store'

@Component
export default class SidebarLogin extends Vue {
  @Emit()
  handleSidebarLoginClick (): void {
    popupsStore.setSidebarLoginButtonsVisible(!this.loginButtonsVisible)
  }

  get loginButtonsVisible (): boolean {
    return popupsStore.sidebarLoginButtonsIsVisible
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_settings'

.avatar
  width: 55px
  height: 55px
  margin: 0 0 5px 5px
  border-radius: 50%
  position: absolute
  bottom: 0
  left: 0
  transition: transform $animation-duration ease, background-color $animation-duration ease
  display: flex
  justify-content: center
  align-items: center
  color: $purple-500

  &:hover
    transform: translateY(-7px)
    cursor: pointer
    color: $purple-700
    background-color: var(--main-300)

  &-active
    transform: translateY(-7px)
    color: $purple-700
    background-color: var(--main-300)

.icon
  transition: color $animation-duration ease
</style>
