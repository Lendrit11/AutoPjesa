import React from "react";
import Slider from "react-slick";

const products = [
  {
    id: 1,
    name: "Veniam officiis voluptates",
    primaryImg: "assets/images/product/medium-size/1-1.jpg",
    secondaryImg: "assets/images/product/medium-size/1-2.jpg",
    priceNew: "$122.00",
    priceOld: null,
    stickers: ["New"],
    rating: 3,
  },
  {
    id: 2,
    name: "Corporis sed excepturi",
    primaryImg: "assets/images/product/medium-size/2-1.jpg",
    secondaryImg: "assets/images/product/medium-size/2-2.jpg",
    priceNew: "$194.00",
    priceOld: "$241.00",
    stickers: ["-20%", "New"],
    rating: 3,
  },
  {
    id: 3,
    name: "Quidem iusto sapiente",
    primaryImg: "assets/images/product/medium-size/3-1.jpg",
    secondaryImg: "assets/images/product/medium-size/3-2.jpg",
    priceNew: "$175.00",
    priceOld: null,
    stickers: ["New"],
    rating: 4,
  },
  {
    id: 4,
    name: "Ullam excepturi nesciunt",
    primaryImg: "assets/images/product/medium-size/4-1.jpg",
    secondaryImg: "assets/images/product/medium-size/4-2.jpg",
    priceNew: "$145.00",
    priceOld: "$190.00",
    stickers: ["-5%", "New"],
    rating: 3,
  },
  {
    id: 5,
    name: "Minus ipsam rerum",
    primaryImg: "assets/images/product/medium-size/5-1.jpg",
    secondaryImg: "assets/images/product/medium-size/5-2.jpg",
    priceNew: "$130.00",
    priceOld: null,
    stickers: ["New"],
    rating: 3,
  },
];

// Shigjeta custom për slick


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

const Arrivals = () => {
  const renderStars = (count) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <li key={i} className={i <= count ? "" : "silver-color"}>
          <i className="ion-android-star"></i>
        </li>
      );
    }
    return stars;
  };

  const settings = {
    dots: false,
    infinite: true,  // Looping i pa fund
    speed: 500,      // Smooth transition
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="uren-product_area" style={{ position: "relative" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title_area">
                <br />
              <span>Top New On This Week</span>
              <h3>New Arrivals Products</h3>
            </div>
  <br />
            <Slider {...settings}>
              {products.map((product) => (
                <div className="product-slide_item" key={product.id}>
                  <div className="inner-slide" style={{ padding: "0 10px" }}>
                    <div className="single-product">
                      <div className="product-img">
                        <a href="single-product.html">
                          <img
                            className="primary-img"
                            src={product.primaryImg}
                            alt={`${product.name} primary`}
                          />
                          <img
                            className="secondary-img"
                            src={product.secondaryImg}
                            alt={`${product.name} secondary`}
                          />
                        </a>
                        <div className="sticker">
                          {product.stickers.map((sticker, i) => (
                            <span
                              key={i}
                              className={
                                sticker.startsWith("-") ? "sticker-2" : "sticker"
                              }
                            >
                              {sticker}
                            </span>
                          ))}
                        </div>
                        <div className="add-actions">
                          <ul>
                            <li>
                              <a
                                className="uren-add_cart"
                                href="cart.html"
                                title="Add To Cart"
                              >
                                <i className="ion-bag"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="uren-wishlist"
                                href="wishlist.html"
                                title="Add To Wishlist"
                              >
                                <i className="ion-android-favorite-outline"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="uren-add_compare"
                                href="compare.html"
                                title="Compare This Product"
                              >
                                <i className="ion-android-options"></i>
                              </a>
                            </li>
                            <li
                              className="quick-view-btn"
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                            >
                              <a href="javascript:void(0)" title="Quick View">
                                <i className="ion-android-open"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-desc_info">
                          <div className="rating-box">
                            <ul>{renderStars(product.rating)}</ul>
                          </div>
                          <h6>
                            <a className="product-name" href="single-product.html">
                              {product.name}
                            </a>
                          </h6>
                          <div className="price-box">
                            <span
                              className={
                                product.priceOld
                                  ? "new-price new-price-2"
                                  : "new-price"
                              }
                            >
                              {product.priceNew}
                            </span>
                            {product.priceOld && (
                              <span className="old-price">{product.priceOld}</span>
                            )}
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

export default Arrivals;
