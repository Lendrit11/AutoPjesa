import React from "react";
import '../../../assets/css/vendor/bootstrap.min.css';
import '../../../assets/css/vendor/font-awesome.css';
import '../../../assets/css/vendor/fontawesome-stars.css';
import '../../../assets/css/vendor/ion-fonts.css';
import '../../../assets/css/plugins/slick.css';
import '../../../assets/css/plugins/animate.css';
import '../../../assets/css/plugins/jquery-ui.min.css';
import '../../../assets/css/plugins/lightgallery.min.css';
import '../../../assets/css/plugins/nice-select.css';
import '../../../assets/css/style.css';
const Error404Page = () => {
  return (
    <div className="main-wrapper">

      {/* Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Other</h2>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li className="active">Error 404</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="error404-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 ml-auto mr-auto text-center">
              <div className="search-error-wrapper">
                <h1>404</h1>
                <h2>PAGE NOT BE FOUND</h2>
                <p className="short_desc">
                  Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable.
                </p>
                <form action="javascript:void(0)" className="error-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="inner-error_form">
                    <input type="text" placeholder="Search..." className="error-input-text" />
                    <button type="submit" className="error-search_btn">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="uren-btn-ps_center"></div>
                <a href="index.html" className="uren-error_btn">Back To Home Page</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Error404Page;
