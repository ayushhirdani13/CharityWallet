import React from "react";
import "../Styles/footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section_padding">
        <div className="footer-links">
          <div className="footer-links-div">
            <h4>QUICK LINKS</h4>
            <a href="/employer">
              <p> About us</p>
            </a>
            <a href="/employer">
              <p> Emergency Help</p>
            </a>
            <a href="/employer">
              <p> NGOs</p>
            </a>
            <a href="/employer">
              <p> Campaigns</p>
            </a>
          </div>
          <div className="fotter-links-div">
            <h4>SUPPORT US</h4>
            <a href="/FAQS">
              <p> FAQs</p>
            </a>
            <a href="/Privacy Policy">
              <p> Privacy Policy</p>
            </a>
            <a href="/T&C">
              <p> Terms and Conditions</p>
            </a>
          </div>
          <div className="fotter-links-div">
            <h4>CONTACT US</h4>

            <p>
              {" "}
              Address: DAIICT, near TCS,
              <br />
              Gandhinagar, Gujarat.{" "}
            </p>

            <p> Email: info@charutywallet.org</p>

            <p> Contact: +91 99xxxxxx01</p>
          </div>
        </div>
        <hr></hr>
        <div className="footer-below">
          <div className="footer-copyright">
            <p>
              @{new Date().getFullYear()} Copyright Reserved to Charity Wallet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
