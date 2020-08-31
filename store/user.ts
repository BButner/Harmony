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

    if (this.SETTINGS.darkMode && !document.body.classList.contains('dark')) {
      // document.body.classList.add('dark')
      sessionStorage.setItem('darkMode', 'true')
    } else {
      sessionStorage.setItem('darkMode', 'false')
    }
  }

  @Mutation
  private SET_SETTING_NODE (settingNode: { field: string, value: boolean }) {
    this.SETTINGS = { ...this.SETTINGS, [settingNode.field]: settingNode.value }
  }

  @Action({ commit: 'SET_USER' })
  setUser (user: ModelUser) {
    return user
  }

  @Action({ commit: 'SET_SETTING_NODE' })
  setSettingNode (settingNode: { field: string, value: boolean }) {
    return settingNode
  }

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
