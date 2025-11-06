import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import ErrorPage from './components/ErrorBoundary';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SearchResults from './pages/SearchResults';

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
        element: <Product />
      },
       {
        path: 'cart',
        element: <Cart />
      },
      {
  path: 'checkout',
  element: <Checkout />
},
{
  path: 'search',
  element: <SearchResults />
}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;