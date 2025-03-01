import React, { useState } from 'react';
import { Form, Button, Card, Col, Row, Container, Alert } from 'react-bootstrap';
import './loginStyle.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    navigate('/dashboard', { replace: true });

    // e.preventDefault();
    // try {
    //   const response = await axios.post('/api/auth/login', { email, password });
    //   if (response.data.success) {
    //     navigate('/dashboard');
    //   } else {
    //     setError('Contraseña o email incorrecto');
    //   }
    // } catch (err) {
    //   setError('A ocurrido un error, vuelve a intentar.');
    // }
  };

  return (
    <div className='containerLogin'>
      <Container fluid>
        <Row className='justify-content-md-center'>
          <Col xs={12} sm={6} md={6} lg={6} xl={4}>
            <h1 className='title text-center'>Login</h1>
            <Card className='card'>
              <Card.Body>
                <Form onSubmit={handleLogin}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type={visiblePassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setVisiblePassword(!visiblePassword)}
                    >
                      {visiblePassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}