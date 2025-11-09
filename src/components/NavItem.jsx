import { NavLink } from "react-router-dom";

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-3 py-3 transition-all duration-200 font-medium uppercase tracking-wider
        ${
          isActive
            ? "bg-[#5a88ca] text-white shadow-lg scale-105"
            : "text-gray-700 hover:bg-blue-50 hover:text-[#5a88ca]"
        }`
    }
    end
  >
    {label}
  </NavLink>
);

export default NavItem;
