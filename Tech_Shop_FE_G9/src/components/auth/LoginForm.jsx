import React from "react";
import { Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  // const [error, setError] = useState(null);

  return (
    <div>
      <Form className="signin-form">
        <Form.Group className="mb-3 form-group" controlId="username">
          <Form.Label className="label-input">Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" className="form-control input-username" />
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="password">
          <Form.Label className="label-input">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" className="form-control" />
        </Form.Group>

        {/* {error && <Alert variant="danger">{error}</Alert>} */}

        <div className="d-flex align-items-center justify-content-between">
          <Button variant="primary" type="submit" size="lg">
            Sign In
          </Button>
          <Link to="/forgot-password" className="forgot-btn" style={{textDecoration: 'none'}}>
            Forget password?
          </Link>
        </div>

      </Form>
    </div>
  );
};

export default LoginForm;
