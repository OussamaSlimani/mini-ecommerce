
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
      <div className="container px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">

          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28">
              <a href="/" className="block w-full h-full">
                <img
                  src="../src/assets/img/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-md w-full">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200">
                Search
              </button>
            </div>
          </div>

          <div className="flex-shrink-0">
            <a
              href="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition group border p-3"
            >
              <span className="font-medium">Cart:</span>
              <span className="font-bold text-blue-600">100.58 €</span>
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                5
              </span>
            </a>
          </div>
          
        </div>
      </div>
  );
};

export default Header;