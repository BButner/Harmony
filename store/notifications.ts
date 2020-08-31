import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { ToastPropsData } from '~/lib/notification/Notification'

@Module({
  name: 'notifications',
  stateFactory: true,
  namespaced: true
})
export default class Notifications extends VuexModule {
  private notifications: ToastPropsData[] = []

  @Mutation
  private ADD_NOTIFICATION (toast: ToastPropsData) {
    this.notifications = this.notifications.concat(toast)
  }

  @Mutation
  private REMOVE_NOTIFICATION (key: string) {
    this.notifications = this.notifications.filter(n => n.key !== key)
  }

  @Action({ commit: 'ADD_NOTIFICATION' })
  addNotification (toast: ToastPropsData) {
    return toast
  }

  @Action({ commit: 'REMOVE_NOTIFICATION' })
  removeNotification (key: string) {
    return key
  }

  get currentNotifications (): ToastPropsData[] {
    return this.notifications
  }
}
