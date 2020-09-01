<template>
  <li>
    <CardGeneric class="toast">
      <fa
        :icon="notificationData.iconData"
        :class="'icon ' + iconClass"
      />
      <p>{{ notificationData.content }}</p>
      <fa class="close-icon" :icon="['fas', 'times']" @click="removeSelf" />
    </CardGeneric>
  </li>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from 'nuxt-property-decorator'
import { notificationsStore } from '@/store'
import { NotificationType, ToastPropsData } from '~/lib/notification/Notification'

@Component
export default class Toast extends Vue {
  @Prop() notificationData!: ToastPropsData;

  @Emit()
  removeSelf (): void {
    notificationsStore.removeNotification(this.notificationData.key)
  }

  get key (): string {
    return Math.floor(Math.random() * 999999999999).toString()
  }

  get iconClass (): string {
    switch (this.notificationData.type) {
      case NotificationType.SUCCESS:
        return 'success'
      case NotificationType.FAILURE:
        return 'failure'
      case NotificationType.WARNING:
        return 'warning'
      case NotificationType.DARK_MODE_ENABLED:
        return 'dark-mode-enabled'
      case NotificationType.DARK_MODE_DISABLED:
        return 'dark-mode-disabled'
    }
  }

  mounted () {
    setTimeout(() => this.removeSelf(), 4000)
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_colors'
@import '@/assets/css/_settings'

li:not(:last-of-type)
  margin-bottom: 4px

.toast
  background-color: var(--main-100)
  display: flex
  justify-content: flex-start
  align-items: center
  position: relative
  overflow: hidden
  width: 400px

  &:after
    content: ""
    position: absolute
    bottom: 0
    right: 0
    height: 3px
    background-color: $purple-500
    border-radius: 2px
    animation: timer-bar 4s linear

.icon
  font-size: 125%
  margin-right: 20px
  display: flex
  justify-content: center
  align-items: center
  width: 30px

.close-icon
  position: absolute
  top: 4px
  right: 4px

  &:hover
    cursor: pointer
    color: $red-500

.success
  color: $teal-500

.warning
  color: $yellow-500

.failure
  color: $red-500

.dark-mode-enabled
  color: white

.dark-mode-disabled
  color: $yellow-500

@keyframes timer-bar
  0%
    width: 100%
  100%
    width: 0%

@media (max-width: $screen-small)
  .toast
    width: 100%
</style>
