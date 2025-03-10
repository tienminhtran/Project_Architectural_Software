import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Sử dụng Link từ react-router-dom để điều hướng
import "../../assets/css/HeaderAuth.css";

const HeaderAuth = ({isSignin}) => {
  return (
    <Container fluid className="signin-header py-3">
      <Row className="align-items-center">
        <Col sm={4}>
          <Link to="/" className="site-logo">
            {/* Thêm logo của bạn ở đây */}
            <img src="/images/logo/logo.png" alt="Site Logo" />
          </Link>
        </Col>
        <Col sm={8} className="text-end">
          <div className="singin-header-btn d-flex align-items-center justify-content-end">
            <p className="mb-0 me-3">{isSignin ? "Not a member?" : "Already a member?"}</p>
            <Link to={isSignin ? "/register" : "/login"}>
              <button className="sign-up-btn">{isSignin ? "Sign Up Now" : "Sign In"}</button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderAuth;
