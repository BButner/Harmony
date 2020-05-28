import React, { useState } from 'react'
import Layout from '../components/layout'
import Card from '../components/card'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faIdCard } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import LoginService from '../services/authentication/login'
import RegisterService from '../services/authentication/register'
import Router from 'next/router'
import LoadingIcon from '../components/loadingicon'

interface DefaultFieldAttributes {
  active: boolean;
  invalid: boolean;
  value: string;
}

interface Fields {
  email: DefaultFieldAttributes;
  password: DefaultFieldAttributes;
  displayName: DefaultFieldAttributes;
  userName: DefaultFieldAttributes;
  password2: DefaultFieldAttributes;
}

const Register: React.FunctionComponent = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [fields, setFields] = useState<Fields>({
    email: {
      active: false,
      invalid: false,
      value: ''
    },
    password: {
      active: false,
      invalid: false,
      value: ''
    },
    displayName: {
      active: false,
      invalid: false,
      value: ''
    },
    userName: {
      active: false,
      invalid: false,
      value: ''
    },
    password2: {
      active: false,
      invalid: false,
      value: ''
    }
  })
  const [registering, setRegistering] = useState<boolean>(false)

  function onFocus (id: string): void {
    setFields({
      ...fields,
      [id]: {
        ...fields[id],
        active: true
      }
    })
  }

  function onBlur (id: string): void {
    setFields({
      ...fields,
      [id]: {
        ...fields[id],
        active: false
      }
    })
  }

  function handleValueOnChange (id: string, value: string): void {
    setFields({
      ...fields,
      [id]: {
        ...fields[id],
        value: value,
        invalid: !(value.length > 0)
      }
    })
  }

  function validate (): boolean {
    setValidationErrors([])
    const validationErrors: string[] = []
    let fieldsTemp = fields

    Object.entries(fields).filter(e => e[1].value === '').map((key) => {
      validationErrors.push(`${key[0]} cannot be empty!`)
      fieldsTemp = {
        ...fieldsTemp,
        [key[0]]: {
          ...fieldsTemp[key[0]],
          invalid: true
        }
      }
    })

    if (fieldsTemp.password.value !== fieldsTemp.password2.value) {
      validationErrors.push('Passwords do not match!')
    }

    setValidationErrors(validationErrors)
    setFields(fieldsTemp)
    return validationErrors.length === 0
  }

  function handleOnSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setRegistering(true)

    if (validate()) {
      RegisterService.registerUser(
        fields.userName.value,
        fields.displayName.value,
        fields.email.value,
        fields.password.value,
        fields.password2.value
      )
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            LoginService.loginUser(fields.email.value, fields.password.value)
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  Router.push('/')
                }
              })
          } else {
            const errors = []
            setRegistering(false)
            data.error.map((err) => {
              errors.push(err.msg)
            })
            setValidationErrors(errors)
          }
        })
    }
  }

  return (
    <Layout pageTitle="Register" showNavBar={false} user={null}>
      <div className="flex w-full h-screen justify-center">
        <div className="m-auto w-full align-middle m-auto lg:relative md:w-2/5 lg:w-1/4">
          <Card title="Register">
            <form onSubmit={(e): void => handleOnSubmit(e)} id="register-form">
              <label htmlFor="displayName" className="text-xs">NAME</label><br />
              <div className={`input-icon flex ${(fields.displayName.active || fields.displayName.value.length > 0) && !fields.displayName.invalid ? 'input-icon-active' : ''} ${fields.displayName.invalid ? 'border-red-600' : ''} mb-10 animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 animated ${fields.displayName.invalid ? 'text-red-600' : ''}`}>
                  <FontAwesomeIcon aria-hidden="false" icon={faIdCard} />
                </div>
                <input
                  type="text"
                  id="displayName"
                  placeholder="Enter your name"
                  className="flex-grow bg-transparent pt-2 pb-2"
                  onFocus={(e): void => onFocus(e.target.id)}
                  onBlur={(e): void => onBlur(e.target.id)}
                  onChange={(e): void => handleValueOnChange(e.target.id, e.target.value)}
                  value={fields.displayName.value}
                  readOnly={registering}
                />
              </div>

              <label htmlFor="userName" className="text-xs">USERNAME</label><br />
              <div className={`input-icon flex ${(fields.userName.active || fields.userName.value.length > 0) && !fields.userName.invalid ? 'input-icon-active' : ''} ${fields.userName.invalid ? 'border-red-600' : ''} mb-10 animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 animated ${fields.userName.invalid ? 'text-red-600' : ''}`}>
                  <FontAwesomeIcon aria-hidden="false" icon={faUser} />
                </div>
                <input
                  type="text"
                  id="userName"
                  placeholder="Enter your username"
                  className="flex-grow bg-transparent pt-2 pb-2"
                  onFocus={(e): void => onFocus(e.target.id)}
                  onBlur={(e): void => onBlur(e.target.id)}
                  onChange={(e): void => handleValueOnChange(e.target.id, e.target.value)}
                  value={fields.userName.value}
                  readOnly={registering}
                />
              </div>

              <label htmlFor="email" className="text-xs">EMAIL</label><br />
              <div className={`input-icon flex ${(fields.email.active || fields.email.value.length > 0) && !fields.email.invalid ? 'input-icon-active' : ''} ${fields.email.invalid ? 'border-red-600' : ''} mb-10 animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 animated ${fields.email.invalid ? 'text-red-600' : ''}`}>
                  <FontAwesomeIcon aria-hidden="false" icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="flex-grow bg-transparent pt-2 pb-2"
                  onFocus={(e): void => onFocus(e.target.id)}
                  onBlur={(e): void => onBlur(e.target.id)}
                  onChange={(e): void => handleValueOnChange(e.target.id, e.target.value)}
                  value={fields.email.value}
                  readOnly={registering}
                />
              </div>

              <label htmlFor="password" className="text-xs">PASSWORD</label><br />
              <div className={`input-icon flex ${(fields.password.active || fields.password.value.length > 0) && !fields.password.invalid ? 'input-icon-active' : ''} ${fields.password.invalid ? 'border-red-600' : ''} mb-10 animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 ${fields.password.invalid ? 'text-red-600' : ''}`}>
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="flex-grow bg-transparent pt-2 pb-2"
                  onFocus={(e): void => onFocus(e.target.id)}
                  onBlur={(e): void => onBlur(e.target.id)}
                  onChange={(e): void => handleValueOnChange(e.target.id, e.target.value)}
                  value={fields.password.value}
                  readOnly={registering}
                />
              </div>

              <label htmlFor="password2" className="text-xs">RE-ENTER PASSWORD</label><br />
              <div className={`input-icon flex ${(fields.password2.active || fields.password2.value.length > 0) && !fields.password2.invalid ? 'input-icon-active' : ''} ${fields.password2.invalid ? 'border-red-600' : ''} mb-10 animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 ${fields.password2.invalid ? 'text-red-600' : ''}`}>
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type="password"
                  id="password2"
                  placeholder="Enter your password again"
                  className="flex-grow bg-transparent pt-2 pb-2"
                  onFocus={(e): void => onFocus(e.target.id)}
                  onBlur={(e): void => onBlur(e.target.id)}
                  onChange={(e): void => handleValueOnChange(e.target.id, e.target.value)}
                  value={fields.password2.value}
                  readOnly={registering}
                />
              </div>
              <div className="mb-20 mt-4 text-sm text-red-600">
                {validationErrors.map((err) => {
                  return <p className="lowercase capitalize-first" key={err}>{err.replace('displayName', 'Name').replace('password2', 'Password re-entry')}</p>
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

            {registering && <LoadingIcon/>}
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Register
