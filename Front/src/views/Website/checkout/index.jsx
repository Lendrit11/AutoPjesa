import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer  from "../footer/index";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderMsg, setOrderMsg] = useState("");
  const navigate = useNavigate();

  // Funksioni për të marrë artikujt nga cart-i
const fetchCartItems = async () => {
  try {
    const response = await axios.get("http://localhost:5298/api/user/order/cart/items", {
      withCredentials: true
    });
    const data = response.data;
    setItems(data);
    const total = data.reduce((sum, item) => sum + item.total, 0);
    setCartTotal(total);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      setItems([]); // nuk ka artikuj
      setOrderMsg("❗ Nuk ka pjesë në shportë.");
    } else {
      setOrderMsg("⚠️ Gabim gjatë marrjes së të dhënave nga shporta.");
    }
  }
};

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5298/api/user/order/from-cart", {}, { withCredentials:true });
      setOrderMsg(`✅ Order placed! ID: ${response.data.OrderId}`);
      // Redirect për summary page me state
      navigate('/order-summary', { state: { order: response.data } });
    } catch (err) {
      console.error("Error placing order:", err);
      setOrderMsg("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Checkout</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li className="active">Checkout</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="checkout-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="your-order">
                <h3>Your order</h3>
{items.length === 0 ? (
  <p className="text-danger mt-3">{orderMsg || "❗ Nuk ka artikuj për të shfaqur."}</p>
) : (
  <div className="your-order-table table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={`${item.partId}-${index}`}>
            <td>{item.partName}</td>
            <td>{item.quantity}</td>
            <td>€{(item.price || 0).toFixed(2)}</td>
            <td>€{(item.total || 0).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan="3" className="text-right">Grand Total</th>
          <td><strong>€{cartTotal.toFixed(2)}</strong></td>
        </tr>
      </tfoot>
    </table>
  </div>
)}


                <div className="order-button-payment">
<button
  onClick={handlePlaceOrder}
  disabled={loading || items.length === 0}
  className="btn btn-primary"
>
  {loading ? "Placing order..." : "Place order"}
</button>

                  {orderMsg && <p className="mt-3">{orderMsg}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Checkout;
