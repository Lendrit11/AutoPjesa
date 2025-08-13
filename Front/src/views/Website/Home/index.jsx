import React from "react";
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
// importimet e komponentave
import Slider from './Slider/index';
import Arrivals from "./New-arrivals-products";
import Deal from "./Deal-of-the-day";
import Blog from "./Blog";
const Home =()=>{
    return(
        
        <div class="main-wrapper">
        <div class="popular-search_area">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="popular-search">
                            <label>Popular Search:</label>
                            <a href="javascript:void(0)">Brakes & Rotors,</a>
                            <a href="javascript:void(0)">Lighting,</a>
                            <a href="javascript:void(0)">Perfomance,</a>
                            <a href="javascript:void(0)">Wheels & Tires</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Slider/>

        <div class="uren-shipping_area">
            <div class="container-fluid">
                <div class="shipping-nav">
                    <div class="row no-gutters">
                        <div class="shipping-grid">
                            <div class="shipping-item">
                                <div class="shipping-icon">
                                    <i class="ion-ios-paperplane-outline"></i>
                                </div>
                                <div class="shipping-content">
                                    <h6>Free Shipping</h6>
                                    <p>Free shipping on all US order</p>
                                </div>
                            </div>
                        </div>
                        <div class="shipping-grid">
                            <div class="shipping-item">
                                <div class="shipping-icon">
                                    <i class="ion-ios-help-outline"></i>
                                </div>
                                <div class="shipping-content">
                                    <h6>Support 24/7</h6>
                                    <p>Contact us 24 hours a day</p>
                                </div>
                            </div>
                        </div>
                        <div class="shipping-grid">
                            <div class="shipping-item">
                                <div class="shipping-icon">
                                    <i class="ion-ios-refresh-empty"></i>
                                </div>
                                <div class="shipping-content">
                                    <h6>100% Money Back</h6>
                                    <p>You have 30 days to Return</p>
                                </div>
                            </div>
                        </div>
                        <div class="shipping-grid">
                            <div class="shipping-item">
                                <div class="shipping-icon">
                                    <i class="ion-ios-undo-outline"></i>
                                </div>
                                <div class="shipping-content">
                                    <h6>90 Days Return</h6>
                                    <p>If goods have problems</p>
                                </div>
                            </div>
                        </div>
                        <div class="shipping-grid">
                            <div class="shipping-item">
                                <div class="shipping-icon">
                                    <i class="ion-ios-locked-outline"></i>
                                </div>
                                <div class="shipping-content last-child">
                                    <h6>Payment Secure</h6>
                                    <p>We ensure secure payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
  <Arrivals/>
        <div class="uren-banner_area ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="banner-item img-hover_effect">
                            <div class="banner-img-1"></div>
                            <div class="banner-content">
                                <span class="offer">Get 20% off your order</span>
                                <h4>Car and Truck</h4>
                                <h3>Mercedes Benz</h3>
                                <p>Explore and immerse in exciting 360 content with
                                    Fulldive’s all-in-one virtual reality platform</p>
                                <div class="uren-btn-ps_left">
                                    <a class="uren-btn" href="shop-left-sidebar.html">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="banner-item img-hover_effect">
                            <div class="banner-img-1 banner-img-2"> </div>
                            <div class="banner-content">
                                <span class="offer">Save $120 when you buy</span>
                                <h4>Rotiform SFO </h4>
                                <h3>Custom Forged</h3>
                                <p>Explore and immerse in exciting 360 content with
                                    Fulldive’s all-in-one virtual reality platform</p>
                                <div class="uren-btn-ps_left">
                                    <a class="uren-btn" href="shop-left-sidebar.html">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
        <div class="uren-banner_area uren-banner_area-2">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="banner-item img-hover_effect">
                            <a href="shop-left-sidebar.html">
                                <img class="img-full" src="assets/images/banner/1-3.jpg" alt="Uren's Banner"></img>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="banner-item img-hover_effect">
                            <a href="shop-left-sidebar.html">
                                <img class="img-full" src="assets/images/banner/1-4.jpg" alt="Uren's Banner"></img>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="banner-item img-hover_effect">
                            <a href="shop-left-sidebar.html">
                                <img class="img-full" src="assets/images/banner/1-5.jpg" alt="Uren's Banner"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<Deal/>
        <div class="uren-banner_area uren-banner_area-3">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="banner-item img-hover_effect">
                            <div class="banner-img"></div>
                            <div class="banner-content">
                                <span class="contact-info"><i class="ion-android-call"></i> +123 321 345</span>
                                <h4>Anytime & Anywhere </h4>
                                <h3>You are.</h3>
                                <p>Est erat faucibus purus, eget viverra nulla sem vitae
                                    Quisque id sodales libero...</p>
                                <a href="javascript:void(0)" class="read-more">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="uren-banner_area uren-banner_area-3">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="banner-item img-hover_effect">
                            <a href="shop-left-sidebar.html">
                                <img class="img-full" src="assets/images/banner/2-3.jpg" alt="Uren's Banner"></img>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="banner-item img-hover_effect">
                            <a href="shop-left-sidebar.html">
                                <img class="img-full" src="assets/images/banner/2-4.jpg" alt="Uren's Banner"></img>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="banner-item img-hover_effect">
                            <a href="shop-left-sidebar.html">
                                <img class="img-full" src="assets/images/banner/2-5.jpg" alt="Uren's Banner"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="uren-brand_area">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title_area">
                            <span>Top Quality Partner</span>
                            <h3>Shop By Brands</h3>
                        </div>
                        <div class="brand-slider uren-slick-slider img-hover-effect_area" data-slick-options='{
                        "slidesToShow": 6
                        }' data-slick-responsive='[
                                                {"breakpoint":1200, "settings": {"slidesToShow": 5}},
                                                {"breakpoint":992, "settings": {"slidesToShow": 3}},
                                                {"breakpoint":767, "settings": {"slidesToShow": 3}},
                                                {"breakpoint":577, "settings": {"slidesToShow": 2}},
                                                {"breakpoint":321, "settings": {"slidesToShow": 1}}
                                            ]'>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/1.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/2.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/3.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/4.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/5.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/6.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/1.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/7.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="slide-item">
                                <div class="inner-slide">
                                    <div class="single-product">
                                        <a href="javascript:void(0)">
                                            <img src="assets/images/brand/2.jpg" alt="Uren's Brand Image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Blog/>
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
                                    <span><a href="templateshub.net">Templateshub</a></span>
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

        <div class="modal fade modal-wrapper" id="exampleModalCenter">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="modal-inner-area sp-area row">
                            <div class="col-lg-5">
                                <div class="sp-img_area">
                                    <div class="sp-img_slider slick-img-slider uren-slick-slider" data-slick-options='{
                                    "slidesToShow": 1,
                                    "arrows": false,
                                    "fade": true,
                                    "draggable": false,
                                    "swipe": false,
                                    "asNavFor": ".sp-img_slider-nav"
                                    }'>
                                        <div class="single-slide red">
                                            <img src="assets/images/product/large-size/1.jpg" alt="Uren's Product Image"></img>
                                        </div>
                                        <div class="single-slide orange">
                                            <img src="assets/images/product/large-size/2.jpg" alt="Uren's Product Image"></img>
                                        </div>
                                        <div class="single-slide brown">
                                            <img src="assets/images/product/large-size/3.jpg" alt="Uren's Product Image"></img>
                                        </div>
                                        <div class="single-slide umber">
                                            <img src="assets/images/product/large-size/4.jpg" alt="Uren's Product Image"></img>
                                        </div>
                                        <div class="single-slide black">
                                            <img src="assets/images/product/large-size/5.jpg" alt="Uren's Product Image"></img>
                                        </div>
                                        <div class="single-slide golden">
                                            <img src="assets/images/product/large-size/6.jpg" alt="Uren's Product Image"></img>
                                        </div>
                                    </div>
                                    <div class="sp-img_slider-nav slick-slider-nav uren-slick-slider slider-navigation_style-3" data-slick-options='{
                                   "slidesToShow": 4,
                                    "asNavFor": ".sp-img_slider",
                                   "focusOnSelect": true,
                                   "arrows" : true,
                                   "spaceBetween": 30
                                  }' data-slick-responsive='[
                                    {"breakpoint":1501, "settings": {"slidesToShow": 3}},
                                    {"breakpoint":992, "settings": {"slidesToShow": 4}},
                                    {"breakpoint":768, "settings": {"slidesToShow": 3}},
                                    {"breakpoint":575, "settings": {"slidesToShow": 2}}
                                ]'>
                                        <div class="single-slide red">
                                            <img src="assets/images/product/small-size/1.jpg" alt="Uren's Product Thumnail"></img>
                                        </div>
                                        <div class="single-slide orange">
                                            <img src="assets/images/product/small-size/2.jpg" alt="Uren's Product Thumnail"></img>
                                        </div>
                                        <div class="single-slide brown">
                                            <img src="assets/images/product/small-size/3.jpg" alt="Uren's Product Thumnail"></img>
                                        </div>
                                        <div class="single-slide umber">
                                            <img src="assets/images/product/small-size/4.jpg" alt="Uren's Product Thumnail"></img>
                                        </div>
                                        <div class="single-slide black">
                                            <img src="assets/images/product/small-size/5.jpg" alt="Uren's Product Thumnail"></img>
                                        </div>
                                        <div class="single-slide golden">
                                            <img src="assets/images/product/small-size/6.jpg" alt="Uren's Product Thumnail"></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-7 col-lg-6">
                                <div class="sp-content">
                                    <div class="sp-heading">
                                        <h5><a href="#">Dolorem odio provident ut nihil</a></h5>
                                    </div>
                                    <div class="rating-box">
                                        <ul>
                                            <li><i class="ion-android-star"></i></li>
                                            <li><i class="ion-android-star"></i></li>
                                            <li><i class="ion-android-star"></i></li>
                                            <li class="silver-color"><i class="ion-android-star"></i></li>
                                            <li class="silver-color"><i class="ion-android-star"></i></li>
                                        </ul>
                                    </div>
                                    <div class="price-box">
                                        <span class="new-price new-price-2">$194.00</span>
                                        <span class="old-price">$241.00</span>
                                    </div>
                                    <div class="sp-essential_stuff">
                                        <ul>
                                            <li>Brands <a href="javascript:void(0)">Buxton</a></li>
                                            <li>Product Code: <a href="javascript:void(0)">Product 16</a></li>
                                            <li>Reward Points: <a href="javascript:void(0)">100</a></li>
                                            <li>Availability: <a href="javascript:void(0)">In Stock</a></li>
                                            <li>EX Tax: <a href="javascript:void(0)"><span>$453.35</span></a></li>
                                            <li>Price in reward points: <a href="javascript:void(0)">400</a></li>
                                        </ul>
                                    </div>
                                    <div class="color-list_area">
                                        <div class="color-list_heading">
                                            <h4>Available Options</h4>
                                        </div>
                                        <span class="sub-title">Color</span>
                                        <div class="color-list">
                                            <a href="javascript:void(0)" class="single-color active" data-swatch-color="red">
                                                <span class="bg-red_color"></span>
                                                <span class="color-text">Red (+$150)</span>
                                            </a>
                                            <a href="javascript:void(0)" class="single-color" data-swatch-color="orange">
                                                <span class="burnt-orange_color"></span>
                                                <span class="color-text">Orange (+$170)</span>
                                            </a>
                                            <a href="javascript:void(0)" class="single-color" data-swatch-color="brown">
                                                <span class="brown_color"></span>
                                                <span class="color-text">Brown (+$120)</span>
                                            </a>
                                            <a href="javascript:void(0)" class="single-color" data-swatch-color="umber">
                                                <span class="raw-umber_color"></span>
                                                <span class="color-text">Umber (+$125)</span>
                                            </a>
                                            <a href="javascript:void(0)" class="single-color" data-swatch-color="black">
                                                <span class="black_color"></span>
                                                <span class="color-text">Black (+$125)</span>
                                            </a>
                                            <a href="javascript:void(0)" class="single-color" data-swatch-color="golden">
                                                <span class="golden_color"></span>
                                                <span class="color-text">Golden (+$125)</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="quantity">
                                        <label>Quantity</label>
                                        <div class="cart-plus-minus">
                                            <input class="cart-plus-minus-box" value="1" type="text"></input>
                                            <div class="dec qtybutton"><i class="fa fa-angle-down"></i></div>
                                            <div class="inc qtybutton"><i class="fa fa-angle-up"></i></div>
                                        </div>
                                    </div>
                                    <div class="uren-group_btn">
                                        <ul>
                                            <li><a href="cart.html" class="add-to_cart">Cart To Cart</a></li>
                                            <li><a href="cart.html"><i class="ion-android-favorite-outline"></i></a></li>
                                            <li><a href="cart.html"><i class="ion-ios-shuffle-strong"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="uren-tag-line">
                                        <h6>Tags:</h6>
                                        <a href="javascript:void(0)">Ring</a>,
                                        <a href="javascript:void(0)">Necklaces</a>,
                                        <a href="javascript:void(0)">Braid</a>
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
                                            <li class="youtube">
                                                <a href="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube">
                                                    <i class="fab fa-youtube"></i>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    );
};
export default Home;