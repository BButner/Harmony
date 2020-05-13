import React, { Component } from 'react'
import Layout from '../components/layout'
import Card from '../components/card'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faIdCard } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import LoginService from '../services/authentication/login'
import RegisterService from '../services/authentication/register'
import Router from 'next/router'

type LoginState = {
  emailActive: boolean,
  passwordActive: boolean,
  email: string,
  password: string,
  emailFailed: boolean,
  passwordFailed: boolean,
  displayName: string,
  displayNameActive: boolean,
  displayNameFailed: boolean,
  userName: string,
  userNameActive: boolean,
  userNameFailed: boolean
  password2: string,
  password2Active: boolean,
  password2Failed: boolean,
  avatar: File,
  validationErrors: string[]
}

export default class Login extends Component<{}, LoginState> {
  constructor (props) {
    super(props)

    this.state = {
      emailActive: false,
      passwordActive: false,
      email: '',
      password: '',
      emailFailed: false,
      passwordFailed: false,
      displayName: '',
      displayNameActive: false,
      displayNameFailed: false,
      userName: '',
      userNameActive: false,
      userNameFailed: false,
      password2: '',
      password2Active: false,
      password2Failed: false,
      avatar: null,
      validationErrors: []
    }
  }

  private onFocus (id: string) {
    switch (id) {
      case 'email':
        this.setState({ emailActive: true })
        break
      case 'userName':
        this.setState({ userNameActive: true })
        break
      case 'displayName':
        this.setState({ displayNameActive: true })
        break
      case 'password':
        this.setState({ passwordActive: true })
        break
      case 'password2':
        this.setState({ password2Active: true })
        break
    }
  }

  private onBlur (id: string) {
    switch (id) {
      case 'email':
        this.setState({ emailActive: false })
        break
      case 'userName':
        this.setState({ userNameActive: false })
        break
      case 'displayName':
        this.setState({ displayNameActive: false })
        break
      case 'password':
        this.setState({ passwordActive: false })
        break
      case 'password2':
        this.setState({ password2Active: false })
        break
    }
  }

  private handleDisplayNameChanged (name: string) {
    this.setState({ displayName: name })
    if (name.length > 0 && this.state.displayNameFailed) {
      this.setState({ displayNameFailed: false })
    }
  }

  private handleUserNameChanged (name: string) {
    this.setState({ userName: name })
    if (name.length > 0 && this.state.userNameFailed) {
      this.setState({ userNameFailed: false })
    }
  }

  private handleAvatarChange (file: File) {
    this.setState({ avatar: file })
    console.log(file)
  }

  private handlePassword2Change (password2: string) {
    this.setState({ password2: password2 })
    if (password2.length > 0 && this.state.password2Failed) {
      this.setState({ password2Failed: false })
    }
  }

  private handleEmailChange (email: string) {
    this.setState({ email: email })
    if (email.length > 0 && this.state.emailFailed) {
      this.setState({ emailFailed: false })
    }
  }

  private handlePasswordChange (password: string) {
    this.setState({ password: password })
    if (password.length > 0 && this.state.passwordFailed) {
      this.setState({ passwordFailed: false })
    }
  }

  private validate () {
    this.setState({ validationErrors: [] })
    const validationErrors = []

    if (this.state.email.length === 0) {
      this.setState({ emailFailed: true })
      validationErrors.push('Email cannot be blank')
    }

    if (this.state.password.length === 0) {
      this.setState({ passwordFailed: true })
      validationErrors.push('Password cannot be blank')
    }

    if (this.state.displayName.length === 0) {
      this.setState({ displayNameFailed: true })
      validationErrors.push('Name cannot be blank')
    }

    if (this.state.password2.length === 0) {
      this.setState({ password2Failed: true })
      validationErrors.push('Please enter your password again')
    }

    if (this.state.password2 !== this.state.password) {
      this.setState({ password2Failed: true })
      this.setState({ passwordFailed: true })
      validationErrors.push('Passwords do not match')
    }

    this.setState({ validationErrors: validationErrors })
    return validationErrors.length === 0
  }

  private handleOnSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (this.validate()) {
      RegisterService.registerUser(
        this.state.userName,
        this.state.displayName,
        this.state.email,
        this.state.password,
        this.state.password2,
        this.state.avatar
      )
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            LoginService.loginUser(this.state.email, this.state.password)
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  Router.push('/')
                } else {

                }
              })
          } else {
            this.setState({ validationErrors: data.error.map(err => err.msg) })
          }
        })
    }
  }

  public render (): JSX.Element {
    return (
      <Layout showNavBar={false} user={null}>
        <div className="flex w-full h-screen justify-center">
          <div className="m-auto w-full align-middle m-auto lg:relative md:w-2/5 lg:w-1/4">
            <Card title="Register">
              <form onSubmit={e => this.handleOnSubmit(e)} id="register-form">
                <label htmlFor="displayName" className="text-xs">NAME</label><br />
                <div className={`input-icon flex ${(this.state.displayNameActive || this.state.displayName.length > 0) && !this.state.displayNameFailed ? 'input-icon-active' : ''} ${this.state.displayNameFailed ? 'border-red-600' : ''} mb-10 animated`}>
                  <div className={`text-gray-500 m-auto pr-2 pl-2 animated ${this.state.displayNameFailed ? 'text-red-600' : ''}`}>
                    <FontAwesomeIcon aria-hidden="false" icon={faIdCard} />
                  </div>
                  <input
                    type="text"
                    id="displayName"
                    placeholder="Enter your name"
                    className="flex-grow bg-transparent pt-2 pb-2"
                    onFocus={e => this.onFocus(e.target.id)}
                    onBlur={e => this.onBlur(e.target.id)}
                    onChange={e => this.handleDisplayNameChanged(e.target.value)}
                    value={this.state.displayName}
                  />
                </div>

                <label htmlFor="userName" className="text-xs">USERNAME</label><br />
                <div className={`input-icon flex ${(this.state.userNameActive || this.state.userName.length > 0) && !this.state.userNameFailed ? 'input-icon-active' : ''} ${this.state.userNameFailed ? 'border-red-600' : ''} mb-10 animated`}>
                  <div className={`text-gray-500 m-auto pr-2 pl-2 animated ${this.state.userNameFailed ? 'text-red-600' : ''}`}>
                    <FontAwesomeIcon aria-hidden="false" icon={faUser} />
                  </div>
                  <input
                    type="text"
                    id="userName"
                    placeholder="Enter your username"
                    className="flex-grow bg-transparent pt-2 pb-2"
                    onFocus={e => this.onFocus(e.target.id)}
                    onBlur={e => this.onBlur(e.target.id)}
                    onChange={e => this.handleUserNameChanged(e.target.value)}
                    value={this.state.userName}
                  />
                </div>

                <label htmlFor="avatar" className="text-xs">AVATAR (OPTIONAL)</label><br />
                <div className={`input-icon flex mb-10 animated ${this.state.avatar === null ? '' : 'input-icon-active'}`}>
                  <input
                    type="file"
                    id="avatar"
                    placeholder="Enter your username"
                    className="flex-grow bg-transparent pt-2 pb-2"
                    onChange={e => this.handleAvatarChange(e.target.files[0])}
                  />
                </div>

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
                <div className={`input-icon flex ${(this.state.passwordActive || this.state.password.length > 0) && !this.state.passwordFailed ? 'input-icon-active' : ''} ${this.state.passwordFailed ? 'border-red-600' : ''} mb-10 animated`}>
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

                <label htmlFor="password2" className="text-xs">RE-ENTER PASSWORD</label><br />
                <div className={`input-icon flex ${(this.state.password2Active || this.state.password2.length > 0) && !this.state.password2Failed ? 'input-icon-active' : ''} ${this.state.password2Failed ? 'border-red-600' : ''} mb-10 animated`}>
                  <div className={`text-gray-500 m-auto pr-2 pl-2 ${this.state.password2Failed ? 'text-red-600' : ''}`}>
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <input
                    type="password"
                    id="password2"
                    placeholder="Enter your password again"
                    className="flex-grow bg-transparent pt-2 pb-2"
                    onFocus={e => this.onFocus(e.target.id)}
                    onBlur={e => this.onBlur(e.target.id)}
                    onChange={e => this.handlePassword2Change(e.target.value)}
                    value={this.state.password2}
                  />
                </div>
                <div className="mb-20 mt-4 text-sm text-red-600">
                  {this.state.validationErrors.map((err) => {
                    return <p key={err}>{err}</p>
                  })}
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 bg-blue-500 hover:bg-blue-700 text-white w-full p-1 rounded-md cursor-pointer animated"
                >Register</button>
              </form>
              <div className="text-sm text-center pt-20 text-gray-500">
                <p>Already have an account? <Link href="/login"><a className="text-purple-500">Login instead.</a></Link></p>
                <p><Link href="/"><a className="text-purple-500">Return to homepage.</a></Link></p>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    )
  }
}
