<template>
  <CardGeneric animated class="card-user">
    <div class="avatar" :style="{'background-image': avatarUrl}" />
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
    </div>
    <div v-if="isOwnProfile" class="buttons">
      <button id="settings-button" class="button-blue" @click="handleSettingsButtonClick">
        Settings
      </button>
    </div>
  </CardGeneric>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { ModelUser } from '@/models/ModelUser'
import Config from '@/config/default.json'
import { popupsStore } from '@/store'

@Component
export default class CardUser extends Vue {
  @Prop() readonly user!: ModelUser
  @Prop() readonly isOwnProfile?: boolean

  @Emit()
  handleSettingsButtonClick (): void {
    popupsStore.setSettingsVisible(!popupsStore.settingsIsVisible)
  }

  get avatarUrl (): string {
    return `url(${Config.bucketUrl}${this.user.avatarUrl})`
  }

  mounted () {
    if (!popupsStore.registeredIgnoredElements.includes('settings-button')) {
      popupsStore.registerIgnoredElement('settings-button')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_settings'

.card-user
  display: flex
  justify-content: center
  align-items: center

.avatar
  width: 125px
  height: 125px
  border-radius: 50%
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  margin-right: 20px

.userName
  font-size: 150%

.displayName
  font-size: 130%

.email
  color: var(--text-color-alt)

.buttons
  margin-left: 20px

@media (max-width: $screen-small)
  .card-user
    display: block
    width: 100%
    text-align: center

  .avatar
    margin: 0 auto 20px auto

  .buttons
    margin: 20px 0 0 0

</style>
