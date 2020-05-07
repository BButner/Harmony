import React from 'react'
import Layout from '../components/layout'
import Card from '../components/card'
import fetch from 'isomorphic-unfetch'
import Config from '../config/default.json'
import { User } from '../models/User'

type IndexProps = {
    user: User
}

export default function Index (props: IndexProps) {
    return (
        <Layout showNavBar={true} user={props.user}>
            <div className="mt-64 w-full h-full flex-grow flex justify-center align-middle">
                <div className="m-auto">
                    test
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps (ctx) {
    const response = await fetch(Config.apiUrl + '/user', {
        credentials: 'include',
        headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })
    const json = await response.json()
    return { props: { user: json.user }}
}