import React, { useState } from "react";
import { Link } from "react-router-dom";  // << kjo mungonte
import "../../../../assets/css/mobile.css";

const Mobile = ({ onClose, className }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  return (
    <div className={`mobile-menu_wrapper ${className}`}>
      <div className="offcanvas-menu-inner">
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          aria-label="Close menu"
        >
          <i className="ion-android-close"></i>
        </button>
                <div className="offcanvas-inner_search">
          <form className="inner-searchbox" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Search for item..." />
            <button className="search_btn" type="submit">
              <i className="ion-ios-search-strong"></i>
            </button>
          </form>
        </div>
        <nav className="offcanvas-navigation">
          <ul className="mobile-menu">
             <li><Link to="/home">Home</Link></li>
             <li><Link to="/shop">Shop</Link></li>
             <li><Link to="/contact">Contact</Link></li>
             <li><Link to="/about">About</Link></li>
              <li className={`menu-item-has-children ${openSubmenu === "home" ? "active" : ""}`}>
              <a href="#!" onClick={(e) => { e.preventDefault(); toggleSubmenu("home"); }}>
                <span className="mm-text">Settings</span>
                <br />
              </a>
              <ul className={`sub-menu ${openSubmenu === "home" ? "open" : ""}`}>
             <li><Link to="/Profile">Account</Link></li>
             <li><Link to="/login">Login</Link></li>
              </ul>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Mobile;
