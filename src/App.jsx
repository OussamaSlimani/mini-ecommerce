import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import ErrorPage from './components/ErrorBoundary';
import Produit from './pages/Produit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category/:id', element: <Category /> },
      {
        path: 'product/:id',
        element: <Produit />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;