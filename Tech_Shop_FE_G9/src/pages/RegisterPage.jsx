import React from "react";
import HeaderAuth from "../components/auth/HeaderAuth";
import { Row, Col } from "react-bootstrap";
import "../assets/css/AuthPage.css";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="axil-signin-area">
      <HeaderAuth isSignin={false} />
      <Row>
        <Col xl={4} lg={6}>
          <div className="axil-signin-banner bg-image bg-image--10">
            <h3 className="title">We Offer the Best Products</h3>
          </div>
        </Col>
        <Col lg={6} xl={{ offset: 2 }}>
          <div className="axil-signin-form-warp">
            <div className="axil-signin-form">
              <h3>I'm New Here</h3>
              <p className="b2 mb-4 title">Enter your detail below</p>
              <RegisterForm />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
