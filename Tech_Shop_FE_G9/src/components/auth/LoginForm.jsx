import React, { useState } from "react";
import { Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  login,
  saveAccessToken,
  getAccessToken,
  saveRefreshToken,
} from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, handleFailure } from "../../store/slices/AuthSlice.js";
import { toast } from "react-toastify";
import SignInwithGoogle from "./LoginWithGoogle.jsx";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle submit form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });

      console.log(response.token.accessToken);
      saveAccessToken(response.token.accessToken); // save access token
      saveRefreshToken(response.token.refreshToken); // save refresh token

      console.log(getAccessToken());
      console.log(response.token);

      dispatch(loginSuccess(response.token)); // login success, save infomation to redux
      console.log(response.token.roles);

      if (response.token.roles[0] === "ROLE_USER") {
        navigate("/");
      }

      navigate(
        `/${response.token.roles[0]
          .toLowerCase()
          .replace("role_", "")}/dashboard`
      ); // navigate to
    } catch (error) {
      console.error("Login error:", error.response.data.message);
      dispatch(handleFailure(error.response.data));
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <Form className="auth-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-group" controlId="username">
          <Form.Label className="label-input">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            className="form-control input-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="password">
          <Form.Label className="label-input">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="form-control input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* {error && <Alert variant="danger">{error.message}</Alert>} */}

        <div className="d-flex align-items-center justify-content-between gap-5">
          <Button variant="primary" type="submit" size="lg" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Link
            to="/forgot-password"
            className="forgot-btn text-decoration-none"
          >
            Forget password?
          </Link>
        </div>

        <SignInwithGoogle />
      </Form>
    </div>
  );
};

export default LoginForm;
