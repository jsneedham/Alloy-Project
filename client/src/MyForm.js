import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name_first: '',
    name_last: '',
    address_line_1: '',
    address_line_2: '',
    address_city: '',
    address_state: '',
    address_postal_code: '',
    address_country_code: '',
    document_ssn: '',
    email_address: '',
    birth_date: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  //List of valid state codes
  const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  // Validation rules provided in step 3 of take home instructions. Real time validation
  const validateField = (name, value) => {
    let errors = { ...validationErrors };

    switch (name) {
      case 'address_state':
        errors.address_state = US_STATES.includes(value) ? '' : 'Must be upper case two-letter code of a US state.';
        break;
      case 'document_ssn':
        errors.document_ssn = /^\d{9}$/.test(value) ? '' : 'SSN must be 9 digits, no dashes';
        break;
      case 'address_country_code':
        errors.address_country_code = value === 'US' ? '' : 'Country must be "US"';
        break;
      case 'birth_date':
        errors.birth_date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? '' : 'Invalid date format. Must be YYYY-MM-DD';
        //React form fields with "date" types will return ISO-8601 format: YYYY-MM-DD, so this isn't totally necessary but still good check
        break;
        //Add additional validation for making sure email is in right format, date of birth is such that user is at least x years old
      default:
        break;
    }

    setValidationErrors(errors);
  };

  const validateForm = () => {
    const isValid = Object.values(validationErrors).every((error) => !error);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      // Send data to backend
      try {
        const response = await fetch('http://localhost:5000/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        // Receive a response from backend
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log('Response from server:', jsonResponse);
          // Route to the appropraite page based on outcome
          const outcome = jsonResponse.external_data?.summary?.outcome;
          navigate(`/confirmation/${outcome}`);          
        } else {
          console.error('Server error:', response.status); // Received bad response from backend
        }
      } catch (error) {
        console.error('Error occurred while sending data:', error); // Request not sent, response never received
      }
    } else {
      alert('Please fill in the form correctly.'); // Need to add more validation if we ever get this alert
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: '#deded7', minHeight: '100vh', width: '100%'}}
    >
      <Card
        className="p-3 rounded"
        style={{
          backgroundColor: 'white',
          maxWidth: '500px',
          boxShadow: '0 4px 20px rgba(150, 150, 150, 0.5)',
          marginTop: '-150px',
        }}
      >
        <Card.Title className="text-center mb-4">Apply for a Gotham Capital Account</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group controlId="name_first">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name_first"
                  value={formData.name_first}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="name_last">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name_last"
                  value={formData.name_last}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="address_line_1" className="mb-2">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control
              type="text"
              name="address_line_1"
              value={formData.address_line_1}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="address_line_2" className="mb-2">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control
              type="text"
              name="address_line_2"
              value={formData.address_line_2}
              onChange={handleChange}
            />
          </Form.Group>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group controlId="address_city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="address_city"
                  value={formData.address_city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="address_state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="address_state"
                  value={formData.address_state}
                  onChange={handleChange}
                  maxLength={2}
                  required
                />
                {validationErrors.address_state && <div className="text-danger">{validationErrors.address_state}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group controlId="address_postal_code">
                <Form.Label>Zip/Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="address_postal_code"
                  value={formData.address_postal_code}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="address_country_code">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="address_country_code"
                  value={formData.address_country_code}
                  onChange={handleChange}
                  required
                />
                {validationErrors.address_country_code && <div className="text-danger">{validationErrors.address_country_code}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="document_ssn" className="mb-2">
            <Form.Label>SSN</Form.Label>
            <Form.Control
              type="text"
              name="document_ssn"
              value={formData.document_ssn}
              onChange={handleChange}
              required
            />
            {validationErrors.document_ssn && <div className="text-danger">{validationErrors.document_ssn}</div>}
          </Form.Group>
          <Form.Group controlId="email_address" className="mb-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="birth_date" className="mb-2">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date" // Type "date" is normalized to return ISO-8601 format: YYYY-MM-DD
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
            {validationErrors.birth_date && <div className="text-danger">{validationErrors.birth_date}</div>}
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2" disabled={!validateForm()}>
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default MyForm;