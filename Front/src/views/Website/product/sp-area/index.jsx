import React, { useEffect, useRef } from 'react';  // Import React dhe hooks për efekt dhe referenca
import $ from 'jquery';  // Import jQuery
import 'slick-carousel/slick/slick.css';  // Stilet bazë të Slick Carousel
import 'slick-carousel/slick/slick-theme.css';  // Tema për Slick Carousel
import 'slick-carousel';  // Script i Slick Carousel

// Import të ndryshme CSS vendor dhe plugins për stilizim
import '../../../../assets/css/vendor/bootstrap.min.css';
import '../../../../assets/css/vendor/font-awesome.css';
import '../../../../assets/css/vendor/fontawesome-stars.css';
import '../../../../assets/css/vendor/ion-fonts.css';
import '../../../../assets/css/plugins/slick.css';
import '../../../../assets/css/plugins/animate.css';
import '../../../../assets/css/plugins/jquery-ui.min.css';
import '../../../../assets/css/plugins/lightgallery.min.css';
import '../../../../assets/css/plugins/nice-select.css';
import '../../../../assets/css/style.css';

// Komponenti funksional për seksionin e produktit të vetëm
const Single_Product_area = () => {
  // Referenca për slider-in kryesor dhe slider-in e navigimit
  const sliderMainRef = useRef(null);
  const sliderNavRef = useRef(null);
  useEffect(() => {
    if (sliderMainRef.current && sliderNavRef.current) {
      try {
        if (!$(sliderMainRef.current).hasClass('slick-initialized')) {
          $(sliderMainRef.current).slick({
            slidesToShow: 1,
            arrows: false,
            fade: true,
            draggable: false,
            swipe: false,
            asNavFor: sliderNavRef.current,
          });
        }
        if (!$(sliderNavRef.current).hasClass('slick-initialized')) {
          $(sliderNavRef.current).slick({
            slidesToShow: 3,
            asNavFor: sliderMainRef.current,
            focusOnSelect: true,
            arrows: true,
            prevArrow: $('.custom-prev'),
            nextArrow: $('.custom-next'),
            responsive: [
              { breakpoint: 1501, settings: { slidesToShow: 3 } },
              { breakpoint: 992, settings: { slidesToShow: 4 } },
              { breakpoint: 768, settings: { slidesToShow: 3 } },
              { breakpoint: 575, settings: { slidesToShow: 2 } },
            ],
          });
        }
      } catch (err) {
        console.error("Error initializing slick:", err);
      }
    }
    return () => {
      if (sliderMainRef.current && $(sliderMainRef.current).hasClass('slick-initialized')) {
        $(sliderMainRef.current).slick('unslick');
      }
      if (sliderNavRef.current && $(sliderNavRef.current).hasClass('slick-initialized')) {
        $(sliderNavRef.current).slick('unslick');
      }
    };
  }, []);
  
    // Array bosh: hook ekzekutohet vetëm një herë kur komponenti mount-ohet

  return (
    <div className="sp-area">
      <div className="container-fluid">
        <div className="sp-nav">
          <div className="row">
            {/* Kolona e majtë me slider-in e imazheve */}
            <div className="col-lg-4">
              <div className="sp-img_area">
                
                <div className="sp-img_slider uren-slick-slider" ref={sliderMainRef}>
                  {[1, 2, 3, 4, 5, 6].map((num, index) => (
                    <div key={index} className="single-slide zoom">
                      <img src={`assets/images/product/large-size/${num}.jpg`} alt="Uren's Product" />
                    </div>
                  ))}
                </div>

                <div className="sp-img_slider-nav_wrapper">
  {/* Custom Arrows */}
  <button type="button" className="custom-prev">
    <i className="fa fa-chevron-left"></i>
  </button>
  <button type="button" className="custom-next">
    <i className="fa fa-chevron-right"></i>
  </button>

  {/* Slider Nav */}
  <div className="sp-img_slider-nav uren-slick-slider slider-navigation_style-3" ref={sliderNavRef}>
    {[1, 2, 3, 4, 5, 6].map((num, index) => (
      <div key={index} className="single-slide">
        <img src={`assets/images/product/small-size/${num}.jpg`} alt="Uren's Thumbnail" />
      </div>
    ))}
  </div>
</div>
              </div>
            </div>

            {/* Kolona e djathtë me përmbajtje të produktit */}
            <div className="col-lg-8">
              <div className="sp-content">
                <div className="sp-heading">
                  <h5><a href="#">Dolorem odio provident ut nihil</a></h5>
                </div>
                <span className="reference">Reference: demo_1</span>
                <div className="rating-box">
                  <ul>
                    {[...Array(3)].map((_, i) => (
                      <li key={i}><i className="ion-android-star"></i></li>
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <li key={i} className="silver-color"><i className="ion-android-star"></i></li>
                    ))}
                  </ul>
                </div>
                <div className="sp-essential_stuff">
                  <ul>
                    <li>Brands <a href="#">Buxton</a></li>
                    <li>Product Code: <a href="#">Product 16</a></li>
                    <li>Reward Points: <a href="#">100</a></li>
                    <li>Availability: <a href="#">In Stock</a></li>
                    <li>EX Tax: <a href="#"><span>$453.35</span></a></li>
                    <li>Price in reward points: <a href="#">400</a></li>
                  </ul>
                </div>
                <div className="product-size_box">
                  <span>Size</span>
                  {/* Dropdown për madhësitë */}
                  <select className="myniceselect nice-select">
                    <option value="1">S</option>
                    <option value="2">M</option>
                    <option value="3">L</option>
                    <option value="4">XL</option>
                  </select>
                </div>
                <div className="quantity">
                  <label>Quantity</label>
                  <div className="cart-plus-minus">
                    {/* Input për sasinë */}
                    <input className="cart-plus-minus-box" defaultValue="1" type="text" />
                    <div className="dec qtybutton"><i className="fa fa-angle-down"></i></div>
                    <div className="inc qtybutton"><i className="fa fa-angle-up"></i></div>
                  </div>
                </div>
                <div className="qty-btn_area">
                  <ul>
                    <li><a className="qty-cart_btn" href="cart.html">Add To Cart</a></li>
                    <li><a className="qty-wishlist_btn" href="wishlist.html" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></a></li>
                    <li><a className="qty-compare_btn" href="compare.html" title="Compare This Product"><i className="ion-ios-shuffle-strong"></i></a></li>
                  </ul>
                </div>
                <div className="uren-tag-line">
                  <h6>Tags:</h6>
                  <a href="#">vehicle</a>, <a href="#">car</a>, <a href="#">bike</a>
                </div>
                <div className="uren-social_link">
                  <ul>
                    {/* Ikonat e rrjeteve sociale me link dhe target _blank */}
                    <li className="facebook"><a href="https://www.facebook.com/" target="_blank" title="Facebook"><i className="fab fa-facebook"></i></a></li>
                    <li className="twitter"><a href="https://twitter.com/" target="_blank" title="Twitter"><i className="fab fa-twitter-square"></i></a></li>
                    <li className="youtube"><a href="https://www.youtube.com/" target="_blank" title="Youtube"><i className="fab fa-youtube"></i></a></li>
                    <li className="google-plus"><a href="https://www.plus.google.com/discover" target="_blank" title="Google Plus"><i className="fab fa-google-plus"></i></a></li>
                    <li className="instagram"><a href="https://rss.com/" target="_blank" title="Instagram"><i className="fab fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Eksporton komponentin për t'u përdorur në pjesë të tjera të aplikacionit
export default Single_Product_area;
