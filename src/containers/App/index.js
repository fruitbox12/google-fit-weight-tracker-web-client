import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Backdrop from '../../components/Backdrop'

import Login from '../Login'
import PrivateRoute from '../PrivateRoute'
import Dashboard from '../Dashboard'

import { withApi } from '../../api'


function App({ loading, ready }) {

  if (!ready) {
    return <Backdrop />
  }

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
      <div className="App">
        {loading && <Backdrop />}
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Dashboard}
          />
          <Route
            path="/login"
            component={Login}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default withApi(App);
