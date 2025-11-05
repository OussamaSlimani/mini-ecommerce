import { NavLink } from 'react-router-dom';

const NavItem = ({ to, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md transition-all duration-200
        ${isActive
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
        }`
      }
      end
    >
      {label}
    </NavLink>
  </li>
);


export default NavItem;