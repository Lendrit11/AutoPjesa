import React, { useEffect, useRef } from "react";
import '../../../../assets/css/style.css';

const Cart = ({ onClose ,className }) => {


    return (
        <div  className={`offcanvas-minicart_wrapper ${className}`}>
            <div className="offcanvas-menu-inner" >
                <a href="#" className="btn-close" onClick={(e) => { e.preventDefault(); onClose(); }}>
                    <i className="ion-android-close"></i>
                </a>
                <div className="minicart-content">
                    <div className="minicart-heading">
                        <h4>Shopping Cart</h4>
                    </div>
                    <ul className="minicart-list">
                        <li className="minicart-product">
                            <a className="product-item_remove" href="javascript:void(0)"><i className="ion-android-close"></i></a>
                            <div className="product-item_img">
                                <img src="assets/images/product/small-size/1.jpg" alt="Uren's Product Image" />
                            </div>
                            <div className="product-item_content">
                                <a className="product-item_title" href="shop-left-sidebar.html">Autem ipsa ad</a>
                                <span className="product-item_quantity">1 x $145.80</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="minicart-item_total">
                    <span>Subtotal</span>
                    <span className="ammount">$462.40</span>
                </div>
                <div className="minicart-btn_area">
                    <a href="cart.html" className="uren-btn uren-btn_dark uren-btn_fullwidth">Minicart</a>
                </div>
                <div className="minicart-btn_area">
                    <a href="checkout.html" className="uren-btn uren-btn_dark uren-btn_fullwidth">Checkout</a>
                </div>
            </div>
        </div>
    );
};

export default Cart;
