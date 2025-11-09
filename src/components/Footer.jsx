import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategory";

const Footer = () => {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <footer className="bg-neutral-800 text-gray-300">
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-3xl font-light text-white mb-4">
                <span className="text-blue-500">MyStore</span>
              </h2>
              <p className="text-sm leading-relaxed">
                SES Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perferendis sunt id doloribus vero quam laborum quas alias
                dolores blanditiis iusto consequatur, modi aliquid eveniet
                eligendi iure eaque ipsam iste, pariatur omnis sint! Suscipit,
                debitis, quisquam. Laborum commodi veritatis magni at?
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-light text-white mb-4">
                Categories
              </h2>
              <ul className="space-y-2">
                {isLoading ? (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <li
                        key={i}
                        className="h-6 bg-gray-700 rounded animate-pulse"
                      ></li>
                    ))}
                  </>
                ) : (
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/category/${cat.id}`}
                        className="block py-1 text-gray-400 hover:text-green-400 transition-colors border-b border-dashed border-gray-600"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-light text-white mb-4">
                Newsletter
              </h2>
              <p className="text-sm mb-6">
                Sign up to our newsletter and get exclusive deals you won’t find
                anywhere else straight to your inbox!
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Type your email"
                  className="w-full px-4 py-3 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold uppercase rounded border border-blue-500 hover:bg-gray-800 hover:border-gray-600 transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
