import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { getLoginLinks } from 'lib/navbar/links'
import styles from './loginmobile.module.scss'

const LoginMobile: FunctionComponent = () => {
  return (
    <div className="space-y-4 z-50">
      <p className="text-color-alt">Already have an account?</p>
      <div className="buttons space-y-4">
        {getLoginLinks().map(link => {
          return (
            <Link key={link.id} href={`${process.env.API_URL}/login/oauth2/authorization/${link.id}`}>
              <button className={`block m-auto ${styles['login-button']} button-${link.id}`}>
                <img className={styles['login-button-image']} src={`/images/login/${link.id}-login.png`} />
                {link.title}
              </button>
            </Link>
          )
        })}
      </div>
      <p className="text-color-alt">Don't have an account? <Link href='/register'><a className="text-purple-500">Register</a></Link>.</p>
    </div>
  )
}

export default LoginMobile
