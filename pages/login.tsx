import React, { useState } from 'react'
import Layout from '../components/layout'
import Card from '../components/card'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import LoginService from '../services/authentication/login'
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
}

const Login: React.FunctionComponent = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<boolean>(false)
  const [loggingIn, setLoggingIn] = useState<boolean>(false)

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
    }
  })

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

  function handleValueChange (id: string, value: string): void {
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

    setValidationErrors(validationErrors)
    setFields(fieldsTemp)
    return validationErrors.length === 0
  }

  function handleOnSubmit (form: React.FormEvent<HTMLFormElement>): void {
    form.preventDefault()
    setLoggingIn(true)

    if (validate()) {
      LoginService.loginUser(fields.email.value, fields.password.value)
        .then(resposne => {
          if (resposne.ok) return resposne.json()
          else {
            setFields({
              email: {
                ...fields.email,
                invalid: true
              },
              password: {
                ...fields.password,
                invalid: true
              }
            })
            setValidationErrors(['Login failed, please check your Email and Password!'])
            setLoggingIn(false)
          }
        })
        .then(data => {
          if (data && data.success) {
            setSuccess(true)
            Router.push('/')
          }
        })
    }
  }

  return (
    <Layout showNavBar={false} user={null}>
      <div className="flex justify-center h-screen">
        <div className="m-auto w-full align-middle md:w-2/5 lg:w-1/4">
          <Card className="fixed bottom-0 w-full md:relative" title="Login">
            <form onSubmit={(e): void => handleOnSubmit(e)}>
              <label htmlFor="email" className="text-xs">EMAIL</label><br />
              <div className={`input-icon flex ${(fields.email.active || fields.email.value.length > 0) && !fields.email.invalid ? 'input-icon-active' : ''} ${fields.email.invalid ? 'border-red-600' : ''} ${success ? 'text-teal-500' : ''} mb-10 animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 animated ${fields.email.invalid ? 'text-red-600' : ''} ${success ? 'text-teal-500' : ''}`}>
                  <FontAwesomeIcon aria-hidden="false" icon={faEnvelope} />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="flex-grow bg-transparent pt-2 pb-2"
                  onFocus={(e): void => onFocus(e.target.id)}
                  onBlur={(e): void => onBlur(e.target.id)}
                  onChange={(e): void => handleValueChange(e.target.id, e.target.value)}
                  value={fields.email.value}
                />
              </div>

              <label htmlFor="password" className="text-xs">PASSWORD</label><br />
              <div className={`input-icon flex ${(fields.password.active || fields.password.value.length > 0) && !fields.password.invalid ? 'input-icon-active' : ''} ${fields.password.invalid ? 'border-red-600' : ''} ${success ? 'text-teal-500' : ''} animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 ${fields.password.invalid ? 'text-red-600' : ''} ${success ? 'text-teal-500' : ''}`}>
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="flex-grow bg-transparent pt-2 pb-2"
                  onFocus={(e): void => onFocus(e.target.id)}
                  onBlur={(e): void => onBlur(e.target.id)}
                  onChange={(e): void => handleValueChange(e.target.id, e.target.value)}
                  value={fields.password.value}
                />
              </div>
              <div className="mb-20 mt-8 text-sm text-red-600">
                {validationErrors.map((err) => {
                  return <p className="capitalize-first" key={err}>{err}</p>
                })}
              </div>

              <button
                type="submit"
                className="text-white w-full p-1 rounded-md cursor-pointer animated"
              >Login</button>
            </form>
            <div className="text-sm text-center pt-20 text-gray-500">
              <p>Don&apos;t have an account yet? <Link href="/register"><a className="text-purple-500">Create an account.</a></Link></p>
              <p><Link href="/"><a className="text-purple-500">Return to homepage.</a></Link></p>
            </div>
            {loggingIn && <LoadingIcon/>}
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Login
