import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import NavLeft from './NavLeft';
import DesktopNavRight from './NavRight/desktop';
import MobileNavRight from './NavRight/index';
import { FiMoreVertical } from 'react-icons/fi';
import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const configContext = useContext(ConfigContext);
  const { collapseMenu, headerFixedLayout, layout } = configContext.state;
  const { dispatch } = configContext;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg'];
  if (headerFixedLayout && layout === 'vertical') {
    headerClass.push('headerpos-fixed');
  }

  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  return (
    <>
      <header className={headerClass.join(' ')}>
        <div className="m-header">
          <Link to="#" className={`mobile-menu ${collapseMenu ? 'on' : ''}`} id="mobile-collapse" onClick={navToggleHandler}>
            <span />
          </Link>
          <Link to="#" className="b-brand">
            <span className="b-title">FixFlow-Auto</span>
          </Link>
          {isMobile && (
            <Link to="#" className="mob-toggler" onClick={() => setShowModal(true)}>
              <FiMoreVertical size={20} />
            </Link>
          )}
        </div>
        <div style={{ justifyContent: 'space-between' }} className="collapse navbar-collapse">
          <NavLeft />
          {!isMobile && <DesktopNavRight />}
        </div>
      </header>

      {/* MODAL for Mobile Only */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="navright-modal">
        <Modal.Body>
          <MobileNavRight onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
