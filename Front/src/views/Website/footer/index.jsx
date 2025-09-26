import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="ffa-footer">
      <div className="ffa-newsletter">
        <h3>Join FixFlowAuto Newsletter</h3>
        <p>Get the latest updates, offers and news directly to your inbox.</p>
        <form className="ffa-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="ffa-links">
        <div className="ffa-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About FixFlowAuto</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div className="ffa-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div className="ffa-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="ffa-column">
          <h4>Contact</h4>
          <ul>
            <li>📍 Prishtinë, Kosovë</li>
            <li>📞 +383 44 123 456</li>
            <li>✉️ info@fixflowauto.com</li>
          </ul>
        </div>
      </div>

      <div className="ffa-bottom">
        <p>&copy; {new Date().getFullYear()} FixFlowAuto. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
