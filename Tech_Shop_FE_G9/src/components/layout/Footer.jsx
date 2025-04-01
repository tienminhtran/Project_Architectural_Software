import { Container, Row, Col } from 'react-bootstrap';
import { FaShippingFast, FaHeadset, FaApple, FaGooglePlay } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-light py-5 border-top">
      <Container>
        {/* Top Features */}
        <Row className="text-center border-bottom pb-4">
          <Col md={3} className="mb-3">
            <FaShippingFast className="text-primary fs-2" />
            <h5>Fast & Secure Delivery</h5>
            <p className="text-muted">Tell about your service.</p>
          </Col>
          <Col md={3} className="mb-3">
            <MdOutlineVerifiedUser className="text-primary fs-2" />
            <h5>Money Back Guarantee</h5>
            <p className="text-muted">Within 10 days.</p>
          </Col>
          <Col md={3} className="mb-3">
            <BsArrowReturnLeft className="text-primary fs-2" />
            <h5>24 Hour Return Policy</h5>
            <p className="text-muted">No question ask.</p>
          </Col>
          <Col md={3} className="mb-3">
            <FaHeadset className="text-primary fs-2" />
            <h5>Pro Quality Support</h5>
            <p className="text-muted">24/7 Live support.</p>
          </Col>
        </Row>

        {/* Footer Content */}
        <Row className="py-4">
          <Col md={3}>
            <h5>Support</h5>
            <p className="text-muted">Trường Đại học Công Nghiệp, Số 4 Nguyen Van Bao, Phường 9, Gò Vấp.</p>
            <p><IoMdMail className="me-2" /> minhtien.dev.iuh.edu@gmail.com</p>
            <p><FiPhoneCall className="me-2" /> (+84) 0689188704</p>
          </Col>
          <Col md={3}>
            <h5>Account</h5>
            <ul className="list-unstyled text-muted">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Quick Link</h5>
            <ul className="list-unstyled text-muted">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Download App</h5>
            <p className="text-muted">Save $3 With App & New User only</p>
            <div className="d-flex gap-3 mt-2">
              <FaApple className="fs-1 text-dark" />
              <FaGooglePlay className="fs-1 text-dark" />
            </div>
          </Col>
        </Row>

        {/* Bottom Footer */}
        <div className="text-center text-muted border-top pt-3">
          <p>© 2024. All rights reserved by 4 Con Đường Đế Team.</p>
          <p className="mt-2">
            Accept For <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="mx-2" height="20" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" height="20" />
          </p>
        </div>
      </Container>
    </footer>
  );
}


export default Footer;