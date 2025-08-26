import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// CSS
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

import { axiosWithCredentials } from '../../../../server/axiosin';

const Single_Product_area = ({ product }) => {
  const sliderMainRef = useRef(null);
  const sliderNavRef = useRef(null);

  const handleAddToCart = async () => {
    try {
      const quantity = parseInt(document.querySelector('.cart-plus-minus-box').value) || 1;

      await axiosWithCredentials.post('/api/user/cart/add-cart', {
        partId: product.id,
        quantity: quantity,
      });

      toast.success("Produkti u shtua në cart!");
      window.dispatchEvent(new Event("refresh-cart"));
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warn("Ju lutemi kyçuni për të shtuar në cart.");
      } else {
        toast.error("Gabim gjatë shtimit në cart.");
      }
    }
  };

  const handleAddToFavorites = async () => {
    try {
      await axiosWithCredentials.post('/api/user/product/favorites/add', { partId: product.id });
      toast.success("Produkti u shtua në favorite!");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warn("Ju lutemi kyçuni për të shtuar në favorite.");
      } else if (err.response?.status === 400) {
        toast.info("Ky produkt është tashmë në favorite.");
      } else {
        toast.error("Ndodhi një gabim. Provoni përsëri.");
      }
    }
  };

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
              { breakpoint: 992, settings: { slidesToShow: 3 } },
              { breakpoint: 768, settings: { slidesToShow: 2 } },
              { breakpoint: 575, settings: { slidesToShow: 2 } },
            ],
          });
        }
      } catch (err) {
        console.error("Gabim gjatë slick init:", err);
      }
    }

    return () => {
      if ($(sliderMainRef.current).hasClass('slick-initialized')) {
        $(sliderMainRef.current).slick('unslick');
      }
      if ($(sliderNavRef.current).hasClass('slick-initialized')) {
        $(sliderNavRef.current).slick('unslick');
      }
    };
  }, [product]);

  if (!product) return null;

  return (
    <div className="sp-area">
      <div className="container-fluid">
        <div className="sp-nav">
          <div className="row">
            {/* Imazhet */}
            <div className="col-lg-4">
              <div className="sp-img_area">
                <div className="sp-img_slider uren-slick-slider" ref={sliderMainRef}>
                  {[product.primaryImage, ...(product.otherImages || [])].map((img, idx) => (
                    <div key={idx} className="single-slide zoom">
                      <img src={img} alt={`Product ${idx}`} />
                    </div>
                  ))}
                </div>

                <div className="sp-img_slider-nav_wrapper">
                  <button type="button" className="custom-prev">
                    <i className="fa fa-chevron-left"></i>
                  </button>
                  <button type="button" className="custom-next">
                    <i className="fa fa-chevron-right"></i>
                  </button>

                  <div className="sp-img_slider-nav uren-slick-slider slider-navigation_style-3" ref={sliderNavRef}>
                    {[product.primaryImage, ...(product.otherImages || [])].map((img, idx) => (
                      <div key={idx} className="single-slide">
                        <img src={img} alt={`Thumb ${idx}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detajet */}
            <div className="col-lg-8">
              <div className="sp-content">
                <div className="sp-heading">
                  <h5>{product.name}</h5>
                </div>
                <span className="reference">Product Code: {product.code || 'N/A'}</span>

                <div className="rating-box">
                  <ul>
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <i className={`ion-android-star ${i < (product.rating || 0) ? '' : 'silver-color'}`}></i>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sp-essential_stuff">
                  <ul>
                    <li>Availability: <a href="#">{product.available ? 'In Stock' : 'Out of Stock'}</a></li>
                  </ul>
                </div>

                <div className="quantity">
                  <label>Quantity</label>
                  <div className="cart-plus-minus">
                    <input className="cart-plus-minus-box" defaultValue="1" type="text" />
                    <div className="dec qtybutton"><i className="fa fa-angle-down"></i></div>
                    <div className="inc qtybutton"><i className="fa fa-angle-up"></i></div>
                  </div>
                </div>

                <div className="qty-btn_area">
                  <ul>
                    <li>
                      <a
                        className="qty-cart_btn"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart();
                        }}
                      >
                        Add To Cart
                      </a>
                    </li>
                    <li>
                      <button
                        className="qty-wishlist_btn"
                        title="Add To Wishlist"
                        onClick={handleAddToFavorites}
                      >
                        <i className="ion-android-favorite-outline"></i> Add to Favorites
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="sp-price mt-3">
                  <h2 style={{ color: '#ff8800ff' }}>Price: €{product.price?.toFixed(2)}</h2>
                  {product.oldPrice && (
                    <h6 className="text-muted text-decoration-line-through">Old Price: €{product.oldPrice?.toFixed(2)}</h6>
                  )}
                </div>

                <div className="uren-tag-line">
                  <h6>Tags:</h6>
                  {product.tags?.length ? (
                    product.tags.map((tag, idx) => (
                      <React.Fragment key={idx}>
                        <a href="#">{tag}</a>{idx < product.tags.length - 1 ? ', ' : ''}
                      </React.Fragment>
                    ))
                  ) : (
                    <span>No tags</span>
                  )}
                </div>

                <div className="uren-social_link">
                  <ul>
                    <li className="facebook"><a href="#"><i className="fab fa-facebook"></i></a></li>
                    <li className="twitter"><a href="#"><i className="fab fa-twitter-square"></i></a></li>
                    <li className="youtube"><a href="#"><i className="fab fa-youtube"></i></a></li>
                    <li className="instagram"><a href="#"><i className="fab fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Single_Product_area;
