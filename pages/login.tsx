import React, { FunctionComponent } from 'react'
import Layout from '../components/layout'
import Card from '../components/card'
import Link from 'next/link'

const Login: FunctionComponent = () => {
  const handleGoogleLoginClick = () => {
    window.location.href = 'http://10.0.0.97:3001/login/google'
  }

  const handleFacebookLoginClick = () => {
    window.location.href = 'http://10.0.0.97:3001/login/facebook'
  }

  const handleSpotifyLoginClick = () => {
    window.location.href = 'http://10.0.0.97:3001/login/spotify'
  }

  const handleTwitterLoginClick = () => {
    window.location.href = 'http://localhost:3001/login/twitter'
  }

  return (
    <Layout pageTitle="Login/Register" showNavBar={false} user={null}>
      <div className="flex justify-center h-screen">
        <div className="m-auto w-full align-middle md:w-2/5 lg:w-1/5">
          <Card className="fixed bottom-0 w-full md:relative login-buttons" title="Login">
            <button className="button-google m-auto flex justify-center align-center animated w-full" onClick={handleGoogleLoginClick}>
              <div className="flex">
                <img src="/images/logos/google.png" className="w-10 h-10"/>
                <p className="ml-4 m-auto">Login with Google</p>
              </div>
            </button>
            <button className="button-facebook m-auto flex justify-center align-center animated w-full" onClick={handleFacebookLoginClick}>
              <div className="flex">
                <img src="/images/logos/facebook.png" className="w-10 h-10"/>
                <p className="ml-4 m-auto">Login with Facebook</p>
              </div>
            </button>
            <button className="button-twitter m-auto flex justify-center align-center animated w-full" onClick={handleTwitterLoginClick}>
              <div className="flex">
                <img src="/images/logos/twitter.png" className="w-10 h-10"/>
                <p className="ml-4 m-auto">Login with Twitter</p>
              </div>
            </button>
            <button className="button-spotify m-auto flex justify-center align-center animated w-full" onClick={handleSpotifyLoginClick}>
              <div className="flex">
                <img src="/images/logos/spotify_white.png" className="w-10 h-10"/>
                <p className="ml-4 m-auto">Login with Spotify</p>
              </div>
            </button>
            <div className="text-sm text-center mt-10 text-gray-500">
              <p>For increased security and ease of access, we do not implement the ability to register/login with only a username and password.</p>
              <p><Link href="/"><a className="text-purple-500">Return to homepage.</a></Link></p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Login
