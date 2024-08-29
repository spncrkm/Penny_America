import React, { useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";

interface SavingModalProps {
  onClose: () => void;
}

const SavingPlan: React.FC<SavingModalProps> = ({ onClose }) => {
  const [show] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState<string>('');

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const regex = /^\d{0,9}(\.\d{0,2})?$/;
    if (regex.test(value)) {
      setAmount(value);
    }
  }

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Add New Savings Plan</h4>
            <p>
              Please input your savings plan so we can help you achieve your
              goals
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="budget.ControlInput1">
              <Form.Label>Saving Plan</Form.Label>
              <Form.Select aria-placeholder="Saving plan">
                <option></option>
                <option>Monthly</option>
                <option>Half Year</option>
                <option>Yearly</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount.ControlInput2">
              <Form.Label>Amount</Form.Label>
              <InputGroup>
              <InputGroup.Text>
              <BsCurrencyDollar />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Enter Amount" value={amount} onChange={handleAmountChange}/>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="targetDate.ControlInput3">
              <Form.Label>Input Target Date</Form.Label>
              <InputGroup>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                  placeholderText="Select a date"
                />
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
              </InputGroup>
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
  );
};

export default SavingPlan;
