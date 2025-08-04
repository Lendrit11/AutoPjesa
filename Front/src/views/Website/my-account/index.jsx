import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import '../../../assets/css/style.css'; // ruaj importet e tua siç janë

const Account = () => {
  const [key, setKey] = useState('dashboard');

  return (
    <div className="main-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Other</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li className="active">My Account</li>
            </ul>
          </div>
        </div>
      </div>

      <main className="page-content flex-grow-1">
        <div className="account-page-area container-fluid h-100 d-flex">
          <div className="row flex-grow-1 w-100">
            <div className="col-lg-3 border-end pt-3">
              {/* Sidebar navigation */}
              <div className="nav flex-column nav-pills">
                <button className={`nav-link ${key === 'dashboard' ? 'active' : ''}`} onClick={() => setKey('dashboard')}>Dashboard</button>
                <button className={`nav-link ${key === 'orders' ? 'active' : ''}`} onClick={() => setKey('orders')}>Orders</button>
                <button className={`nav-link ${key === 'address' ? 'active' : ''}`} onClick={() => setKey('address')}>Addresses</button>
                <button className={`nav-link ${key === 'details' ? 'active' : ''}`} onClick={() => setKey('details')}>Account Details</button>
                <button className={`nav-link ${key === 'logout' ? 'active' : ''}`} onClick={() => setKey('logout')}>Logout</button>
              </div>
            </div>

            <div className="col-lg-9 py-4">
              <Tabs id="account-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="d-none">
                <Tab eventKey="dashboard" title="Dashboard">
                  <p>Hello <b>Edwin Adams</b> (not Edwin Adams? <a href="/login-register">Sign out</a>)</p>
                  <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses and <a href="#">edit your password and account details</a>.</p>
                </Tab>

                <Tab eventKey="orders" title="Orders">
                  <h4 className="small-title">MY ORDERS</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr><th>ORDER</th><th>DATE</th><th>STATUS</th><th>TOTAL</th><th></th></tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#5364</td><td>Mar 27, 2019</td><td>On Hold</td><td>£162.00 for 2 items</td>
                          <td><button className="uren-btn uren-btn_dark uren-btn_sm">View</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Tab>

                <Tab eventKey="address" title="Addresses">
                  <p>The following addresses will be used on the checkout page by default.</p>
                  <div className="row">
                    <div className="col">
                      <h4>BILLING ADDRESS</h4>
                      <address>1234 Heaven Stress, Beverly Hill OldYork UnitedState of Lorem</address>
                    </div>
                    <div className="col">
                      <h4>SHIPPING ADDRESS</h4>
                      <address>1234 Heaven Stress, Beverly Hill OldYork UnitedState of Lorem</address>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="details" title="Account Details">
                  <form className="uren-form">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>First Name*</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Last Name*</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Email*</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Current Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="uren-btn uren-btn_dark">Save Changes</button>
                      </div>
                    </div>
                  </form>
                </Tab>

                <Tab eventKey="logout" title="Logout">
                  <p>You will be logged out. <a href="/login-register">Click here</a></p>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Footer = () => (
      <div class="uren-footer_area">
          <div class="footer-top_area">
              <div class="container-fluid">
                  <div class="row">
                      <div class="col-lg-12">
                          <div class="newsletter-area">
                              <h3 class="title">Join Our Newsletter Now</h3>
                              <p class="short-desc">Get E-mail updates about our latest shop and special offers.</p>
                              <div class="newsletter-form_wrap">
                                  <form action="http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="newsletters-form validate" target="_blank" noValidate>
                                      <div id="mc_embed_signup_scroll">
                                          <div id="mc-form" class="mc-form subscribe-form">
                                              <input id="mc-email" class="newsletter-input" type="email" autocomplete="off" placeholder="Enter your email" />
                                              <button class="newsletter-btn" id="mc-submit">Subscribe</button>
                                          </div>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="footer-middle_area">
              <div class="container-fluid">
                  <div class="row">
                      <div class="col-lg-4">
                          <div class="footer-widgets_info">
                              <div class="footer-widgets_logo">
                                  <a href="#">
                                      <img src="assets/images/menu/logo/1.png" alt="Uren's Footer Logo"></img>
                                  </a>
                              </div>
                              <div class="widget-short_desc">
                                  <p>We are a team of designers and developers that create high quality HTML Template &
                                      Woocommerce, Shopify Theme.
                                  </p>
                              </div>
                              <div class="widgets-essential_stuff">
                                  <ul>
                                      <li class="uren-address"><span>Address:</span> The Barn,
                                          Ullenhall, Henley
                                          in
                                          Arden B578 5CC, England</li>
                                      <li class="uren-phone"><span>Call
                                      Us:</span> <a href="tel://+123123321345">+123 321 345</a>
                                      </li>
                                      <li class="uren-email"><span>Email:</span> <a href="mailto://info@yourdomain.com">info@yourdomain.com</a></li>
                                  </ul>
                              </div>
                              <div class="uren-social_link">
                                  <ul>
                                      <li class="facebook">
                                          <a href="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title="Facebook">
                                              <i class="fab fa-facebook"></i>
                                          </a>
                                      </li>
                                      <li class="twitter">
                                          <a href="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                                              <i class="fab fa-twitter-square"></i>
                                          </a>
                                      </li>
                                      <li class="google-plus">
                                          <a href="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google Plus">
                                              <i class="fab fa-google-plus"></i>
                                          </a>
                                      </li>
                                      <li class="instagram">
                                          <a href="https://rss.com/" data-toggle="tooltip" target="_blank" title="Instagram">
                                              <i class="fab fa-instagram"></i>
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-8">
                          <div class="footer-widgets_area">
                              <div class="row">
                                  <div class="col-lg-3 col-md-6">
                                      <div class="footer-widgets_title">
                                          <h3>Information</h3>
                                      </div>
                                      <div class="footer-widgets">
                                          <ul>
                                              <li><a href="javascript:void(0)">About Us</a></li>
                                              <li><a href="javascript:void(0)">Delivery Information</a></li>
                                              <li><a href="javascript:void(0)">Privacy Policy</a></li>
                                              <li><a href="javascript:void(0)">Terms & Conditions</a></li>
                                          </ul>
                                      </div>
                                  </div>
                                  <div class="col-lg-3 col-md-6">
                                      <div class="footer-widgets_title">
                                          <h3>Customer Service</h3>
                                      </div>
                                      <div class="footer-widgets">
                                          <ul>
                                              <li><a href="javascript:void(0)">Contact Us</a></li>
                                              <li><a href="javascript:void(0)">Returns</a></li>
                                              <li><a href="javascript:void(0)">Site Map</a></li>
                                          </ul>
                                      </div>
                                  </div>
                                  <div class="col-lg-3 col-md-6">
                                      <div class="footer-widgets_title">
                                          <h3>Extras</h3>
                                      </div>
                                      <div class="footer-widgets">
                                          <ul>
                                              <li><a href="javascript:void(0)">About Us</a></li>
                                              <li><a href="javascript:void(0)">Delivery Information</a></li>
                                              <li><a href="javascript:void(0)">Privacy Policy</a></li>
                                              <li><a href="javascript:void(0)">Terms & Conditions</a></li>
                                          </ul>
                                      </div>
                                  </div>
                                  <div class="col-lg-3 col-md-6">
                                      <div class="footer-widgets_title">
                                          <h3>My Account</h3>
                                      </div>
                                      <div class="footer-widgets">
                                          <ul>
                                              <li><a href="javascript:void(0)">My Account</a></li>
                                              <li><a href="javascript:void(0)">Order History</a></li>
                                              <li><a href="javascript:void(0)">Wish List</a></li>
                                              <li><a href="javascript:void(0)">Newsletter</a></li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="footer-bottom_area">
              <div class="container-fluid">
                  <div class="footer-bottom_nav">
                      <div class="row">
                          <div class="col-lg-6 col-md-6">
                              <div class="copyright">
                                  <span><a href="templateshub.net">Templateshub.</a></span>
                              </div>
                          </div>
                          <div class="col-lg-6 col-md-6">
                              <div class="payment">
                                  <a href="#">
                                      <img src="assets/images/footer/payment/1.png" alt="Uren's Payment Method"></img>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

);

export default Account;
