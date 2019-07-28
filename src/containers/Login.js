import React from 'react'
import { Redirect } from 'react-router-dom'
import { withApi } from '../api'

import LoginView from '../components/Login'

const Login = ({ location, signIn, authorized }) => {
  if (authorized) {
    return <Redirect to={location.state || { pathname: "/" }} />
  }

  return <LoginView signIn={signIn} />
}

export default withApi(Login)