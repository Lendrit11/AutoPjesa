import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Import Link për navigim
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

import Footer from "../footer/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const addToCart = async (partId) => {
    try {
      await axios.post(
        "http://localhost:5298/api/Wishlist/add-cart",
        { partId: partId, quantity: 1 },
        { withCredentials: true }
      );
      toast.success("Added to cart!");
      window.dispatchEvent(new Event("refresh-cart"));
    } catch (error) {
      console.error("Gabim gjatë shtimit në cart", error);
      toast.error("Error adding to cart");
    }
  };

  const removeFromWishlist = async (partId) => {
    try {
      await axios.delete(
        `http://localhost:5298/api/Wishlist/remove-from-wishlist/${partId}`,
        { withCredentials: true }
      );
      toast.success("Deleted with success");
      setWishlist((prev) => prev.filter((item) => item.partId !== partId));
    } catch (error) {
      console.error("Gabim gjatë largimit nga wishlist", error);
      toast.error("Error removing from wishlist");
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5298/api/Wishlist/get-wishlist",
          { withCredentials: true }
        );
        setWishlist(response.data);
      } catch (error) {
        console.error("Gabim gjatë marrjes së wishlist", error);
        toast.error("Error fetching wishlist");
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="main-wrapper">

      <ToastContainer />

      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Other</h2>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li className="active">Wishlist</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="uren-wishlist_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              {/* Në vend të form me action="javascript:void(0)", e hoqa form dhe përdorëm div sepse nuk ka submit*/}
              <div>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>remove</th>
                        <th>images</th>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Stock Status</th>
                        <th>add to cart</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <button
                              onClick={() => removeFromWishlist(item.partId)}
                              className="btn btn-sm btn-danger"
                              title="Remove"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                          <td>
                            <Link to={`/Product/${item.partId}`}>
                              <img src={item.imgUrl} alt="Product" width="70" />
                            </Link>
                          </td>
                          <td>
                            <Link to={`/Product/${item.partId}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td>${item.price}</td>
                          <td>
                            <span className={item.stock > 0 ? "in-stock" : "out-stock"}>
                              {item.stock > 0 ? "in stock" : "out stock"}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => addToCart(item.partId)}
                              className="btn btn-sm btn-primary"
                            >
                              Add to cart
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default Wishlist;
