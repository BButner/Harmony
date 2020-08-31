import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'popups',
  stateFactory: true,
  namespaced: true
})
export default class Popups extends VuexModule {
  private sidebarUserCardVisible: boolean = false
  private sidebarLoginButtonsVisible: boolean = false
  private sidebarVisible: boolean = false
  private settingsVisible: boolean = false
  private ignoredElements: string[] = []

  @Mutation
  private CLOSE_ALL_POPUPS () {
    this.sidebarUserCardVisible = false
    this.sidebarVisible = false
    this.sidebarLoginButtonsVisible = false
    this.settingsVisible = false
  }

  @Mutation
  private SIDEBAR_USER_CARD (visible: boolean) {
    this.sidebarUserCardVisible = visible
  }

  @Mutation
  private SIDEBAR_LOGIN_BUTTONS (visible: boolean) {
    this.sidebarLoginButtonsVisible = visible
  }

  @Mutation
  private SIDEBAR (visible: boolean) {
    this.sidebarVisible = visible
  }

  @Mutation
  private SETTINGS (visible: boolean) {
    this.settingsVisible = visible
  }

  @Mutation
  private REGISTER_IGNORED_ELEMENT (element: string) {
    this.ignoredElements.push(element)
  }

  @Action({ commit: 'CLOSE_ALL_POPUPS' })
  closeAllPopups () {}

  @Action({ commit: 'REGISTER_IGNORED_ELEMENT' })
  registerIgnoredElement (element: string) {
    return element
  }

  @Action({ commit: 'SIDEBAR_USER_CARD' })
  setSidebarUserCardVisible (visible: boolean) {
    return visible
  }

  @Action({ commit: 'SIDEBAR_LOGIN_BUTTONS' })
  setSidebarLoginButtonsVisible (visible: boolean) {
    return visible
  }

  @Action({ commit: 'SIDEBAR' })
  setSidebarVisible (visible: boolean) {
    return visible
  }

  @Action({ commit: 'SETTINGS' })
  setSettingsVisible (visible: boolean) {
    return visible
  }

  get anyCardsVisible (): boolean {
    return this.sidebarVisible || this.sidebarLoginButtonsVisible || this.sidebarUserCardVisible || this.settingsVisible
  }

  get registeredIgnoredElements (): string[] {
    return this.ignoredElements
  }

  get sidebarUserCardIsVisible (): boolean {
    return this.sidebarUserCardVisible
  }

  get sidebarLoginButtonsIsVisible (): boolean {
    return this.sidebarLoginButtonsVisible
  }

  get sidebarIsVisible (): boolean {
    return this.sidebarVisible
  }

  get settingsIsVisible (): boolean {
    return this.settingsVisible
  }
}
