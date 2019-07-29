import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const backdropStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#000',
  opacity: 0.5,
  display: 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
};

export default () => <div style={backdropStyle}>
  <Spinner animation="border" role="status" style={{ zIndex: 1041, width: '100px', height: '100px' }}>
    <span className="sr-only">Loading...</span>
  </Spinner>
</div>