import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import './index.css';
const DesktopNavRight = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      navigate('/login/signin');
    } catch (err) {
      console.error('Gabim gjatë logout:', err);
    }
  };

  return (
    <ul className="navbar-nav ml-auto" id="navbar-right" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <li>
        <Dropdown align="end" className="drp-user">
          <Dropdown.Toggle as="div" style={{ cursor: 'pointer' }} className="no-caret-toggle">
            <FiSettings size={18} />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="profile-notification">
            <div className="pro-head">
              <span>Profili</span>
            </div>
            <ul className="pro-body" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link to="/officer/app/profile/default" className="dropdown-item">
                  <FiUser size={16} style={{ marginRight: '8px' }} />
                  Profili
                </Link>
              </li>
              <li>
                <span onClick={handleLogout} className="dropdown-item" style={{ cursor: 'pointer' }}>
                  <FiLogOut size={16} style={{ marginRight: '8px' }} />
                  Log out
                </span>
              </li>
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </ul>
  );
};

export default DesktopNavRight;
