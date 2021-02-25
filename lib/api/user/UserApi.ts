import { ModelUserSelf } from 'models/user/ModelUser'
import { useQuery } from 'react-query'
import { fetchUserSelf } from './UserFetcher'

export default class UserApi {
  getUserSelf = () => {
    return useQuery<ModelUserSelf, Error>('/user/self', fetchUserSelf)
  }
}