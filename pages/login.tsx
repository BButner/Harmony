import React, { FunctionComponent } from 'react'
import Layout from '../components/layout'
import Login from '../components/login'

const LoginPage: FunctionComponent = () => {
  return (
    <Layout pageTitle="Login/Register" showNavBar={false} user={null}>
      <Login loginPage/>
    </Layout>
  )
}

export default LoginPage
