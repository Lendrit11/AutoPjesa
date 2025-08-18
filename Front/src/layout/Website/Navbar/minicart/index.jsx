import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../../../assets/css/style.css';

const Cart = ({ onClose, className }) => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
useEffect(() => {
  fetchCart(); // fillimisht

  const handleRefresh = () => {
    fetchCart(); // rifresko kur vjen event
  };

  window.addEventListener("refresh-cart", handleRefresh);

  return () => {
    window.removeEventListener("refresh-cart", handleRefresh);
  };
}, []);


    // Funksioni për të marrë artikujt e karrocës
    const fetchCart = async () => {
        try {
            const response = await axios.get("http://localhost:5298/api/user/cart/MyCart", {
                withCredentials: true // nëse përdor cookies për autorizim
                // ose shto Authorization header me token nëse ke JWT
            });

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

    useEffect(() => {
        fetchCart();
    }, []);

    // Funksioni për të fshirë artikullin nga karroca
    const handleRemoveItem = async (cartItemId) => {
        try {
            await axios.delete(`http://localhost:5298/api/user/cart/remove-cart-item/${cartItemId}`, {
                withCredentials: true
                // ose header Authorization: `Bearer ${token}`
            });

            // Pas fshirjes, rifreskojmë karrocën
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
                                {/* Shto onclick për butonin e fshirjes */}
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
                                    <span className="product-item_title">Product</span>
                                    <span className="product-item_quantity">{item.quantity} x ${item.price.toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="minicart-item_total">
                    <span>Subtotal</span>
                    <span className="ammount">${subtotal.toFixed(2)}</span>
                </div>
                <div className="minicart-btn_area">
                    <a href="/checkout" className="uren-btn uren-btn_dark uren-btn_fullwidth">Checkout</a>
                </div>
            </div>
        </div>
    );
};

export default Cart;
