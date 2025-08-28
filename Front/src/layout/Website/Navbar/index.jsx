import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";  // Import Link
import '../../../assets/css/vendor/bootstrap.min.css';
import '../../../assets/css/vendor/font-awesome.css';
import '../../../assets/css/vendor/fontawesome-stars.css';
import '../../../assets/css/vendor/ion-fonts.css';
import '../../../assets/css/plugins/slick.css';
import '../../../assets/css/plugins/animate.css';
import '../../../assets/css/plugins/jquery-ui.min.css';
import '../../../assets/css/plugins/lightgallery.min.css';
import '../../../assets/css/plugins/nice-select.css';
import '../../../assets/css/style.css';
import logo from '../../../assets/images/car.png';
import Category from'./category-menu/index';
import Search from './search/index';
import Cart from './minicart/index';
import MobileMenu from "./mobile-nav";
const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
const [cartTotal, setCartTotal] = useState(0);
const [cartCount, setCartCount] = useState(0);
const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:5298/api/user/login/logout', {
      method: 'POST',
      credentials: 'include', // Kjo është shumë e rëndësishme që të dërgohet cookie `jwt`
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Nëse logout është i suksesshëm
      // Mund të redirektohesh ose të rifreskosh faqen
      window.location.href = "/login"; // ose përdor navigate nëse përdor react-router v6
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

useEffect(() => {
  const handleCartUpdate = (e) => {
    setCartTotal(e.detail.total);
    setCartCount(e.detail.count);
  };

  window.addEventListener("cart-updated", handleCartUpdate);

  return () => {
    window.removeEventListener("cart-updated", handleCartUpdate);
  };
}, []);

  return (
    <header className="header-main_area bg--sapphire">
      <div className="header-top_area d-lg-block d-none">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-7 col-lg-8">
              <div className="main-menu_area position-relative">
                <nav className="main-nav">
                  <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li className="megamenu-holder"><Link to="/Shop">Shop</Link></li>
                    <li><Link to="/About">About Us</Link></li>
                    <li><Link to="/Contact">Contact</Link></li>
                    <li><Link to="/Blog">Blog</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-5 col-lg-4">
              <div className="ht-right_area">
                <div className="ht-menu">
                  <ul>
                    <li>
                      <Link >Settings <i className="fa fa-chevron-down"></i></Link>
                      <ul className="ht-dropdown ht-my_account">
                        <li className="unactive"><Link to="/login">Login</Link></li>
                        <li className="unactive"><Link to="/Profile">Account</Link></li>
                        <li className="unactive"><Link to="/Wishlist">Wishlist</Link></li>
                   <li className="unactive">
  <Link to="#" onClick={handleLogout}>Log out</Link>
</li>

                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-middle_area">
        <div className="container-fluid">
          <div className="row">
            <div className="custom-logo_col col-12">
<div className="header-logo_area" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <Link to="/Home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
    <img 
      src={logo} 
      alt="Car" 
      style={{ 
        filter: 'invert(68%) sepia(89%) saturate(500%) hue-rotate(10deg) brightness(95%) contrast(90%)', 
        width: '40px', 
        height: '40px',
        objectFit: 'contain'
      }} 
    />
    <h3 style={{ color: '#FFD700', margin: 0, fontWeight: 'bold' }}>FixFlow-Auto</h3>
  </Link>
</div>

            </div>
            <Search />
            <Category/>
          
            <div className="custom-cart_col col-12">
              <div className="header-right_area">
                <ul>
                  <li className="mobile-menu_wrap d-flex d-lg-none">
                    <a
                      href="#mobileMenu"
                      className="mobile-menu_btn toolbar-btn color--white"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowMobile(true);
                      }}
                    >
                      <i className="ion-navicon"></i>
                    </a>
                  </li>
                  <li className="minicart-wrap">
                    <a
                      href="#miniCart"
                      className="minicart-btn toolbar-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCart(true);
                      }}
                    >
<div className="minicart-count_area">
  <span className="item-count">{cartCount}</span>
  <i className="ion-bag"></i>
</div>
<div className="minicart-front_text">
  <span>Cart:</span>
  <span className="total-price">{cartTotal.toFixed(2)}</span>
</div>

                    </a>
                  </li>
                  <li className="contact-us_wrap">
                    <a href="">
                      <i className="ion-android-call"></i>+123 321 345
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Cart className={showCart ? 'show-cart' : ''} onClose={() => setShowCart(false)} />
<MobileMenu className={showMobile ? "open" : ""} onClose={() => setShowMobile(false)} />
    </header>
  );
};

export default Navbar;
