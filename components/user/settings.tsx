import React, { FunctionComponent } from 'react'
import Card from '../card'
import useSharedState from '../../libs/useSharedState'
import useSWR from 'swr'
import { getUserSettings } from '../../libs/fetcher/userFetcher'
import LoadingCard from '../cards/loadingcard'

const Settings: FunctionComponent = () => {
  const { data, error } = useSWR('/user/settings', getUserSettings)
  const [userState, setUserState] = useSharedState('user', null)

  return (
    <>
      {data === null && <LoadingCard title={'Settings'}/>}
      {data !== null && <Card title="Settings" className="w-11/12 md:w-1/4">
      </Card>}
    </>
  )
}

export default Settings
