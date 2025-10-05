import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';

const MobileNavRight = ({ onClose }) => {
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
    <div className="navright-quick-menu">
      <div className="pro-head mb-2">
        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Profili</span>
      </div>
      <ListGroup variant="flush">
        <ListGroup.Item action as={Link} to="/officer/app/profile/default" onClick={onClose}>
          <FiUser size={16} style={{ marginRight: '8px' }} />
          Profili
        </ListGroup.Item>
        <ListGroup.Item action onClick={handleLogout}>
          <FiLogOut size={16} style={{ marginRight: '8px' }} />
          Log out
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default MobileNavRight;
