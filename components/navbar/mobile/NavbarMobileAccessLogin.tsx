import Link from 'next/link'
import { FunctionComponent } from 'react'
import { NavbarLoginButtons } from '../NavbarLoginButtons'

export const NavbarMobileAccessLogin: FunctionComponent = () => {
  return (
    <div className="space-y-4 text-center">
      <p className="text-gray-500">Already have an account?</p>
      <NavbarLoginButtons />
      <p className="text-gray-500">Don't have an account?</p>
      <Link href="/register">
        <a className="block">
          <button className="w-full">Register</button>
        </a>
      </Link>
    </div>
  )
}