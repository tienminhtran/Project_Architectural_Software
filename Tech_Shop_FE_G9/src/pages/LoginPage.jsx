import React from "react";
import HeaderAuth from "../components/auth/HeaderAuth";
import { Row, Col } from "react-bootstrap";
import "../assets/css/LoginPage.css"
const LoginPage = () => {
  return (
    <div className="axil-signin-area ">
      <HeaderAuth/>
      <Row >
        <Col xl={4} lg={6}>
          <div className="axil-signin-banner bg-image bg-image--9">
            <h3 className="title">We Offer the Best Products</h3>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;