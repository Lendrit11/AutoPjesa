import React, { useState } from 'react';
import axios from 'axios'; // Import axios

// Import CSS
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

const Product_tab = ({ description, reviews, partId }) => {
  const [activeTab, setActiveTab] = useState('description');

  const [formData, setFormData] = useState({
    email: '',
    message: '',
    rating: '5',
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.message || !formData.rating) {
    alert('Ju lutem plotësoni të gjitha fushat.');
    return;
  }

  const payload = {
    email: formData.email,
    reviewText: formData.message,
    rating: parseInt(formData.rating),
    productId: Number(partId),
  };

  console.log("Payload për dërgim:", payload);

  try {
await axios.post('http://localhost:5298/api/user/product/addreview', payload, {
  withCredentials: true
});

    alert("Review u shtua me sukses!");
    setFormData({ email: '', message: '', rating: '5' });
    window.location.reload();
  } catch (err) {
    console.error("Gabim në review submit:", err);
    alert("Dështoi dërgimi i review.");
  }
};


  return (
    <div className="sp-product-tab_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="sp-product-tab_nav">
              <div className="product-tab">
                <ul className="nav product-menu">
                  <li>
                    <a
                      href="#description"
                      className={activeTab === 'description' ? 'active' : ''}
                      onClick={e => {
                        e.preventDefault();
                        setActiveTab('description');
                      }}
                    >
                      <span>Description</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#reviews"
                      className={activeTab === 'reviews' ? 'active' : ''}
                      onClick={e => {
                        e.preventDefault();
                        setActiveTab('reviews');
                      }}
                    >
                      <span>Reviews ({reviews?.length || 0})</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content uren-tab_content">
                {/* Description */}
                <div
                  id="description"
                  className={`tab-pane ${activeTab === 'description' ? 'active show' : ''}`}
                  role="tabpanel"
                >
                  <div className="product-description">
                    <ul>
                      {description && description.length > 0 ? (
                        description.map((descItem, index) => (
                          <li key={index}>
                            <strong>{descItem.title}</strong>
                            <span>{descItem.text}</span>
                          </li>
                        ))
                      ) : (
                        <li>Nuk ka përshkrim për këtë produkt.</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Reviews */}
                <div
                  id="reviews"
                  className={`tab-pane ${activeTab === 'reviews' ? 'active show' : ''}`}
                  role="tabpanel"
                >
                  <div id="review">
                    {reviews && reviews.length > 0 ? (
                      <table className="table table-striped table-bordered">
                        <tbody>
                          {reviews.map((review) => (
                            <React.Fragment key={review.reviewId}>
                              <tr>
                                <td style={{ width: '50%' }}>
                                  <strong>{review.user?.firstName || 'Customer'}</strong>
                                </td>
                                <td className="text-right">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  <p>{review.reviewText}</p>
                                  <div className="rating-box">
                                    <ul>
                                      {[...Array(review.rating || 0)].map((_, i) => (
                                        <li key={i}>
                                          <i className="ion-android-star"></i>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Nuk ka review për këtë produkt.</p>
                    )}
                  </div>

                  {/* Forma e review */}
                  <h2>Shkruaj një review</h2>
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group required">
                      <div className="col-sm-12 p-0">
                        <label>
                          Email-i juaj <span className="required">*</span>
                        </label>
                        <input
                          className="review-input"
                          type="email"
                          value={formData.email}
                          required
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group required second-child">
                      <div className="col-sm-12 p-0">
                        <label className="control-label">Përshtypja juaj</label>
                        <textarea
                          className="review-textarea"
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>
                    </div>
                    <div className="form-group last-child required">
                      <div className="col-sm-12 p-0">
                        <div className="your-opinion">
                          <label>Vlerësimi juaj</label>
                          <select
                            className="star-rating"
                            value={formData.rating}
                            onChange={e => setFormData({ ...formData, rating: e.target.value })}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                      <div className="uren-btn-ps_right">
                        <button type="submit" className="uren-btn-2">Continue</button>
                      </div>
                    </div>
                  </form>
                </div> {/* /reviews */}
              </div> {/* /tab-content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_tab;
