import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Backdrop from './Backdrop'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

import { withApi } from './api'

const Dashboard = withApi(({ signOut }) => <div>  <button onClick={signOut}>Sign Out</button>Im a dashboard</div>);

function App({ loading, ready }) {

  if (!ready) {
    return <Backdrop />
  }

  return (
    <BrowserRouter>
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
