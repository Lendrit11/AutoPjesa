import React from "react";

const LoginRegisterPage = () => {
  return (
    <div className="template-color-1">

      {/* Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Other</h2>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li className="active">Login & Register</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Login Register Area */}
      <div className="uren-login-register_area">
        <div className="container-fluid">
          <div className="row">

            {/* Login Form */}
            <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6">
              <form action="#">
                <div className="login-form">
                  <h4 className="login-title">Login</h4>
                  <div className="row">
                    <div className="col-md-12 col-12">
                      <label>Email Address*</label>
                      <input type="email" placeholder="Email Address" />
                    </div>
                    <div className="col-12 mb--20">
                      <label>Password</label>
                      <input type="password" placeholder="Password" />
                    </div>
                    <div className="col-md-8">
                      <div className="check-box">
                        <input type="checkbox" id="remember_me" />
                        <label htmlFor="remember_me">Remember me</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="forgotton-password_info">
                        <a href="#">Forgotten password?</a>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button className="uren-login_btn">Login</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Register Form */}
            <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
              <form action="#">
                <div className="login-form">
                  <h4 className="login-title">Register</h4>
                  <div className="row">
                    <div className="col-md-6 col-12 mb--20">
                      <label>First Name</label>
                      <input type="text" placeholder="First Name" />
                    </div>
                    <div className="col-md-6 col-12 mb--20">
                      <label>Last Name</label>
                      <input type="text" placeholder="Last Name" />
                    </div>
                    <div className="col-md-12">
                      <label>Email Address*</label>
                      <input type="email" placeholder="Email Address" />
                    </div>
                    <div className="col-md-6">
                      <label>Password</label>
                      <input type="password" placeholder="Password" />
                    </div>
                    <div className="col-md-6">
                      <label>Confirm Password</label>
                      <input type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="col-12">
                      <button className="uren-register_btn">Register</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className="uren-footer_area">
        <div className="footer-top_area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="newsletter-area">
                  <h3 className="title">Join Our Newsletter Now</h3>
                  <p className="short-desc">Get E-mail updates about our latest shop and special offers.</p>
                  <div className="newsletter-form_wrap">
                    <form
                      action="http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
                      method="post"
                      id="mc-embedded-subscribe-form"
                      name="mc-embedded-subscribe-form"
                      className="newsletters-form validate"
                      target="_blank"
                      noValidate
                    >
                      <div id="mc_embed_signup_scroll">
                        <div id="mc-form" className="mc-form subscribe-form">
                          <input
                            id="mc-email"
                            className="newsletter-input"
                            type="email"
                            autoComplete="off"
                            placeholder="Enter your email"
                          />
                          <button className="newsletter-btn" id="mc-submit">Subscribe</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-middle_area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4">
                <div className="footer-widgets_info">
                  <div className="footer-widgets_logo">
                    <a href="#">
                      <img src="assets/images/menu/logo/1.png" alt="Uren's Footer Logo" />
                    </a>
                  </div>
                  <div className="widget-short_desc">
                    <p>
                      We are a team of designers and developers that create high quality HTML Template & Woocommerce, Shopify Theme.
                    </p>
                  </div>
                  <div className="widgets-essential_stuff">
                    <ul>
                      <li className="uren-address"><span>Address:</span> The Barn, Ullenhall, Henley in Arden B578 5CC, England</li>
                      <li className="uren-phone"><span>Call Us:</span> <a href="tel://+123123321345">+123 321 345</a></li>
                      <li className="uren-email"><span>Email:</span> <a href="mailto://info@yourdomain.com">info@yourdomain.com</a></li>
                    </ul>
                  </div>
                  <div className="uren-social_link">
                    <ul>
                      <li className="facebook">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" title="Facebook" data-toggle="tooltip">
                          <i className="fab fa-facebook"></i>
                        </a>
                      </li>
                      <li className="twitter">
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter" data-toggle="tooltip">
                          <i className="fab fa-twitter-square"></i>
                        </a>
                      </li>
                      <li className="google-plus">
                        <a href="https://www.plus.google.com/discover" target="_blank" rel="noopener noreferrer" title="Google Plus" data-toggle="tooltip">
                          <i className="fab fa-google-plus"></i>
                        </a>
                      </li>
                      <li className="instagram">
                        <a href="https://rss.com/" target="_blank" rel="noopener noreferrer" title="Instagram" data-toggle="tooltip">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="footer-widgets_area">
                  <div className="row">

                    <div className="col-lg-3 col-md-6">
                      <div className="footer-widgets_title">
                        <h3>Information</h3>
                      </div>
                      <div className="footer-widgets">
                        <ul>
                          <li><a href="javascript:void(0)">About Us</a></li>
                          <li><a href="javascript:void(0)">Delivery Information</a></li>
                          <li><a href="javascript:void(0)">Privacy Policy</a></li>
                          <li><a href="javascript:void(0)">Terms & Conditions</a></li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="footer-widgets_title">
                        <h3>Customer Service</h3>
                      </div>
                      <div className="footer-widgets">
                        <ul>
                          <li><a href="javascript:void(0)">Contact Us</a></li>
                          <li><a href="javascript:void(0)">Returns</a></li>
                          <li><a href="javascript:void(0)">Site Map</a></li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="footer-widgets_title">
                        <h3>Extras</h3>
                      </div>
                      <div className="footer-widgets">
                        <ul>
                          <li><a href="javascript:void(0)">About Us</a></li>
                          <li><a href="javascript:void(0)">Delivery Information</a></li>
                          <li><a href="javascript:void(0)">Privacy Policy</a></li>
                          <li><a href="javascript:void(0)">Terms & Conditions</a></li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="footer-widgets_title">
                        <h3>My Account</h3>
                      </div>
                      <div className="footer-widgets">
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

        <div className="footer-bottom_area">
          <div className="container-fluid">
            <div className="footer-bottom_nav">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="copyright">
                    <span><a href="templateshub.net">Templateshub</a></span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="payment">
                    <a href="#">
                      <img src="assets/images/footer/payment/1.png" alt="Uren's Payment Method" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginRegisterPage;
