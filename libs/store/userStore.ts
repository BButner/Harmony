import useSharedState from '../useSharedState'
import { getUser, getUserSettings } from '../fetcher/userFetcher'

export const useUserState = (): any => {
  return useSharedState('/api/user', getUser)
}

export const useSettingsState = (): any => {
  return useSharedState('/api/settings', getUserSettings)
}
