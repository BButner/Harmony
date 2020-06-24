import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import Layout from '../layout'
import { UserSelf } from '../../models/User'
import Icon from '@mdi/react'
import { mdiAlertCircleOutline } from '@mdi/js'
import Card from '../card'
import Link from 'next/link'
import Router from 'next/router'

interface ErrorCardTypes {
  title: string;
  message: string;
  self: UserSelf;
}

const ErrorCard: FunctionComponent<ErrorCardTypes> = ({ title, message, self }) => {
  return (
    <Layout pageTitle="Error" showNavBar user={self} title="Error Encountered" subtitle="Unfortunately we have encountered an issue!">
      <div className="flex justify-center flex-wrap pt-56">
        <Card className="flex justify-between">
          <div className="m-auto">
            <Icon path={mdiAlertCircleOutline} size={4} className="text-red-500"/>
          </div>
          <div className="m-auto ml-10">
            <p className="text-2xl mb-4">{title}</p>
            <p>{message}</p>
            <p className="text-sm mt-10">From here you can go to the <span className="text-purple-500 cursor-pointer hover:text-purple-700 animated" onClick={(): void => Router.back()}>previous page</span>, or to the <Link href={'/'}><a className="text-purple-500 hover:text-purple-700 animated">homepage</a></Link>.</p>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

ErrorCard.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  self: PropTypes.any.isRequired
}

export default ErrorCard
