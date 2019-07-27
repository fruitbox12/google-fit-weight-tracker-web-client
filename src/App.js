import React from 'react';
import './App.css';

import withAPI from './api';

function App({ loading, signIn, signOut, authorized, authResponse, }) {
  if (loading) {
    return 'Loading...'
  }

  return (
    <div className="App">
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
      You are {authorized ? 'Logged in' : 'Logged out'}
      {JSON.stringify(authResponse, null, 2)}
    </div>
  );
}

export default withAPI(App);
