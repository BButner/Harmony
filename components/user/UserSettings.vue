<template>
  <div
    id="settings-wrapper"
    :class="{
      'settings-wrapper': true,
      'settings-wrapper-active': settingsVisible
    }"
  >
    <div class="popout" @click="handlePopoutClick">
      <fa :icon="['fas', 'caret-right']" />
    </div>
    <div class="settings soft-shadow">
      <h1>Settings</h1>
      <div v-for="cat in categories" :key="cat" class="category-wrapper">
        <div class="setting-category">
          <h3>
            {{ cat }}
          </h3>
        </div>
        <div v-for="setting in getSettingsInCategory(cat)" :key="setting.settingName" class="setting-node">
          <div class="setting-details">
            <b><p>
              {{ setting.settingName }}
            </p></b>
            <small><i>
              {{ setting.description }}
            </i></small>
          </div>
          <div class="setting-value">
            <div class="checkbox" @click="handleSettingClick(setting.settingField)">
              <input :id="setting.settingField" type="checkbox" :checked="settings[setting.settingField]" :name="setting.settingField">
              <label :for="setting.settingName" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-up">
      <div v-if="settingsDontMatch" class="buttons">
        <button class="button-teal" @click="handleSaveClick">
          Save
        </button>
        <button class="button-red">
          Cancel
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { popupsStore, userStore } from '@/store'
import { ModelUserSetting, ModelUserSettingUpdate } from '@/models/ModelUserSetting'
import { pushNotification, NotificationType } from '@/lib/notification/Notification'
import { NotificationMessage } from '@/lib/lang/LangNotification'
import { updateUserSettings } from '@/lib/pusher/PusherUser'

@Component
export default class UserSettings extends Vue {
  @Prop() readonly settings!: ModelUserSetting
  @Prop() readonly userName!: string

  @Emit()
  handlePopoutClick (): void {
    popupsStore.setSettingsVisible(false)
  }

  @Emit()
  getSettingsInCategory (category: string) {
    return this.settings.settingInfo.filter(s => s.category === category)
  }

  @Emit()
  handleSettingClick (settingField: string) {
    const newVal = (document.getElementById(settingField)! as HTMLInputElement).checked

    if (settingField === 'darkMode') {
      if (!newVal && !document.body.classList.toString().includes('dark')) {
        document.body.classList.add('dark')
      } else if (newVal && document.body.classList.toString().includes('dark')) {
        document.body.classList.remove('dark')
      }
    }

    userStore.setSettingNode({ field: settingField, value: !newVal })
  }

  @Emit()
  handleSaveClick (): void {
    updateUserSettings(this.userName, this.settingsChanged)
      .then((resp) => {
        if (resp) {
          pushNotification(NotificationMessage.SETTINGS_SAVED, NotificationType.SUCCESS)

          this.settingsChanged.settings.map((setting) => {
            userStore.setSettingNode({ field: setting.field, value: setting.value })

            userStore.resetOriginalSettings()
          })
        } else {
          pushNotification(NotificationMessage.SETTINGS_FAILED_SAVE, NotificationType.FAILURE)
        }
      })
  }

  get categories (): string[] {
    return [...new Set(this.settings.settingInfo.map(s => s.category))]
  }

  get settingsVisible (): boolean {
    return popupsStore.settingsIsVisible
  }

  get settingsDontMatch (): boolean {
    return Object.keys(userStore.settingsOriginal).filter(key => key !== 'settingInfo').map(key => userStore.settings[key] === userStore.settingsOriginal[key]).includes(false)
  }

  get settingsChanged (): ModelUserSettingUpdate {
    return {
      settings: Object.entries(userStore.settings).filter(entry => userStore.settingsOriginal[entry[0]] !== entry[1]).map((entry) => {
        return { field: entry[0], value: entry[1] as any }
      })
    }
  }

  mounted () {
    if (!popupsStore.registeredIgnoredElements.includes('settings-wrapper')) {
      popupsStore.registerIgnoredElement('settings-wrapper')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/_globals'
@import '@/assets/css/_settings'

i
  transition: color $animation-duration ease

.settings-wrapper
  position: fixed
  top: 0
  right: -35%
  width: 35%
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  transition: right $animation-duration ease

.settings-wrapper-active
  right: 0

.settings
  background-color: var(--main-200)
  text-align: center
  padding: 20px
  height: 100%
  width: 100%

  h1
    padding-bottom: 20px

.popout
  width: 20px
  height: 80px
  border-radius: 5px 0 0 5px
  background-color: var(--main-200)
  display: flex
  justify-content: center
  align-items: center
  z-index: 1

  &:hover
    background-color: var(--main-300)
    cursor: pointer

.setting-category
  border-bottom: 1px solid var(--main-500)
  transition: border $animation-duration ease
  padding-bottom: 20px
  margin-bottom: 20px

.setting-node
  text-align: left
  padding-bottom: 20px
  display: flex
  justify-content: space-between
  align-items: center

.buttons
  position: absolute
  bottom: 0
  right: 0
  height: 65px
  width: calc(100% - 20px)
  display: flex
  justify-content: center
  align-items: center

  button:first-of-type
    margin-right: 25%

.category-wrapper:last-of-type
  margin-bottom: 65px

@media (max-width: $screen-small)
  .settings-wrapper
    width: 100%
    right: -100%

  .settings-wrapper-active
    right: 0
</style>
