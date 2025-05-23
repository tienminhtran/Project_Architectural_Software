import { FaShippingFast, FaHeadset, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaDiscord, } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import '../../assets/css/FooterUser.css';
import InfoHorizontal from "./InfoHorizontal";
// import Brand from './Brand.jsx';
import HomeOffers  from "./HomeOffers";
const Footer = () => {
  return (

    <div>
      <HomeOffers />
      <InfoHorizontal />


      <footer className="footer" >
        <div className="footer-top">
          {/* <Brand /> */}
        </div>
        
        {/* Top features */}
      
        <div className="footer-top" >
          <div className="feature-box">
            <FaShippingFast className="icon" />
            <div>
              <p className="feature-title">Fast & Secure Delivery</p>
              <p className="feature-desc">Tell about your service.</p>
            </div>
          </div>

          <div className="feature-box">
            <MdOutlineVerifiedUser className="icon" />
            <div>
              <p className="feature-title">100% Secure Delivery</p>
              <p className="feature-desc">Tell about your service.</p>
            </div>
          </div>

          <div className="feature-box">
            <FaHeadset className="icon" />
            <div>
              <p className="feature-title">24/7 Support</p>
              <p className="feature-desc">Tell about your service.</p>
            </div>
          </div>

          <div className="feature-box">
            <BsArrowReturnLeft className="icon" />
            <div>
              <p className="feature-title">Easy Return</p>
              <p className="feature-desc">Tell about your service.</p>
            </div>
          </div>
        </div>

        <hr />

        {/* Footer Main Content */}
        <div className="footer-container">
          {/* Support */}
          <div className="footer-column">
            <h3>Support</h3>
            <img src="../../../public/images/logo/logo-large.png" alt="Logo" className="footer-logo" />
            <p>Trường Đại học Công Nghiệp,<br />Số 4 Nguyễn Văn Bảo,<br />Phường 9, Gò Vấp.</p>
            <p><IoMdMail className="icon" /> minhtien.dev.iuh.edu@gmail.com</p>
            <p><FiPhoneCall className="icon" /> (+84) 0689188704</p>
          </div>

          {/* Account */}
          <div className="footer-column">
            <h3>Account</h3>
            <ul>
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

          {/* Quick Link */}
          <div className="footer-column">
            <h3>Quick Link</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Download App */}
          <div className="footer-column">
            <h3>Download App</h3>
            <p>Save $3 With App & New User only</p>
            <div className="download-app">
              <div className="qr-section">
                <a href="https://github.com/tienminhtran/Project_Architectural_Software" target="_blank" rel="noopener noreferrer">
                  <img src="https://storage2.me-qr.com/qr/190508882.png" alt="QR Code" />
                </a>
              </div>
              <div className="store-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" />
                <img src="https://higherlogicdownload.s3.amazonaws.com/NADP/932c62af-b1d9-4741-9d57-76fe04359af6/UploadedImages/CONVERGE/Google_Play_Store_badge_EN_svg.png" alt="Google Play" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="socials">
            <FaFacebookF className="icon" />
            <FaInstagram className="icon" />
            <FaTwitter className="icon" />
            <FaLinkedinIn className="icon" />
            <FaDiscord className="icon" />
          </div>
          <div className="payments">
            <span>Accept For</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
          </div>
        </div>
      </footer>
    </div>

  );
};

export default Footer;
