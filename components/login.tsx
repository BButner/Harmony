import React, { FunctionComponent } from 'react'
import CardGeneric from './cards/CardGeneric'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import Config from '../config/default.json'

interface LoginProps {
  loginPage?: boolean;
  onValueChange?: any;
}

const Login: FunctionComponent<LoginProps> = ({ loginPage, onValueChange }) => {
  const availableServices: string[] = ['google', 'facebook', 'twitter', 'spotify']

  const handleLoginButtonClick = (id: string): void => {
    window.location.href = `${Config.apiUrl}/login/${id}`
  }

  return (
    <div className={`flex justify-center h-screen ${!loginPage ? ' w-screen fixed top-0 left-0 confirmation-card login-popup' : ''}`}>
      <div className="m-auto w-full align-middle md:w-2/5 lg:w-1/5">
        <CardGeneric className="fixed bottom-0 w-full md:relative login-buttons text-left" title="Login">
          {!loginPage && <div onClick={onValueChange}><Icon className="absolute top-0 right-0 w-8 h-8 m-auto cursor-pointer text-shadow hover:text-red-500 animated mb-10 card-animated text-bluegrey-300 mr-2 mt-2" path={mdiClose}/></div>}
          {availableServices.map(service => {
            return (
              <button key={service} className={`button-${service} m-auto flex justify-center align-center animated w-full`} id={service} onClick={(e): void => handleLoginButtonClick(e.currentTarget.id)}>
                <div className="flex justify-between pt-2 pb-2 w-full">
                  <img src={`/images/logos/${service}-login.png`} className="w-8 h-8"/>
                  <div className="m-auto w-3/4"><p className="ml-4 text-left w-full">Continue with <span className="capitalize">{service}</span></p></div>
                </div>
              </button>
            )
          })}
          <div className="text-sm text-center mt-10 text-gray-500">
            <p>For increased security and ease of access, we do not implement the ability to register/login with only a username and password.</p>
            {loginPage && <p><Link href="/"><a className="text-purple-500">Return to homepage.</a></Link></p>}
          </div>
        </CardGeneric>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginPage: PropTypes.bool,
  onValueChange: PropTypes.any
}

export default Login
