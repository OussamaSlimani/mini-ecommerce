// Importation de NavLink depuis react-router-dom
// NavLink est comme Link, mais il fournit une classe spéciale si le lien correspond à la route actuelle
import { NavLink } from 'react-router-dom';

// Composant réutilisable pour un élément de navigation (un seul lien)
const NavItem = ({ to, label }) => (
  <NavLink
    // Propriété `to` : définit la route vers laquelle le lien pointe
    to={to}

    // Fonction qui permet de définir dynamiquement la classe CSS selon si le lien est actif ou non
    className={({ isActive }) =>
      `
      block px-3 py-3 transition-all duration-200 font-medium uppercase tracking-wider
      ${
        // Si la route est active → couleur principale, fond coloré, effet d’ombre et légère mise en avant
        isActive
          ? 'bg-[#5a88ca] text-white shadow-lg scale-105'
          // Sinon → texte gris avec effet au survol
          : 'text-gray-700 hover:bg-blue-50 hover:text-[#5a88ca]'
      }
      `
    }

    // `end` : empêche les sous-routes de garder le lien actif (utile pour "/" par exemple)
    end
  >
    {/* Affiche le texte du lien (ex: "Home", "Shop", etc.) */}
    {label}
  </NavLink>
);

export default NavItem;
