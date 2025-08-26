import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import NavLeft from './NavLeft';
import DesktopNavRight from './NavRight/desktop';
import MobileNavRight from './NavRight/index';
import { FiMoreVertical } from 'react-icons/fi';
import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';
import useWindowSize from '../../../hooks/useWindowSize';
import './menu.css';
const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const configContext = useContext(ConfigContext);
  const { collapseMenu, headerFixedLayout, layout } = configContext.state;
  const { dispatch } = configContext;

  const { width } = useWindowSize();
  const isMobile = width < 768;

  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg'];
  if (headerFixedLayout && layout === 'vertical') {
    headerClass.push('headerpos-fixed');
  }

  return (
    <>
      <header className={headerClass.join(' ')}>
        <div className="m-header">
          {/* Hamburger menu (left toggle) */}
          <Link
            to="#"
            className={`mobile-menu ${collapseMenu ? 'on' : ''}`}
            id="mobile-collapse"
            onClick={navToggleHandler}
          >
            <span />
          </Link>

          {/* Logo or Brand Title */}
          <Link to="#" className="b-brand">
            <span className="b-title">FixFlow-Auto</span>
          </Link>

          {/* Hamburger icon (right side) */}
          {isMobile && (
            <Link to="#" className="mob-toggler" onClick={() => setShowModal(true)}>
              <FiMoreVertical size={24} />
            </Link>
          )}
        </div>

        {/* Navigation left & right sections */}
        <div style={{ justifyContent: 'space-between' }} className="collapse navbar-collapse">
          <NavLeft />
          {!isMobile && <DesktopNavRight />}
        </div>
      </header>

      {/* MODAL for Mobile Menu */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="navright-modal"
      >
        <Modal.Body>
          <MobileNavRight onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
