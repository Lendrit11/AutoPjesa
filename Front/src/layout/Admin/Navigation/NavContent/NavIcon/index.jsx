import PropTypes from 'prop-types';
import React from 'react';

const NavIcon = ({ items }) => {
  if (!items.icon) return null;

  return (
    <span className="pcoded-micon">
      {items.icon}
    </span>
  );
};

NavIcon.propTypes = {
  items: PropTypes.object.isRequired
};

export default NavIcon;
