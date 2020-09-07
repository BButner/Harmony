<template>
  <div
    :class="{
      'sidebar': true,
      'soft-shadow': sidebarVisible,
      'sidebar-visible': sidebarVisible
    }"
  >
    <nuxt-link to="/">
      <button class="sidebar-button">
        <fa :icon="['fas', 'home']" />
      </button>
    </nuxt-link>
    <nuxt-link to="/spotify">
      <button class="sidebar-button">
        <fa :icon="['fab', 'spotify']" />
      </button>
    </nuxt-link>
    <nuxt-link to="/apple">
      <button class="sidebar-button">
        <fa :icon="['fab', 'apple']" />
      </button>
    </nuxt-link>
    <nuxt-link to="/youtube">
      <button class="sidebar-button">
        <fa :icon="['fab', 'youtube']" />
      </button>
    </nuxt-link>

    <div
      :class="{
        'popout': true,
        'popout-active': sidebarVisible
      }"
      @click="handleToggleClick"
    >
      <fa :icon="['fas', 'caret-right']" />
    </div>
    <SidebarLogin v-if="!user.loggedIn" />
    <SidebarUser v-if="user.loggedIn" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'
import { userStore, popupsStore } from '@/store'
import { fetchUserSelf } from '@/lib/fetcher/FetcherUser'

@Component
export default class Sidebar extends Vue {
  get user () {
    return userStore
  }

  @Emit()
  handleResize (): void {
    if (window.outerWidth <= 640) {
      popupsStore.closeAllPopups()
    }
  }

  @Emit()
  handleToggleClick (): void {
    popupsStore.setSidebarVisible(!popupsStore.sidebarIsVisible)
  }

  get sidebarVisible (): boolean {
    return popupsStore.sidebarIsVisible
  }

  mounted () {
    fetchUserSelf()
      .then((user) => {
        if (user) {
          userStore.setUser(user)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_colors'
@import '@/assets/css/_settings'

.sidebar
  height: 100vh
  width: 65px
  background-color: var(--main-200)
  transition: background-color $animation-duration ease, left $animation-duration ease
  z-index: 999

.popout
  display: none

.sidebar-button
  background-color: transparent
  width: 65px
  height: 65px
  display: flex
  justify-content: center
  align-items: center
  border-radius: 0
  color: $purple-500
  font-size: 130%

  &:hover
    color: $purple-700
    background-color: var(--main-300)

  &:active
    background-color: var(--main-500)

@media (max-width: $screen-small)
  .sidebar
    position: fixed
    left: -65px
    top: 0

  .popout
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    top: 0
    left: 65px
    width: 20px
    height: 80px
    background-color: var(--main-200)
    border-radius: 0 5px 5px 0
    font-size: 125%
    opacity: 0.5
    transition: background-color $animation-duration ease, opacity $animation-duration ease, color $animation-duration ease

    svg
      transition: transform $animation-duration ease

  .popout-active
    opacity: 1

    svg
      transform: rotate(180deg)

  .sidebar-visible
    left: 0px
</style>
