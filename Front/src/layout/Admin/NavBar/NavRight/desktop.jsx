import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import './index.css';

const DesktopNavRight = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // ✅ Hiq token nga cookie
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // ✅ Hiq gjithashtu çdo info tjetër në localStorage/sessionStorage (nëse përdor)
      localStorage.clear();
      sessionStorage.clear();

      // ✅ Ridrejto përdoruesin te login
      navigate('/admin/login');

      // ✅ Opsionale: rifresko faqen
      window.location.reload();
    } catch (err) {
      console.error('Gabim gjatë logout:', err);
    }
  };

  return (
    <ul
      className="navbar-nav ml-auto"
      id="navbar-right"
      style={{ listStyle: 'none', padding: 0, margin: 0 }}
    >
      <li>
        <Dropdown align="end" className="drp-user">
          <Dropdown.Toggle
            as="div"
            style={{ cursor: 'pointer' }}
            className="no-caret-toggle"
          >
            <FiSettings size={18} />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="profile-notification">
            <ul
              className="pro-body"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              <li>
                <span
                  onClick={handleLogout}
                  className="dropdown-item"
                  style={{ cursor: 'pointer' }}
                >
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
