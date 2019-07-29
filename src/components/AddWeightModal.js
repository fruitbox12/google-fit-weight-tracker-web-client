import React from 'react'

import Modal from 'react-bootstrap/Modal'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const AddWeightModal = ({ handleClose, handleAddWeight, handleWeightChange, show, weight, disabled }) => {
  return <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add new weight recording</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormLabel>Weight (kg)</FormLabel>
      <FormControl onChange={handleWeightChange} value={weight} type="number" placeholder="80" aria-label="weight in kg" />
    </Modal.Body>

    <Modal.Footer>
      <Button disabled={disabled} variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button disabled={disabled} variant="primary" onClick={handleAddWeight}>Add Weight</Button>
    </Modal.Footer>
  </Modal>
}

export default AddWeightModal