import React, { useEffect } from "react";
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
import Footer  from "../footer/index";

const Contact = () => {
  useEffect(() => {
    // Kontrollo nëse scripti ekziston tashmë për të mos ngarkuar dy herë
    if (!document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_VALID_API_KEY&libraries=geometry";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Inicializo Google Map pasi scripti është ngarkuar
        if (window.google) {
          const mapOptions = {
            zoom: 12,
            scrollwheel: false,
            center: new window.google.maps.LatLng(40.740610, -73.935242),
            styles: [], // Shto stilat nëse ke
          };
          const mapElement = document.getElementById("google-map");
          if (mapElement) {
            const map = new window.google.maps.Map(mapElement, mapOptions);
            new window.google.maps.Marker({
              position: new window.google.maps.LatLng(40.740610, -73.935242),
              map,
              title: "Limupa",
              animation: window.google.maps.Animation.BOUNCE,
            });
          }
        }
      };

      document.head.appendChild(script);
    } else {
      // Nëse scripti ekziston, thjesht inicializo harten direkt (mund ta heqësh këtë nëse do presh ngarkimin)
      if (window.google) {
        const mapOptions = {
          zoom: 12,
          scrollwheel: false,
          center: new window.google.maps.LatLng(40.740610, -73.935242),
          styles: [],
        };
        const mapElement = document.getElementById("google-map");
        if (mapElement) {
          const map = new window.google.maps.Map(mapElement, mapOptions);
          new window.google.maps.Marker({
            position: new window.google.maps.LatLng(40.740610, -73.935242),
            map,
            title: "Limupa",
            animation: window.google.maps.Animation.BOUNCE,
          });
        }
      }
    }

    // Nuk e heqim scriptin në cleanup për të mos shkaktuar ngarkim të dyfishtë
  }, []);

  return (
    <div className="main-wrapper">
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Other</h2>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li className="active">Contact</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="contact-main-page">
        <div className="container-fluid">
          <div
            id="google-map"
            style={{ height: "400px", width: "100%" }}
          ></div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 offset-lg-1 col-md-12 order-1 order-lg-2">
              <div className="contact-page-side-content">
                <h3 className="contact-page-title">Contact Us</h3>
                <p className="contact-page-message">
                  Claritas est etiam processus dynamicus, qui sequitur
                  mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum
                  claram anteposuerit litterarum formas human.
                </p>
                <div className="single-contact-block">
                  <h4><i className="fa fa-fax"></i> Address</h4>
                  <p>123 Main Street, Anytown, CA 12345 – USA</p>
                </div>
                <div className="single-contact-block">
                  <h4><i className="fa fa-phone"></i> Phone</h4>
                  <p>Mobile: (08) 123 456 789</p>
                  <p>Hotline: 1009 678 456</p>
                </div>
                <div className="single-contact-block last-child">
                  <h4><i className="fa fa-envelope-o"></i> Email</h4>
                  <p>yourmail@domain.com</p>
                  <p>support@hastech.company</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 order-2 order-lg-1">
              <div className="contact-form-content">
                <h3 className="contact-page-title">Tell Us Your Message</h3>
                <div className="contact-form">
                  <form id="contact-form" action="http://hasthemes.com/file/mail.php" method="post">
                    <div className="form-group">
                      <label>Your Name <span className="required">*</span></label>
                      <input type="text" name="con_name" id="con_name" required />
                    </div>
                    <div className="form-group">
                      <label>Your Email <span className="required">*</span></label>
                      <input type="email" name="con_email" id="con_email" required />
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input type="text" name="con_subject" id="con_subject" />
                    </div>
                    <div className="form-group form-group-2">
                      <label>Your Message</label>
                      <textarea name="con_message" id="con_message"></textarea>
                    </div>
                    <div className="form-group">
                      <button type="submit" value="submit" id="submit" className="uren-contact-form_btn" name="submit">
                        send
                      </button>
                    </div>
                  </form>
                </div>
                <p className="form-messege"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

        <Footer/>
    </div>
  );
};

export default Contact;
