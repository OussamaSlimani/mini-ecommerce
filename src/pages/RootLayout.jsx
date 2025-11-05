import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RootLayout = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default RootLayout;