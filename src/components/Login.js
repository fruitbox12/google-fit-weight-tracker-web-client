import React from 'react'
import Logo from '../logo.png'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Login = ({ signIn }) => <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Row>
    <Col xs={12}>
      <img src={Logo} alt="logo" />
    </Col>
    <Col xs={12}>
      <Button onClick={signIn}>Sign In</Button>
    </Col>
  </Row>
</Container>

export default Login