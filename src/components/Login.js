import React from 'react'
import Logo from '../logo.png'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Login = ({ signIn }) => <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Row>
    <Col xs={12}>
      <img src={Logo} alt="logo" />
    </Col>
    <Col xs={12}>
      <button onClick={signIn}>Sign In</button>
    </Col>
  </Row>
</Container>

export default Login