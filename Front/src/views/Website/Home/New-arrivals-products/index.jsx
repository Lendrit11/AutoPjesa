import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


// SVG për Next dhe Prev arrows
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-arrow-next" onClick={onClick}>
    <svg width="24" height="24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-arrow-prev" onClick={onClick}>
    <svg width="24" height="24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </div>
);

const Arrivals = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hoveringId, setHoveringId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5298/api/user/home/latest?count=10')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAddToFavorites = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.info('Kyçu për të shtuar në favorites');
      return;
    }
    try {
      await axios.post('http://localhost:5298/api/user/home/favorites', { partId: productId, userId });
      toast.success('Shtuar në favorites!');
    } catch (error) {
      toast.error('Gabim gjatë shtimit; ndoshta e ke shtuar tashmë.');
    }
  };

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
    <div className="uren-product_area">
      <div className="container-fluid">
        <div className="section-title_area">
          <span>Top New On This Week</span>
          <h3>New Arrivals Products</h3>
        </div>
        <Slider {...settings}>
          {products.map(product => (
            <div
              key={product.partId}
              className="product-slide_item"
              onMouseEnter={() => setHoveringId(product.partId)}
              onMouseLeave={() => setHoveringId(null)}
            >
              <div className="inner-slide">
                <div className="single-product">
                  <div className="product-img">
                    <img
                      className="primary-img"
                      src={product.images && product.images.length > 0 ? product.images[0].imageUrl : 'fallback-image-url.jpg'}
                      alt={product.partName}
                    />
                    {hoveringId === product.partId && (
                      <div className="hover-buttons">
                        <button
                          className="btn btn-detail"
                          onClick={() => navigate(`/Product/${product.partId}`)}
                          aria-label="More Details"
                        >
                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="10" cy="10" r="9" />
                            <line x1="10" y1="6" x2="10" y2="10" />
                            <line x1="10" y1="14" x2="10" y2="14" />
                          </svg>
                          View Details
                        </button>
                        <button
                          className="btn btn-favorite"
                          onClick={() => handleAddToFavorites(product.partId)}
                          aria-label="Add to favorites"
                        >
                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="heart-icon">
                            <path d="M12 21s-1-.45-1-1.5S9 17 6 14.5 1 10 1 6a4 4 0 0 1 7-3 4 4 0 0 1 7 3c0 4-5 7.5-5 7.5z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="product-content">
                    <h6>{product.partName}</h6>
                    <div className="price-box">€{product.price?.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <style jsx>{`
        .uren-product_area {
          padding: 40px 0;
          background: #f9f9f9;
        }
        .section-title_area {
          text-align: center;
          margin-bottom: 30px;
        }
        .section-title_area span {
          display: block;
          color: #888;
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        .section-title_area h3 {
          font-size: 2.5rem;
          color: #222;
        }
        .product-slide_item {
          padding: 10px;
          transition: transform 0.3s ease;
        }
        .product-slide_item:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          border-radius: 12px;
          background: #fff;
        }
        .single-product {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .product-img {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #eee;
        }
        .primary-img {
          width: 100%;
          display: block;
          transition: transform 0.4s ease;
          cursor: pointer;
        }
        .product-slide_item:hover .primary-img {
          transform: scale(1.05);
        }
        .hover-buttons {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          background: rgba(255,255,255,0.9);
          border-radius: 50px;
          padding: 6px 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          opacity: 1;
          transition: opacity 0.3s ease;
          z-index: 10;
        }
        .btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border: none;
          padding: 8px 14px;
          font-weight: 600;
          border-radius: 30px;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          font-size: 0.9rem;
          user-select: none;
        }
        .btn-detail {
          background: #ff8800ff;
          color: white;
        }
        .btn-detail:hover {
          background: #ff8800ff;
          stroke: #333;
          fill: #fff;
        }
        .btn-favorite {
          background: #ffc107;
          color: #333;
          padding: 8px 12px;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          justify-content: center;
        }
        .btn-favorite:hover {
          background: #e0a800;
          color: white;
        }
        .heart-icon {
          stroke: #333;
          transition: stroke 0.3s ease, fill 0.3s ease;
        }
        .btn-favorite:hover .heart-icon {
          stroke: #fff;
          fill: #fff;
        }
        .product-content {
          padding: 15px 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }
        .product-content h6 {
          font-weight: 700;
          font-size: 1.1rem;
          color: #222;
          margin-bottom: 8px;
        }
        .price-box {
          font-weight: 700;
          color: #ff8800ff;
          font-size: 1rem;
        }
        .custom-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 20;
          transition: background-color 0.3s ease;
        }
        .custom-arrow:hover {
          background-color: #ff8800ff;
          svg {
            stroke: white;
          }
        }
        .custom-arrow-prev {
          left: 10px;
        }
        .custom-arrow-next {
          right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Arrivals;

