import React from 'react'
import Link from 'next/link'
import { User } from '../models/User'

type HeaderProps = {
    links: string[],
    user: User
}

export default function Header (props: HeaderProps) {
    return (
        <nav className="flex items-center justify-between flex-wrap p-6 z-50 bg-white w-screen softer-shadow">
            <div className="flex items-center flex-shrink-0 text-lg">
                <Link href="/"><a>harmony</a></Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded border-primary-100 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-center">
                <div className="text-sm lg:flex-grow justify-center text-center font-semibold text-gray-600">
                    {props.links.map((link) => {
                        return <Link href={link} key={link}><a className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 lg:mr-4 animated">{link}</a></Link>
                    })}
                </div>
                <Link href={props.user === null ? '/login' : '/user'}>
                    <a className="inline-block text-sm px-4 py-2 leading-none rounded text-blue-500 border border-blue-500 bg-white hover:border-transparent hover:text-white hover:bg-blue-600 mt-4 lg:mt-0 animated">
                        { props.user === null ? 'Login/Register' : props.user.userName }
                    </a>
                </Link>
            </div>
        </nav>
    )
}