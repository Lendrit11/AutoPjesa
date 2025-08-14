import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
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
  const [deals, setDeals] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5298/api/user/home/latest-discounts')
    .then(response => {
      if (response.status === 200) {
        setDeals(response.data);
      } else {
        setDeals([]); // Nëse statusi s'është 200, s’ka zbritje
      }
    })
    .catch(error => {
      if (error.response && (error.response.status === 404 || error.response.status === 204)) {
        setDeals([]); // S’ka zbritje, por nuk është error fatal
      } else {
        console.error('Gabim gjatë marrjes së zbritjeve:', error);
      }
    });
}, []);


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
      <div className="section-title_area">
        <span>Special Offer Limited Time</span>
        <h3>Deal Of The Day</h3>
      </div>

      {deals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'gray' }}>
          <p>Aktualisht nuk ka produkte me zbritje.</p>
        </div>
      ) : (
        <Slider {...settings} className="special-product_slider img-hover-effect_area">
          {deals.map((item, i) => (
            <div className="slide-item" key={i}>
              <div className="inner-slide">
                <div className="single-product">
                  <div className="product-img">
                    <a href="#">
                      <img className="primary-img" src={item.imageUrl} alt="Product" />
                    </a>
                    <div className="sticker-area-2">
                      <span className="sticker-2">-{item.discount}%</span>
                      <span className="sticker">New</span>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="product-desc_info">
                      <div className="uren-countdown_area">
                        <span className="product-offer">Hurry up! Offer ends on:</span>
                        <div className="countdown-wrap">
                          <span>{new Date(item.expireDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <h6 className="product-name">{item.name}</h6>
                      <div className="price-box">
                        <span className="new-price new-price-2">${item.price.toFixed(2)}</span>
                        <span className="old-price">${item.oldPrice.toFixed(2)}</span>
                      </div>
                      <div className="add-actions">
                        <ul>
                          <li><a className="uren-add_cart" href="#"><i className="ion-bag"></i>Add To Cart</a></li>
                          <li><a className="uren-wishlist" href="#"><i className="ion-android-favorite-outline"></i></a></li>
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
      )}
    </div>
  </div>
);

};

export default Deal;