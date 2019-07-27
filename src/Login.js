import React from 'react'
import { Redirect } from 'react-router-dom'
import { withApi } from './api'

const Login = ({ location, signIn, authorized }) => {
  if (authorized) {
    return <Redirect to={location.state || { pathname: "/" }} />
  }

  return <div>
    <button onClick={signIn}>Sign In</button>
  </div>
}

export default withApi(Login)