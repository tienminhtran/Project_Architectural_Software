import React from "react";
import { Form, Button } from "react-bootstrap";

const RegisterForm = () => {
  return (
    <div>
      <Form className="auth-form" onSubmit={() => {}}>
        <Form.Group className="mb-3 form-group" controlId="username">
          <Form.Label className="label-input">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            className="form-control input-username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="email">
          <Form.Label className="label-input">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="form-control input-email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="password">
          <Form.Label className="label-input">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter passowrd"
            className="form-control input-password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="confirm-password">
          <Form.Label className="label-input">Email</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            className="form-control input-password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="phone">
          <Form.Label className="label-input">Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter phone number"
            className="form-control input-phone"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="first-name">
          <Form.Label className="label-input">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            className="form-control input-fist-name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="last-name">
          <Form.Label className="label-input">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            className="form-control input-last-name"
            required
          />
        </Form.Group>
        {/* gender */}

        <Form.Group className="mb-3 form-group" controlId="gender">
          <h3>Gender</h3>
          <div className="mt-2 ms-4">
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              id="check-gender"
              value="Male"
            />

            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              id="check-gender"
              value="Female"
              className="mt-3"

            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="dob">
          <Form.Label className="label-input">Day of birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter last name"
            className="form-control input-last-name"
            required
          />
        </Form.Group>

        <div className="d-flex align-items-center justify-content-between gap-5">
          <Button variant="primary" type="submit" size="lg">
            Create Account
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default RegisterForm;
