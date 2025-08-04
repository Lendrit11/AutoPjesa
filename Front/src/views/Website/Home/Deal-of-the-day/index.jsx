import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-sh custom-para" onClick={onClick}>
      <i className="ion-ios-arrow-forward"></i>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-sh custom-mrapa" onClick={onClick}>
      <i className="ion-ios-arrow-back"></i>
    </div>
  );
};

const Deal = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="special-product_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title_area">
              <span>Special Offer Limited Time</span>
              <h3>Deal Of The Day</h3>
            </div>

            <Slider {...settings} className="special-product_slider img-hover-effect_area">
              {[1, 2, 3].map((item, i) => (
                <div className="slide-item" key={i}>
                  <div className="inner-slide">
                    <div className="single-product">
                      <div className="product-img">
                        <a href="single-product.html">
                          <img className="primary-img" src={`assets/images/product/medium-size/${item}-1.jpg`} alt="Product" />
                          <img className="secondary-img" src={`assets/images/product/medium-size/${item}-2.jpg`} alt="Product Hover" />
                        </a>
                        <div className="sticker-area-2">
                          <span className="sticker-2">-15%</span>
                          <span className="sticker">New</span>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-desc_info">
                          <div className="uren-countdown_area">
                            <span className="product-offer">Hurry up! Offer ends in:</span>
                            <div className="countdown-wrap">
                              {/* Timer values (static or you can use countdown logic) */}
                              <div className="countdown__item"><span className="countdown__time">02</span><span className="countdown__text">Days</span></div>
                              <div className="countdown__item"><span className="countdown__time">10</span><span className="countdown__text">Hours</span></div>
                              <div className="countdown__item"><span className="countdown__time">45</span><span className="countdown__text">Mins</span></div>
                              <div className="countdown__item"><span className="countdown__time">36</span><span className="countdown__text">Secs</span></div>
                            </div>
                          </div>
                          <div className="rating-box">
                            <ul>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li className="silver-color"><i className="ion-android-star"></i></li>
                            </ul>
                          </div>
                          <h6 className="product-name"><a href="single-product.html">Product Title {item}</a></h6>
                          <div className="price-box">
                            <span className="new-price new-price-2">$95.00</span>
                            <span className="old-price">$120.00</span>
                          </div>
                          <div className="add-actions">
                            <ul>
                              <li><a className="uren-add_cart" href="cart.html"><i className="ion-bag"></i>Add To Cart</a></li>
                              <li><a className="uren-wishlist" href="wishlist.html"><i className="ion-android-favorite-outline"></i></a></li>
                              <li className="quick-view-btn"><a href="#"><i className="ion-android-open"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
