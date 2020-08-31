<template>
  <div class="container">
    <button class="button-teal" @click="testNotificationSuccess">
      Test Notification Success
    </button>
    <button class="button-red" @click="testNotificationFailure">
      Test Notification Fail
    </button>
    <button @click="testNotificationWarning">
      Test Notification Warning
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator'
import { userStore, notificationsStore } from '@/store'
import { generateNotification, NotificationType } from '~/lib/notification/Notification'

@Component
export default class SidebarUserCard extends Vue {
  @Emit()
  testNotificationSuccess (): void {
    notificationsStore.addNotification(generateNotification('Success Notification', NotificationType.SUCCESS))
  }

  @Emit()
  testNotificationFailure (): void {
    notificationsStore.addNotification(generateNotification('Failure Notification', NotificationType.FAILURE))
  }

  @Emit()
  testNotificationWarning (): void {
    notificationsStore.addNotification(generateNotification('Warning Notification', NotificationType.WARNING))
  }

  get userstore () {
    return userStore
  }
}
</script>

<style lang="sass" scoped>
</style>
