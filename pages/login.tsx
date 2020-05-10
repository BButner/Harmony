import React, { Component } from 'react'
import Layout from '../components/layout'
import Card from '../components/card'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import LoginService from '../services/authentication/login'
import Router from 'next/router'

type LoginState = {
  emailActive: boolean,
  passwordActive: boolean,
  email: string,
  password: string,
  emailFailed: boolean,
  passwordFailed: boolean,
  validationErrors: string[]
}

export default class Login extends Component<{}, LoginState> {
  constructor(props) {
    super(props);

    this.state = {
      emailActive: false,
      passwordActive: false,
      email: '',
      password: '',
      emailFailed: false,
      passwordFailed: false,
      validationErrors: []
    }
  }

  private onFocus(id: string) {
    if (id === 'email') {
      this.setState({ emailActive: true })
    } else {
      this.setState({ passwordActive: true })
    }
  }

  private onBlur(id: string) {
    if (id === 'email') {
      this.setState({ emailActive: false })
    } else {
      this.setState({ passwordActive: false })
    }
  }

  private handleEmailChange(email: string) {
    this.setState({ email: email })
    if (email.length > 0 && this.state.emailFailed) {
      this.setState({ emailFailed: false })
    }
  }

  private handlePasswordChange(password: string) {
    this.setState({ password: password })
    if (password.length > 0 && this.state.passwordFailed) {
      this.setState({ passwordFailed: false })
    }
  }

  private validate() {
    this.setState({ validationErrors: [] })
    let validationErrors = []

    if (this.state.email.length === 0) {
      this.setState({ emailFailed: true })
      validationErrors.push('Email cannot be blank')
    }

    if (this.state.password.length === 0) {
      this.setState({ passwordFailed: true })
      validationErrors.push('Password cannot be blank')
    }

    this.setState({ validationErrors: validationErrors })
    return validationErrors.length === 0
  }

  private handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (this.validate()) {
      LoginService.loginUser(
        this.state.email,
        this.state.password
      )
        .then(response => {
          if (response.ok) return response.json()
          else {
            this.setState({ emailFailed: true, passwordFailed: true })
            this.setState({ validationErrors: ['Login failed, please check your Email and Password'] })
            return
          }
        })
        .then(data => {
          if (data && data.success) {
            console.log(data)
            Router.push('/')
          }
        })
    }
  }

  public render(): JSX.Element {
    return (
      <Layout showNavBar={false} user={null}>
        <div className="flex h-screen w-screen justify-center">
          <div className="m-auto w-full align-middle lg:relative md:w-2/5 lg:w-1/4">
            <Card title={'Login'} size={3}>
              <form onSubmit={e => this.handleOnSubmit(e)}>
                <label htmlFor="email" className="text-xs">EMAIL</label><br />
                <div className={`input-icon flex ${(this.state.emailActive || this.state.email.length > 0) && !this.state.emailFailed ? 'input-icon-active' : ''} ${this.state.emailFailed ? 'border-red-600' : ''} mb-10 animated`}>
                  <div className={`text-gray-500 m-auto pr-2 pl-2 animated ${this.state.emailFailed ? 'text-red-600' : ''}`}>
                    <FontAwesomeIcon aria-hidden="false" icon={faEnvelope} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="flex-grow bg-transparent pt-2 pb-2"
                    onFocus={e => this.onFocus(e.target.id)}
                    onBlur={e => this.onBlur(e.target.id)}
                    onChange={e => this.handleEmailChange(e.target.value)}
                    value={this.state.email}
                  />
                </div>

                <label htmlFor="password" className="text-xs">PASSWORD</label><br />
                <div className={`input-icon flex ${(this.state.passwordActive || this.state.password.length > 0) && !this.state.passwordFailed ? 'input-icon-active' : ''} ${this.state.passwordFailed ? 'border-red-600' : ''} animated`}>
                  <div className={`text-gray-500 m-auto pr-2 pl-2 ${this.state.passwordFailed ? 'text-red-600' : ''}`}>
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="flex-grow bg-transparent pt-2 pb-2"
                    onFocus={e => this.onFocus(e.target.id)}
                    onBlur={e => this.onBlur(e.target.id)}
                    onChange={e => this.handlePasswordChange(e.target.value)}
                    value={this.state.password}
                  />
                </div>
                <div className="mb-20 mt-4 text-sm text-red-600">
                  {this.state.validationErrors.map((err) => {
                    return <p>{err}</p>
                  })}
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white w-full p-1 rounded-md cursor-pointer animated"
                >Login</button>
              </form>
              <div className="text-sm text-center pt-20 text-gray-500">
                <p>Don't have an account yet? <Link href="/register"><a className="text-blue-500">Create an account.</a></Link></p>
                <p><Link href="/"><a className="text-blue-500">Return to homepage.</a></Link></p>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    )
  }
}