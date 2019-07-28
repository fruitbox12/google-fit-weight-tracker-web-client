import React from 'react'
import { withApi } from '../api'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, render, authorized, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (authorized) {
          console.log('Return private component')
          if (Component) {
            return <Component {...props} />
          }
          if (render) {
            return render(props)
          }
        }

        console.log('Redirect to login')
        return <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      }}
    />
  );
}

export default withApi(PrivateRoute)