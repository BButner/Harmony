import React, { useState } from 'react'
import Layout from '../components/layout'
import Card from '../components/card'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import LoginService from '../services/authentication/login'
import Router from 'next/router'

interface ActiveFields {
  email: boolean;
  password: boolean;
}

interface LoginFields {
  email: string;
  password: string;
}

interface InvalidatedFields {
  email: boolean;
  password: boolean;
}

const Login: React.FunctionComponent = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const [activeFields, setActiveFields] = useState<ActiveFields>({
    email: false,
    password: false
  })

  const [fields, setFields] = useState<LoginFields>({
    email: '',
    password: ''
  })

  const [invalidatedFields, setInvalidatedFields] = useState<InvalidatedFields>({
    email: false,
    password: false
  })

  function onFocus (id: string): void {
    setActiveFields({
      ...activeFields,
      [id]: true
    })
  }

  function onBlur (id: string): void {
    setActiveFields({
      ...activeFields,
      [id]: false
    })
  }

  function handleValueChange (id: string, value: string): void {
    setFields({
      ...fields,
      [id]: value
    })

    if (fields[id].length > 0 && invalidatedFields[id]) {
      setInvalidatedFields({
        ...invalidatedFields,
        [id]: false
      })
    }
  }

  function validate (): boolean {
    setValidationErrors([])
    const validationErrors: string[] = []
    let invalidatedFields: InvalidatedFields = {
      email: false,
      password: false
    }

    Object.entries(fields).filter(e => e[1].length === 0).map((key) => {
      validationErrors.push(`${key[0]} cannot be empty!`)
      invalidatedFields = {
        ...invalidatedFields,
        [key[0]]: true
      }
    })

    setValidationErrors(validationErrors)
    setInvalidatedFields(invalidatedFields)
    return validationErrors.length === 0
  }

  function handleOnSubmit (form: React.FormEvent<HTMLFormElement>): void {
    form.preventDefault()

    if (validate()) {
      LoginService.loginUser(fields.email, fields.password)
        .then(resposne => {
          if (resposne.ok) return resposne.json()
          else {
            setInvalidatedFields({ email: true, password: true })
            setValidationErrors(['Login failed, please check your Email and Password!'])
          }
        })
        .then(data => {
          if (data && data.success) Router.push('/')
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
              <div className={`input-icon flex ${(activeFields.email || fields.email.length > 0) && !invalidatedFields.email ? 'input-icon-active' : ''} ${invalidatedFields.email ? 'border-red-600' : ''} mb-10 animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 animated ${invalidatedFields.email ? 'text-red-600' : ''}`}>
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
                  value={fields.email}
                />
              </div>

              <label htmlFor="password" className="text-xs">PASSWORD</label><br />
              <div className={`input-icon flex ${(activeFields.password || fields.password.length > 0) && !invalidatedFields.password ? 'input-icon-active' : ''} ${invalidatedFields.password ? 'border-red-600' : ''} animated`}>
                <div className={`text-gray-500 m-auto pr-2 pl-2 ${invalidatedFields.password ? 'text-red-600' : ''}`}>
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
                  value={fields.password}
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
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Login
