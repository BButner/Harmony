<template>
  <div class="wrapper">
    <div
      :class="{
        'avatar': true,
        'avatar-active': userCardVisible
      }"
      @click="handleSidebarUserClick"
    />
    <transition name="slide">
      <SidebarUserCard v-if="userCardVisible" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'
import { popupsStore } from '@/store'

@Component
export default class SidebarUser extends Vue {
  @Emit()
  handleSidebarUserClick (): void {
    popupsStore.setSidebarUserCardVisible(!this.userCardVisible)
  }

  get userCardVisible (): boolean {
    return popupsStore.sidebarUserCardIsVisible
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
  background-image: url('/default.jpg')
  background-position: center
  background-size: cover
  position: absolute
  bottom: 0
  left: 0
  transition: all $animation-duration ease

  &:hover
    transform: translateY(-7px)
    cursor: pointer

  &-active
    transform: translateY(-7px)
    color: $purple-700
    background-color: var(--main-300)
</style>
