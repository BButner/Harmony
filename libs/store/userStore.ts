import useSharedState from '../useSharedState'
import { User } from '../../models/User'
import useSWR from 'swr'

const initialStore = null

export const useUserState = () => {
  console.log(useSWR('user'))
  return useSharedState('user', useSWR('user'))
}
