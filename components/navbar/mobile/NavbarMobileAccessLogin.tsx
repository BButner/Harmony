import Link from 'next/link'
import { FunctionComponent } from 'react'
import { NavbarLoginButtons } from '../NavbarLoginButtons'
import { PencilAltIcon } from '@heroicons/react/outline'

export const NavbarMobileAccessLogin: FunctionComponent = () => {
  return (
    <div className="space-y-4 text-center">
      <p className="text-gray-500">Already have an account?</p>
      <NavbarLoginButtons />
      <p className="text-gray-500">Don't have an account?</p>
      <Link href="/register">
        <a className="block">
          <button className="w-full py-4 flex items-center justify-center space-x-4">
            <p>Register</p>
            <PencilAltIcon className="w-5 h-5 text-gray-200" />
          </button>
        </a>
      </Link>
    </div>
  )
}