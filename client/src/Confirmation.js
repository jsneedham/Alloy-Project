import React from 'react';
import { Container, Card } from 'react-bootstrap';

// Routing to appropriate page based on outcome from backend
const Confirmation = ({ outcome }) => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#deded7' }}
    >
      <Card
        className="p-3 rounded"
        style={{ 
            backgroundColor: 'white', 
            maxWidth: '400px', 
            boxShadow: '0 4px 20px rgba(150, 150, 150, 0.5)',
            marginTop: '-500px',
        }}
      >
        <Card.Title className="text-center">Application Submission Status</Card.Title>
        <Card.Body className="text-center">
          {outcome === 'Approved' && <p>Success! Your application has been approved!</p>}
          {outcome === 'Manual Review' && <p>Thanks for submitting your application, we'll be in touch shortly</p>}
          {outcome === 'Denied' && <p>Sorry, your application was not successful</p>}
          {outcome !== 'Approved' && outcome !== 'Manual Review' && outcome !== 'Denied' && (
            <p>Unexpected outcome. Please check with support.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Confirmation;