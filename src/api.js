import React from 'react'

function withAPI(WrappedComponent) {
  return class Api extends React.Component {
    clientID = '117622503236-k4ap9icujnjmfct4p19cg3shci9slu85.apps.googleusercontent.com'
    jsclientURL = 'https://apis.google.com/js/api.js'
    discoveryDocs = [
      'https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest',
    ]
    scopes = 'https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write email profile openid'

    state = {
      loading: true,
      authorized: false,
      authResponse: null,
    };

    componentDidMount() {
      console.log('component loaded')
      this.loadScript(this.jsclientURL)
        .then(() => {
          this.setState({ loading: false })
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

        console.log('authorize if logged in already.')
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
          this.setUserLoggedOn()
        }
      })
        .catch(err => {
          console.log(err)
        })
    }

    setUserLoggedOn = () => {
      const authResponse = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true)
      console.log('Add user response to state', authResponse)
      this.setState({
        authorized: true,
        authResponse,
        loading: false,
      })
    }

    setUserLoggedOff = () => {
      console.log('Set user status to null')
      this.setState({
        authorized: false,
        authResponse: null,
        loading: false,
      })
    }

    request = ({ path, body, method }) => window.gapi.client.request(
      {
        path,
        body,
        method,
      }
    )

    signIn = () => {
      this.setState({
        loading: true,
      })
      window.gapi.auth2.getAuthInstance().signIn()
    }

    signOut = () => {
      this.setState({
        loading: true,
      })
      window.gapi.auth2.getAuthInstance().signOut()
      this.setUserLoggedOff()
    }

    render() {
      return <WrappedComponent {...this.state} signIn={this.signIn} signOut={this.signOut} request={this.request} />;
    }
  }
}

export default withAPI