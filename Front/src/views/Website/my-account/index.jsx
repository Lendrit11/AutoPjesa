import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import '../../../assets/css/style.css'; // ruaj importet e tua siç janë
import Footer  from "../footer/index";

const Account = () => {
  const [key, setKey] = useState('dashboard');

  return (
    <div className="main-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Other</h2>
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
              {/* Sidebar navigation */}
              <div className="nav flex-column nav-pills">
                <button className={`nav-link ${key === 'dashboard' ? 'active' : ''}`} onClick={() => setKey('dashboard')}>Dashboard</button>
                <button className={`nav-link ${key === 'orders' ? 'active' : ''}`} onClick={() => setKey('orders')}>Orders</button>
                <button className={`nav-link ${key === 'address' ? 'active' : ''}`} onClick={() => setKey('address')}>Addresses</button>
                <button className={`nav-link ${key === 'details' ? 'active' : ''}`} onClick={() => setKey('details')}>Account Details</button>
                <button className={`nav-link ${key === 'logout' ? 'active' : ''}`} onClick={() => setKey('logout')}>Logout</button>
              </div>
            </div>

            <div className="col-lg-9 py-4">
              <Tabs id="account-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="d-none">
                <Tab eventKey="dashboard" title="Dashboard">
                  <p>Hello <b>Edwin Adams</b> (not Edwin Adams? <a href="/login-register">Sign out</a>)</p>
                  <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses and <a href="#">edit your password and account details</a>.</p>
                </Tab>

                <Tab eventKey="orders" title="Orders">
                  <h4 className="small-title">MY ORDERS</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr><th>ORDER</th><th>DATE</th><th>STATUS</th><th>TOTAL</th><th></th></tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#5364</td><td>Mar 27, 2019</td><td>On Hold</td><td>£162.00 for 2 items</td>
                          <td><button className="uren-btn uren-btn_dark uren-btn_sm">View</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Tab>

                <Tab eventKey="address" title="Addresses">
                  <p>The following addresses will be used on the checkout page by default.</p>
                  <div className="row">
                    <div className="col">
                      <h4>BILLING ADDRESS</h4>
                      <address>1234 Heaven Stress, Beverly Hill OldYork UnitedState of Lorem</address>
                    </div>
                    <div className="col">
                      <h4>SHIPPING ADDRESS</h4>
                      <address>1234 Heaven Stress, Beverly Hill OldYork UnitedState of Lorem</address>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="details" title="Account Details">
                  <form className="uren-form">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>First Name*</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Last Name*</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Email*</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Current Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="uren-btn uren-btn_dark">Save Changes</button>
                      </div>
                    </div>
                  </form>
                </Tab>

                <Tab eventKey="logout" title="Logout">
                  <p>You will be logged out. <a href="/login-register">Click here</a></p>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};



export default Account;
