import useSharedState from '../useSharedState'
import { getUser, getUserSettings } from '../fetcher/userFetcher'

export const useUserState = () => {
  return useSharedState('/api/user', getUser)
}

export const useSettingsState = () => {
  return useSharedState('/api/settings', getUserSettings)
}
