// src/components/cart/Cart.jsx
import React, { useEffect, useState } from "react";
import { axiosWithCredentials } from "../../../../server/axiosin";  // Rregullo rrugën sipas strukturës tënde
import '../../../../assets/css/style.css';

const Cart = ({ onClose, className }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetchCart();

    const handleRefresh = () => {
      fetchCart();
    };

    window.addEventListener("refresh-cart", handleRefresh);

    return () => {
      window.removeEventListener("refresh-cart", handleRefresh);
    };
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosWithCredentials.get("/api/user/cart/MyCart");

      const items = response.data;
      setCartItems(items);

      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setSubtotal(total);

      window.dispatchEvent(new CustomEvent("cart-updated", {
        detail: {
          total: total,
          count: items.reduce((sum, item) => sum + item.quantity, 0)
        }
      }));
    } catch (error) {
      console.error("Gabim gjatë marrjes së cart-it:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axiosWithCredentials.delete(`/api/user/cart/remove-cart-item/${cartItemId}`);

      fetchCart();
    } catch (error) {
      console.error("Gabim gjatë fshirjes së artikullit:", error.response?.data || error.message);
    }
  };

  return (
    <div className={`offcanvas-minicart_wrapper ${className}`}>
      <div className="offcanvas-menu-inner">
        <a href="#" className="btn-close" onClick={(e) => { e.preventDefault(); onClose(); }}>
          <i className="ion-android-close"></i>
        </a>
        <div className="minicart-content">
          <div className="minicart-heading">
            <h4>Shopping Cart</h4>
          </div>
          <ul className="minicart-list">
            {cartItems.map((item) => (
              <li key={item.cartItemId} className="minicart-product">
                <a
                  href="#"
                  className="product-item_remove"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveItem(item.cartItemId);
                  }}
                >
                  <i className="ion-android-close"></i>
                </a>
                <div className="product-item_img">
                  <img src={item.imageUrl} alt="Product" />
                </div>
                <div className="product-item_content">
                  <span className="product-item_title">{item.name || "Product"}</span>
                  <span className="product-item_quantity">{item.quantity} x €{item.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="minicart-item_total">
          <span>Subtotal</span>
          <span className="ammount">€{subtotal.toFixed(2)}</span>
        </div>
        <div className="minicart-btn_area">
          <a href="/checkout" className="uren-btn uren-btn_dark uren-btn_fullwidth">Checkout</a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
