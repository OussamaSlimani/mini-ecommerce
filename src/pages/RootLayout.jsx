// Importations
import { Outlet } from 'react-router-dom'; // Affiche les routes enfants dans le layout
import ErrorBoundary from '../components/ErrorBoundary'; // Composant pour capturer les erreurs
import Footer from '../components/Footer'; // Pied de page
import Header from '../components/Header'; // En-tête du site

/**
 * Composant : RootLayout
 * ----------------------
 * Layout principal de l'application.
 * Il englobe :
 * - Header
 * - Footer
 * - Contenu dynamique via <Outlet /> pour les routes enfants
 * - Gestion des erreurs via ErrorBoundary
 */
const RootLayout = () => {
  return (
    // ErrorBoundary permet de capturer et afficher les erreurs de rendu dans le layout ou les pages enfants
    <ErrorBoundary>
      <div className="min-h-screen"> {/* S'assure que la page prend au moins toute la hauteur de l'écran */}
        {/* Header global */}
        <Header />

        {/* Contenu principal des pages */}
        <main>
          <Outlet /> {/* Les pages enfants définies dans le routeur s'affichent ici */}
        </main>

        {/* Footer global */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default RootLayout;
