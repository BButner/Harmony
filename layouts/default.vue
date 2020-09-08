<template>
  <div class="page-content-wrapper">
    <Sidebar />
    <div id="page-content" class="page-content">
      <Nuxt />
    </div>
    <transition-group id="notifications" name="slide-left" tag="ul">
      <Toast v-for="notification in notifications" :key="notification.key" :notification-data="notification" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { popupsStore, notificationsStore } from '@/store'
import '@/assets/css/_settings.scss'
import '@/assets/css/global.scss'
import { ToastPropsData } from '~/lib/notification/Notification'

const clickedElementContainsRegisteredElement = (element: HTMLElement): boolean => {
  return popupsStore.registeredIgnoredElements.map((el) => {
    const elRetrieved = document.getElementById(el)

    if (!elRetrieved) {
      return false
    } else {
      return elRetrieved.contains(element)
    }
  }).includes(true)
}

const handlePopupOnClick = (event: MouseEvent): void => {
  const el: Element | null = document.elementFromPoint(event.clientX, event.clientY)

  if (el) {
    if (document.getElementById('page-content')!.contains(document.elementFromPoint(event.clientX, event.clientY))) {
      if (popupsStore.anyCardsVisible) {
        if (!clickedElementContainsRegisteredElement(el as HTMLElement)) {
          popupsStore.closeAllPopups()
        }
      }
    }
  }
}

@Component({
  head () {
    return {
      bodyAttrs: {
        class: this.$darkMode ? 'dark' : ''
      }
    }
  }
})
export default class Default extends Vue {
  mounted () {
    window.addEventListener('click', handlePopupOnClick)
  }

  get notifications (): ToastPropsData[] {
    return notificationsStore.currentNotifications
  }
}
</script>

<style lang="sass">
@import '@/assets/css/_settings'

body, html
  margin: 0
  padding: 0

.page-content-wrapper
  display: flex
  height: 100vh
  width: 100%

.page-content
  overflow-y: auto
  width: 100%
  padding: 20px
  display: flex
  justify-content: center

#notifications
  position: fixed
  top: 10px
  right: 10px
  z-index: 99
  list-style-type: none
  // min-width: 50vw

@media (max-width: $screen-small)
  #notifications
    width: calc(100% - 20px)
    padding-inline-start: 0
    padding: 0
    margin: 0
</style>
