import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
      };
      
  return (
    <div className="uren-slider_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <Slider {...settings} className="main-slider slider-navigation_style-2">
              <div className="single-slide animation-style-01 bg-1">
                <div className="slider-content">
                  <span>New thinking new possibilities</span>
                  <h3>Car interior</h3>
                  <h4>Starting at <span>$99.00</span></h4>
                  <div className="uren-btn-ps_left slide-btn">
                    <a className="uren-btn" href="shop-left-sidebar.html">Read More</a>
                  </div>
                </div>
              </div>

              <div className="single-slide animation-style-02 bg-2">
                <div className="slider-content slider-content-2">
                  <span className="primary-text_color">Car, Truck, CUV & SUV Tires</span>
                  <h3>Wheels & Tires</h3>
                  <h4>Sale up to 20% off</h4>
                  <div className="uren-btn-ps_left slide-btn">
                    <a className="uren-btn" href="shop-left-sidebar.html">Read More</a>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;

const NextArrow = ({ onClick }) => (
    <div
      className="custom-sh custom-para"
      onClick={onClick}
    >
      <i className="ion-chevron-right"></i>
    </div>
  );
  
  const PrevArrow = ({ onClick }) => (
    <div
      className="custom-sh custom-mrapa"
      onClick={onClick}
    >
      <i className="ion-chevron-left"></i>
    </div>
  );
  