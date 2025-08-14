import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

// Import CSS për React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Zgjata shkurt për navigimin custom
const NextArrow = ({ onClick }) => (
  <div className="custom-sh custom-para" onClick={onClick}>
    <i className="ion-chevron-right"></i>
  </div>
);
const PrevArrow = ({ onClick }) => (
  <div className="custom-sh custom-mrapa" onClick={onClick}>
    <i className="ion-chevron-left"></i>
  </div>
);

// Funksion për yjet e vlerësimit (pa vlerësim sepse nuk kthehet rating nga API)
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <li key={i} className={i <= rating ? "" : "silver-color"}>
        <i className="ion-android-star"></i>
      </li>
    );
  }
  return stars;
};

const LatestProductsSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5298/api/user/product/get-last")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching latest products:", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="uren-product_area" style={{ position: "relative" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title_area">
              <br />
              <h3>Latest Products</h3>
            </div>
            <Slider {...settings}>
              {products.map((p) => (
                <div className="product-slide_item" key={p.partId}>
                  <div className="inner-slide" style={{ padding: "0 10px" }}>
                    <div className="single-product">
                      <div className="product-img">
                        <a href={`/product/${p.partId}`}>
                          <img
                            className="primary-img"
                            src={p.images[0]?.imageUrl}
                            alt={p.partName}
                          />
                          {p.images[1] && (
                            <img
                              className="secondary-img"
                              src={p.images[1].imageUrl}
                              alt={p.partName}
                            />
                          )}
                        </a>
                        <div className="add-actions">
                          <ul>
                            <li><a className="uren-add_cart" href="#"><i className="ion-bag"></i></a></li>
                            <li><a className="uren-wishlist" href="#"><i className="ion-android-favorite-outline"></i></a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-desc_info">
                          <div className="rating-box">
                            <ul>{renderStars(5)}</ul>
                          </div>
                          <h6><a className="product-name" href={`/product/${p.partId}`}>{p.partName}</a></h6>
                          <div className="price-box">
                            <span className="new-price">€{p.price.toFixed(2)}</span>
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

export default LatestProductsSlider;
