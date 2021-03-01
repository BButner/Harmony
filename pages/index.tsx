import { LoadingIcon } from 'components/misc/LoadingIcon'
import { FunctionComponent } from 'react'
import { Layout } from '../components/Layout'

const index: FunctionComponent = () => {
  return (
    <Layout pageTitle="Harmony">
      <p>testing</p>
      <LoadingIcon />
    </Layout>
  )
}

export default index