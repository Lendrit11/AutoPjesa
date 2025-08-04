import React, { useState } from 'react';
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


const Product_tab = () => {
  const [activeTab, setActiveTab] = useState('description');

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
                      href="#specification"
                      className={activeTab === 'specification' ? 'active' : ''}
                      onClick={e => {
                        e.preventDefault();
                        setActiveTab('specification');
                      }}
                    >
                      <span>Specification</span>
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
                      <span>Reviews (1)</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content uren-tab_content">
                <div
                  id="description"
                  className={`tab-pane ${activeTab === 'description' ? 'active show' : ''}`}
                  role="tabpanel"
                >
                  <div className="product-description">
                    <ul>
                      <li>
                        <strong>Ullam aliquam</strong>
                        <span>
                          Voluptatum, minus? Optio molestias voluptates aspernatur laborum ratione minima,
                          natus eaque nemo rem quisquam, suscipit architecto saepe. Debitis omnis labore laborum
                          consectetur, quas, esse voluptates minus aliquam modi nesciunt earum! Vero rerum molestiae
                          corporis libero repellat doloremque quae sapiente ratione maiores qui aliquam, sunt
                          obcaecati! Iure nisi doloremque numquam delectus.
                        </span>
                      </li>
                      <li>
                        <strong>Enim tempore</strong>
                        <span>
                          Molestias amet quibusdam eligendi exercitationem alias labore tenetur quaerat veniam similique
                          aspernatur eveniet, suscipit corrupti itaque dolore deleniti nobis, rerum reprehenderit
                          recusandae. Eligendi beatae asperiores nisi distinctio doloribus voluptatibus voluptas
                          repellendus tempore unde velit temporibus atque maiores aliquid deserunt aspernatur amet,
                          soluta fugit magni saepe fugiat vel sunt voluptate vitae
                        </span>
                      </li>
                      <li>
                        <strong>Laudantium suscipit</strong>
                        <span>
                          Odit repudiandae maxime, ducimus necessitatibus error fugiat nihil eum dolorem animi
                          voluptates sunt, rem quod reprehenderit expedita, nostrum sit accusantium ut delectus.
                          Voluptates at ipsam, eligendi labore dignissimos consectetur reprehenderit id error excepturi
                          illo velit ratione nisi nam saepe quod! Reiciendis eos, velit fugiat voluptates accusamus
                          nesciunt dicta ratione mollitia, asperiores error aliquam! Reprehenderit provident, omnis
                          blanditiis fugit, accusamus deserunt illum unde, voluptatum consequuntur illo officiis
                          labore doloremque quidem aperiam! Fuga, expedita? Laboriosam eum, tempore vitae libero
                          voluptate omnis ducimus doloremque hic quibusdam reiciendis ab itaque aperiam maiores
                          laudantium esse, consequuntur quos labore modi quasi recusandae distinctio iusto optio
                          officia tempora.
                        </span>
                      </li>
                      <li>
                        <strong>Molestiae veritatis officia</strong>
                        <span>
                          Illum fuga esse tenetur inventore, in voluptatibus saepe iste quia cupiditate, explicabo
                          blanditiis accusantium ut. Eaque nostrum, quisquam doloribus asperiores tempore autem.
                          Ea perspiciatis vitae reiciendis maxime similique vel, id ratione blanditiis ullam officiis
                          odio sunt nam quos atque accusantium ad! Repellendus, magni aliquid. Iure asperiores veniam
                          eum unde dignissimos reprehenderit ut atque velit, harum labore nam expedita, pariatur
                          excepturi consectetur animi optio mollitia ad a natus eaque aut assumenda inventore dolor
                          obcaecati! Enim ab tempore nulla iusto consequuntur quod sit voluptatibus adipisci earum
                          fuga, explicabo amet, provident, molestiae optio. Ducimus ex necessitatibus assumenda,
                          nisi excepturi ut aspernatur est eius dignissimos pariatur unde ipsum sunt quaerat.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  id="specification"
                  className={`tab-pane ${activeTab === 'specification' ? 'active show' : ''}`}
                  role="tabpanel"
                >
                  <table className="table table-bordered specification-inner_stuff">
                    <tbody>
                      <tr>
                        <td colSpan="2">
                          <strong>Memory</strong>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>test 1</td>
                        <td>8gb</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td colSpan="2">
                          <strong>Processor</strong>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>No. of Cores</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  id="reviews"
                  className={`tab-pane ${activeTab === 'reviews' ? 'active show' : ''}`}
                  role="tabpanel"
                >
                  <div className="tab-pane active" id="tab-review">
                    <form className="form-horizontal" id="form-review">
                      <div id="review">
                        <table className="table table-striped table-bordered">
                          <tbody>
                            <tr>
                              <td style={{ width: '50%' }}>
                                <strong>Customer</strong>
                              </td>
                              <td className="text-right">15/09/20</td>
                            </tr>
                            <tr>
                              <td colSpan="2">
                                <p>Good product! Thank you very much</p>
                                <div className="rating-box">
                                  <ul>
                                    <li>
                                      <i className="ion-android-star"></i>
                                    </li>
                                    <li>
                                      <i className="ion-android-star"></i>
                                    </li>
                                    <li>
                                      <i className="ion-android-star"></i>
                                    </li>
                                    <li>
                                      <i className="ion-android-star"></i>
                                    </li>
                                    <li>
                                      <i className="ion-android-star"></i>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <h2>Write a review</h2>
                      <div className="form-group required">
                        <div className="col-sm-12 p-0">
                          <label>
                            Your Email <span className="required">*</span>
                          </label>
                          <input className="review-input" type="email" name="con_email" id="con_email" required />
                        </div>
                      </div>
                      <div className="form-group required second-child">
                        <div className="col-sm-12 p-0">
                          <label className="control-label">Share your opinion</label>
                          <textarea className="review-textarea" name="con_message" id="con_message"></textarea>
                          <div className="help-block">
                            <span className="text-danger">Note:</span> HTML is not translated!
                          </div>
                        </div>
                      </div>
                      <div className="form-group last-child required">
                        <div className="col-sm-12 p-0">
                          <div className="your-opinion">
                            <label>Your Rating</label>
                            <span>
                              <select className="star-rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </span>
                          </div>
                        </div>
                        <div className="uren-btn-ps_right">
                          <button className="uren-btn-2">Continue</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_tab;
