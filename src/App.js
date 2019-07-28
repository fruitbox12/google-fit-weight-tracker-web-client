import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Backdrop from './Backdrop'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

import { withApi } from './api'

import Button from 'react-bootstrap/Button'

const Dashboard = withApi(({ signOut, getBodyWeights, getAvailableDataSources, addBodyWeight }) => {


  return <div>
    <Button onClick={signOut}>Sign Out</Button>
    Im a dashboard
    <Button onClick={getBodyWeights}>Get Data</Button>
    <Button onClick={getAvailableDataSources}>Get Data Sources</Button>
    <Button onClick={addBodyWeight}>Add Data</Button>
  </div>
});

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
