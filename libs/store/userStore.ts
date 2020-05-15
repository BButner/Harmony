import useSharedState from '../useSharedState'
import { User } from '../../models/User'
import useSWR from 'swr'

export const useUserState = () => {
  return useSharedState('user', useSWR('user'))
}
