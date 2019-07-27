import React from 'react'

export default class API {
  clientID = '117622503236-k4ap9icujnjmfct4p19cg3shci9slu85.apps.googleusercontent.com'
  jsclientURL = 'https://apis.google.com/js/api.js'
  discoveryDocs = [
    'https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest',
  ]
  scopes = 'https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write email profile openid'

  initApi = ({
    onReady,
    onSignIn,
    onSignOut,
  }) => {
    this.onReady = onReady
    this.onSignIn = onSignIn
    this.onSignOut = onSignOut
    this.loadScript(this.jsclientURL)
      .then(() => {
        console.log('script loaded')
        window.gapi.load('client', this.initClient)
      })
  }

  loadScript = (src) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    const promise = new Promise((resolve, reject) => {
      script.addEventListener('load', () => resolve(src));
      script.addEventListener('error', e => reject(e));
    }).catch(e => {
      throw e;
    });

    document.body.appendChild(script);

    return promise;
  };

  initClient = () => {
    console.log('start init client')
    window.gapi.client.init({
      discoveryDocs: this.discoveryDocs,
      clientId: this.clientID,
      scope: this.scopes,
    }).then(res => {
      console.log('init client complete')

      window.gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
        console.log('Sign in status change,', isSignedIn)
        if (isSignedIn) {
          this.setUserLoggedOn()
        } else {
          this.setUserLoggedOff()
        }
      });

      console.log('check if authorized already.')
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        this.setUserLoggedOn()
      }

      this.onReady()
    })
  }

  setUserLoggedOn = () => {
    const authResponse = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true)
    console.log('User response to state', authResponse)
    this.onSignIn(authResponse)
  }

  setUserLoggedOff = () => {
    console.log('user Signed off')
    this.onSignOut()
  }


  signIn = () => {
    window.gapi.auth2.getAuthInstance().signIn()
  }

  signOut = () => {
    window.gapi.auth2.getAuthInstance().signOut()
    this.setUserLoggedOff()
  }

  request = ({ path, body, method }) => window.gapi.client.request(
    {
      path,
      body,
      method,
    }
  )
}

const ApiContext = React.createContext('api')

export class ApiProvider extends React.Component {
  state = {
    ready: false,
    loading: true,
    authorized: false,
    authResponse: null,

    signIn: () => {
      this.setState({
        loading: true,
      })
      this.props.api.signIn()
    },

    signOut: () => {
      this.setState({
        loading: true,
      })
      this.props.api.signOut()
    },
  }

  componentDidMount() {
    console.log('component loaded')
    this.props.api.initApi({
      onReady: () => this.setState({ loading: false, ready: true }),
      onSignIn: (authResposne) => this.setState({
        authorized: true,
        authResposne,
        loading: false,
      }),
      onSignOut: () => this.setState({
        authorized: false,
        authResponse: null,
        loading: false,
      })
    })
  }

  render() {
    return <ApiContext.Provider value={this.state}>
      {this.props.children}
    </ApiContext.Provider>
  }
}


export const withApi = Component => function WrappedComponent(props) {
  return <ApiContext.Consumer>
    {
      value => <Component {...value} {...props} />
    }
  </ApiContext.Consumer>
}