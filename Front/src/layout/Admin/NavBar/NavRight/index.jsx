import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';

const MobileNavRight = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      navigate('/login/signin');
      if (onClose) onClose();
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
