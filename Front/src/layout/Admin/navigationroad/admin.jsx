import { FiActivity  , } from 'react-icons/fi';
import {  FiBox } from 'react-icons/fi';
import {  FiBook   } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';
const iconStyle = { color: 'white' };
const managerMenu = {
    items: [
      {
        id: 'navigation',
        type: 'group',
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            icon: <FiActivity style={iconStyle} />,
            url: '/admin/dashboard'
          },
                  {
            id: 'Orders',
            title: 'Orders',
            type: 'item',
            icon: <FiBook style={iconStyle} />,
            url: '/admin/orders'
          },
          {
            id: 'Supply',
            title: 'Supply ',
            type: 'item',
            icon: <FiBox style={iconStyle} />,
            url: '/admin/supply'
          },
          {
            id: 'Blog',
            title: 'Blog ',
            type: 'item',
            icon: <FiBox style={iconStyle} />,
            url: '/admin/Blog'
          },
          {
            id: 'Users',
            title: 'Users ',
            type: 'item',
            icon: <FiUsers style={iconStyle} />,
            url: '/admin/user'
          }

        ]
      },
      
    ]
  };
  
  export default managerMenu;