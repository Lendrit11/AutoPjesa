import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <div className="custom-sh custom-para" onClick={onClick}>
    <i className="fa fa-chevron-right"></i>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-sh custom-mrapa" onClick={onClick}>
    <i className="fa fa-chevron-left"></i>
  </div>
);

const Feauterd = () => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    speed: 600,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1599, settings: { slidesToShow: 3 } },
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const products = [
    {
      image: "assets/images/featured-categories/1.png",
      title: "Brakes & Rotors",
      count: "8 Products",
      items: ["Accessories", "Auto GPS Units", "Fitness GPS Units", "Handheld GPS Units"],
    },
    {
      image: "assets/images/featured-categories/2.png",
      title: "Interior",
      count: "0 Products",
      items: ["Dash Kits", "Floor Mats", "Seat Covers", "Steering Wheels"],
    },
    {
      image: "assets/images/featured-categories/3.png",
      title: "Lighting",
      count: "8 Products",
      items: ["Smart Appliances", "Smart Appliances", "Smart Energy", "Smart Health"],
    },
    {
      image: "assets/images/featured-categories/4.png",
      title: "Performance",
      count: "13 Products",
      items: ["Home Theater", "Speakers Systems", "Sports", "Stereo Receivers"],
    },
    {
      image: "assets/images/featured-categories/5.png",
      title: "Suspension Systems",
      count: "15 Products",
      items: ["Clothing", "Jewelry", "Sunglasses"],
    },
    {
      image: "assets/images/featured-categories/6.png",
      title: "Wheels & Tires",
      count: "13 Products",
      items: ["Cellphone Accessories", "Mobile Hotspots & Plans", "Phones With Plans", "Prepaid Plans"],
    },
  ];

  return (
    <div className="featured-categories_area">
      <div className="container-fluid">
        <div className="section-title_area">
          <span>Top Featured Collections</span>
          <h3>Featured Categories</h3>
        </div>
        <div className="featured-categories_slider">
          <Slider {...settings}>
            {products.map((product, index) => (
              <div className="slide-item" key={index}>
                <div className="slide-inner">
                  <div className="slide-image_area">
                    <a href="shop-left-sidebar.html">
                      <img src={product.image} alt={product.title} />
                    </a>
                  </div>
                  <div className="slide-content_area">
                    <h3><a href="shop-left-sidebar.html">{product.title}</a></h3>
                    <span>({product.count})</span>
                    <ul className="product-item">
                      {product.items.map((item, i) => (
                        <li key={i}>
                          <a href="shop-left-sidebar.html"><i className="fa fa-arrow-right"></i> {item}</a>
                        </li>
                      ))}
                    </ul>
                    <div className="uren-btn-ps_left">
                      <a className="uren-btn" href="shop-left-sidebar.html">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Feauterd;

  