import React from "react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-main">
        <div className="footer-col footer-logo-col">
          <span className="footer-logo">MindMend</span>
        </div>
        <div className="footer-col">
          <div className="footer-heading">About</div>
          <a href="#">Our Mission</a>
        </div>
        <div className="footer-col">
          <div className="footer-heading">Resources</div>
          <a href="#">Blog</a>
          <a href="#">Guides</a>
        </div>
        <div className="footer-col">
          <div className="footer-heading">Support</div>
          <a href="#">FAQs</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="footer-col">
          <div className="footer-heading">Follow Us</div>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <span>© {currentYear} MindMend. All rights reserved.</span>
        <span className="footer-bottom-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Follow us Facebook</a>
          <span className="footer-sep">|</span>
          <a href="#">Follow us</a>
          <span className="footer-sep">|</span>
          <a href="#">Privacy Us</a>
        </span>
      </div>
    </footer>
  );
}