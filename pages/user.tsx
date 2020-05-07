import fetch from 'isomorphic-unfetch'
import Config from '../config/default.json'
import Layout from '../components/layout'
import { User } from '../models/User'
import Card from '../components/card'

type UserProps  = {
    user: User
}

export default function UserCard (props: UserProps) {
    return (
        <Layout showNavBar={true} user={props.user}>
            <div className="mt-20 flex justify-center flex-wrap items-start">
                <Card title={props.user.userName} subtitle={props.user.displayName} size={2} className="md:mr-10 mb-20 md:mb-0">
                    <div className="text-center">
                        <img className='w-48 h-48 rounded-full mb-10 m-auto' src={`${Config.bucketUrl}${props.user.avatarUrl}.jpg`} alt="Avatar"/>
                        <div className='pb-5'>
                            <p className='pb-2'><input type="email" className='border border-gray-500 rounded p-1' readOnly={true} placeholder={'example@example.com'}/></p>
                            <button className='bg-blue-500 text-white hover:bg-blue-600 rounded pt-1 pb-1 pl-5 pr-5 animated'>Change Email</button>
                        </div>
                        <p className="pt-20 text-xs text-gray-500 italic">Member since {new Date(props.user.date.toString()).toDateString()}</p>
                    </div>
                </Card>

                <Card size={2} title={'Statistics'}>
                    <div className="md:flex">
                        <div className="stat-wrapper text-center md:mr-10 mb-10">
                            <p className="text-blue-500 text-6xl">6</p>
                            <p>Playlists Transferred</p>
                        </div>
                        <div className="stat-wrapper text-center md:mr-10">
                            <p className="text-blue-500 text-6xl">18</p>
                            <p>Playlists You've Grabbed</p>
                        </div>
                        <div className="stat-wrapper text-center">
                            <p className="text-blue-500 text-6xl">53</p>
                            <p>Playlists Grab Count</p>
                        </div>
                    </div>
                </Card>
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