import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
// import example from '~/store/example'
import Popups from './popups'
import User from './user'
import Notifications from './notifications'

let popupsStore: Popups
let userStore: User
let notificationsStore: Notifications

function initializeStores(store: Store<any>): void {
  popupsStore = getModule(Popups, store)
  userStore = getModule(User, store)
  notificationsStore = getModule(Notifications, store)
}

export { initializeStores, popupsStore, userStore, notificationsStore }
