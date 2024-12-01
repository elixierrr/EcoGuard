import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="logo">
            {/* Logo ECOGUARD */}
            <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '2rem' }}>ECOGUARD</h1>
          </div>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                style={{
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                style={{
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: '#38C3A1',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;