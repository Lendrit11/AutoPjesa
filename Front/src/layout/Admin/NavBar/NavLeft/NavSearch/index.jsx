import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../../hooks/useWindowSize';

const NavSearch = () => {
  const { width: windowWidth } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchString(windowWidth < 600 ? '100px' : '');
    }
  }, [windowWidth, isOpen]);

  const searchOnHandler = () => {
    setIsOpen(true);
    setSearchString('100px');
  };

  const searchOffHandler = () => {
    setIsOpen(false);
    setSearchString('0');
  };

  let searchClass = ['main-search'];
  if (isOpen) searchClass.push('open');

  return (
    <div id="main-search" className={searchClass.join(' ')}>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search . . ." style={{ width: searchString }} />
        <Link to="#" className="input-group-append search-close" onClick={searchOffHandler}>
          <i className="feather icon-x input-group-text" />
        </Link>
        <span
          role="button"
          tabIndex="0"
          className="input-group-append search-btn btn btn-primary"
          onClick={searchOnHandler}
          style={{ borderRadius: '50%', marginLeft: 5 }}
        >
          <i className="feather icon-search input-group-text" />
        </span>
      </div>
    </div>
  );
};

export default NavSearch;
