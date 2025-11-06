// Importations React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages et layout principaux
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SearchResults from './pages/SearchResults';
import ErrorPage from './components/ErrorBoundary'; // Page d'erreur globale

/**
 * Définition des routes principales de l'application
 * --------------------------------------------------
 * React Router v6 avec createBrowserRouter :
 * - path : chemin de la route
 * - element : composant à afficher
 * - errorElement : composant affiché en cas d'erreur de rendu
 * - children : routes imbriquées
 */
const router = createBrowserRouter([
  {
    path: '/',             // Route racine
    element: <RootLayout />, // Layout global (Header + Footer + Outlet)
    errorElement: <ErrorPage />, // Gestionnaire d'erreurs global
    children: [
      { index: true, element: <Home /> },           // Page d'accueil
      { path: 'category/:id', element: <Category /> }, // Page catégorie dynamique
      { path: 'product/:id', element: <Product /> },   // Page produit dynamique
      { path: 'cart', element: <Cart /> },         // Page panier
      { path: 'checkout', element: <Checkout /> }, // Page checkout
      { path: 'search', element: <SearchResults /> }, // Page résultats de recherche
    ],
  },
]);

/**
 * Composant principal App
 * ----------------------
 * Fournit le routeur à l'application via RouterProvider
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
