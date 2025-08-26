import React, { useEffect, useState } from 'react';
import { axiosWithCredentials } from '../../../server/axiosin';  
import { Tabs, Tab } from 'react-bootstrap';
import '../../../assets/css/style.css';
import './modal.css';
import Footer from "../footer/index";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Account = () => {
  const [key, setKey] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [selectedStatType, setSelectedStatType] = useState('yearly');
  const [orderStats, setOrderStats] = useState([]);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    addresses: [{
      addressLine: '',
      city: '',
      country: ''
    }]
  });

  // Modal për detajet e order-it
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axiosWithCredentials.get('http://localhost:5298/api/account/get-order');
      setOrders(res.data);
    } catch (err) {
      console.error('Error loading orders:', err);
    }
  };

  const fetchStats = async (type) => {
    try {
      const res = await axiosWithCredentials.get(`http://localhost:5298/api/account/get-data/${type}`);
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setOrderStats(data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    try {
      await axiosWithCredentials.delete(`http://localhost:5298/api/account/delete/${orderId}`);
      toast.success('Order deleted successfully.');
      setShowOrderDetails(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order.');
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axiosWithCredentials.get('http://localhost:5298/api/account/get-user');
      setUserData(prev => ({
        ...prev,
        ...res.data
      }));
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...userData };

      if (!payload.password || payload.password.trim() === "") {
        delete payload.password;
      }

      await axiosWithCredentials.put('http://localhost:5298/api/account/update-user', payload);
      toast.success('User updated successfully.');
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('Update failed.');
    }
  };

  // Modal functions
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseModal = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    fetchStats(selectedStatType);

    const interval = setInterval(() => {
      fetchStats(selectedStatType);
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedStatType]);

  useEffect(() => {
    fetchOrders();
    fetchUser();
  }, []);

  return (
    <div className="main-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>My Account</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li className="active">My Account</li>
            </ul>
          </div>
        </div>
      </div>

      <main className="page-content flex-grow-1">
        <div className="account-page-area container-fluid h-100 d-flex">
          <div className="row flex-grow-1 w-100">
            <div className="col-lg-3 border-end pt-3">
              <div className="nav flex-column nav-pills">
                <button className={`nav-link ${key === 'dashboard' ? 'active' : ''}`} onClick={() => setKey('dashboard')}>Dashboard</button>
                <button className={`nav-link ${key === 'orders' ? 'active' : ''}`} onClick={() => setKey('orders')}>Orders</button>
                <button className={`nav-link ${key === 'details' ? 'active' : ''}`} onClick={() => setKey('details')}>Account Details</button>
              </div>
            </div>

            <div className="col-lg-9 py-4">
              <Tabs id="account-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="d-none">

                <Tab eventKey="dashboard" title="Dashboard">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="small-title mb-0">Order Statistics</h4>
                    <select
                      className="form-select w-auto"
                      value={selectedStatType}
                      onChange={(e) => setSelectedStatType(e.target.value)}
                    >
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                  {orderStats.length > 0 ? (
                    <Bar
                      data={{
                        labels: orderStats.map(stat => stat.period),
                        datasets: [
                          {
                            label: 'Orders',
                            data: orderStats.map(stat => stat.orderCount),
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: 'top' },
                          title: {
                            display: true,
                            text: `${selectedStatType.charAt(0).toUpperCase() + selectedStatType.slice(1)} Order Statistics`
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 }
                          }
                        }
                      }}
                    />
                  ) : (
                    <p>No statistics data available.</p>
                  )}
                </Tab>

                <Tab eventKey="orders" title="Orders">
                  <h4 className="small-title">MY ORDERS</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>ORDER</th>
                          <th>DATE</th>
                          <th>STATUS</th>
                          <th>TOTAL</th>
                          <th>ITEMS</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.orderId}>
                            <td>#{order.orderId}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.orderStatus || "Pending"}</td>
                            <td>€{order.totalAmount.toFixed(2)}</td>
                            <td>{order.orderDetails.length}</td>
                            <td>
                              <button className="uren-btn uren-btn_dark uren-btn_sm" onClick={() => handleViewDetails(order)}>View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab>

                <Tab eventKey="details" title="Account Details">
                  <form className="uren-form" onSubmit={handleUpdateUser}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>First Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.firstName}
                          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Last Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.lastName}
                          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Email*</label>
                        <input
                          type="email"
                          className="form-control"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.phoneNumber || ''}
                          onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label>Address Line</label>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.addresses[0]?.addressLine || ''}
                          onChange={(e) => {
                            const newAddresses = [...userData.addresses];
                            newAddresses[0] = { ...newAddresses[0], addressLine: e.target.value };
                            setUserData({ ...userData, addresses: newAddresses });
                          }}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.addresses[0]?.city || ''}
                          onChange={(e) => {
                            const newAddresses = [...userData.addresses];
                            newAddresses[0] = { ...newAddresses[0], city: e.target.value };
                            setUserData({ ...userData, addresses: newAddresses });
                          }}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Country</label>
                        <input
                          type="text"
                          className="form-control"
                          value={userData.addresses[0]?.country || ''}
                          onChange={(e) => {
                            const newAddresses = [...userData.addresses];
                            newAddresses[0] = { ...newAddresses[0], country: e.target.value };
                            setUserData({ ...userData, addresses: newAddresses });
                          }}
                        />
                      </div>

                      <div className="col-12">
                        <button type="submit" className="uren-btn uren-btn_dark">Update</button>
                      </div>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showOrderDetails && selectedOrder && (
        <div className="modal-background" onClick={handleCloseModal} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center',
          zIndex: 1050
        }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{
            background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto'
          }}>
            <h5>Order #{selectedOrder.orderId} Details</h5>
            <p>Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
            <p>Status: {selectedOrder.orderStatus}</p>
            <p>Total Amount: €{selectedOrder.totalAmount.toFixed(2)}</p>

            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.orderDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>€{item.price.toFixed(2)}</td>
                    <td>€{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="uren-btn uren-btn_dark" onClick={() => handleDeleteOrder(selectedOrder.orderId)}>
              Delete Order
            </button>
            <button className="uren-btn uren-btn_light ms-2" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Account;
