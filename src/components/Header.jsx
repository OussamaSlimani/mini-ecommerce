import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { initializeCart } from "../store/cartSlice";
import Navbar from "./Navbar";
import { useState, useEffect ,useRef } from "react";
import logo from "../assets/img/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      dispatch(initializeCart());
    }
  }, [dispatch]);


  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchTerm("");
    }
  };

  const itemCount = cart?.items?.length || 0;
  const total = cart?.total ? Number(cart.total).toFixed(2) : "0.00";
  const hideNavSearchbar =
    location.pathname === "/cart" ||
    location.pathname === "/checkout" ||
    location.pathname.startsWith("/search");

  return (
    <header className="container mx-auto px-4">
      <div className="flex items-center justify-between gap-4 py-3">
        <div className="flex-shrink-0">
          <Link to="/" className="block w-20 h-20 sm:w-28 sm:h-28">
            <img
              src={logo}
              alt="MyStore Logo"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
        {!hideNavSearchbar && (
          <div className="hidden sm:flex flex-1 max-w-md w-full">
            <form onSubmit={handleSearch} className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5a88ca] focus:border-transparent transition"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="px-6 py-2 text-white font-medium bg-[#5a88ca] hover:bg-[#4c77b5] transition duration-200"
              >
                SEARCH
              </button>
            </form>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-gray-700 hover:text-[#5a88ca] transition group border border-gray-700 p-3 shadow-sm hover:shadow-md"
          >
            <span className="font-medium hidden sm:inline">Cart:</span>
            <span className="font-bold text-[#5a88ca]">
              {isLoading ? "..." : `${total} €`}
            </span>
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span
              className={`
                absolute -top-2 -right-2
                flex items-center justify-center
                w-6 h-6 text-xs font-bold text-white
                bg-[#5a88ca] rounded-full
                ring-2 ring-white shadow-sm
                ${isLoading ? "animate-pulse" : ""}
              `}
            >
              {isLoading ? "" : itemCount}
            </span>
          </Link>
          {!hideNavSearchbar && (
            <button
              className="sm:hidden p-2 text-gray-700 hover:text-[#5a88ca] transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
        </div>
      </div>
      {!hideNavSearchbar && (
        <div className="sm:hidden mb-2">
          <form onSubmit={handleSearch} className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5a88ca] focus:border-transparent transition rounded"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white font-medium bg-[#5a88ca] hover:bg-[#4c77b5] transition duration-200 rounded"
            >
              SEARCH
            </button>
          </form>
        </div>
      )}
      {!hideNavSearchbar && (
        <div className={`sm:block ${mobileMenuOpen ? "block" : "hidden"} mb-2`}>
          <Navbar />
        </div>
      )}
    </header>
  );
};

export default Header;