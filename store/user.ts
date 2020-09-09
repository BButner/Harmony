import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { ModelUser, ModelUserSelf } from '@/models/ModelUser'
import { ModelUserSetting, emptyModelUserSetting } from '@/models/ModelUserSetting'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private USER_NAME: string = ''
  private DISPLAY_NAME: string = ''
  private AVATAR_URL: string = ''
  private REGISTRATION_DATE: Date = new Date()
  private EMAIL: string = ''
  private LOGGED_IN: boolean = false
  private SETTINGS: ModelUserSetting = emptyModelUserSetting
  private SETTINGS_ORIGINAL: ModelUserSetting = emptyModelUserSetting

  @Mutation
  private SET_USER (user: ModelUserSelf) {
    this.USER_NAME = user.userName
    this.DISPLAY_NAME = user.displayName
    this.AVATAR_URL = user.avatarUrl
    this.REGISTRATION_DATE = user.registrationDate
    this.EMAIL = user.email
    this.LOGGED_IN = true
    this.SETTINGS = user.settings
    this.SETTINGS_ORIGINAL = user.settings
  }

  @Mutation
  private SET_SETTING_NODE (settingNode: { field: string, value: boolean }) {
    this.SETTINGS = { ...this.SETTINGS, [settingNode.field]: settingNode.value }
  }

  @Mutation
  private RESET_ORIGINAL_SETTINGS () {
    this.SETTINGS_ORIGINAL = this.SETTINGS
  }

  @Mutation
  private RESET_SETTINGS () {
    this.SETTINGS = this.SETTINGS_ORIGINAL
  }

  @Mutation
  private RESET () {
    this.USER_NAME = ''
    this.DISPLAY_NAME = ''
    this.AVATAR_URL = ''
    this.REGISTRATION_DATE = new Date()
    this.EMAIL = ''
    this.LOGGED_IN = false
    this.SETTINGS = emptyModelUserSetting
    this.SETTINGS_ORIGINAL = emptyModelUserSetting
  }

  @Action({ commit: 'SET_USER' })
  setUser (user: ModelUser) {
    return user
  }

  @Action({ commit: 'SET_SETTING_NODE' })
  setSettingNode (settingNode: { field: string, value: boolean }) {
    return settingNode
  }

  @Action({ commit: 'RESET_ORIGINAL_SETTINGS' })
  resetOriginalSettings () {}

  @Action({ commit: 'RESET_SETTINGS' })
  resetSettings () {}

  @Action({ commit: 'RESET' })
  resetUser () {}

  get userName (): string {
    return this.USER_NAME
  }

  get displayName (): string {
    return this.DISPLAY_NAME
  }

  get avatarUrl (): string {
    return this.AVATAR_URL
  }

  get registrationDate (): Date {
    return this.REGISTRATION_DATE
  }

  get email (): string {
    return this.EMAIL
  }

  get loggedIn (): boolean {
    return this.LOGGED_IN
  }

  get settings (): ModelUserSetting {
    return this.SETTINGS
  }

  get settingsOriginal (): ModelUserSetting {
    return this.SETTINGS_ORIGINAL
  }
}
