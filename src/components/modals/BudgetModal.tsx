import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

interface BudgetModalProps {
    onClose: () => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({ onClose }) => {
    const [show] = useState<boolean>(true);

  return (
    <>
    <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Add New Budget</h4>
          <p>Please input the data you would like to track for your budget</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="budget.ControlInput1">
              <Form.Label>Budget Name</Form.Label>
              <Form.Select aria-placeholder='Frequency'>
                <option></option>
                <option>Monthly</option>
                <option>Half Year</option>
                <option>Yearly</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount.ControlInput2">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Amount"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
            <Form.Label>Frequency</Form.Label>
              <Form.Select aria-placeholder='Frequency'>
                <option></option>
                <option>Monthly</option>
                <option>Half Year</option>
                <option>Yearly</option>
                </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BudgetModal
