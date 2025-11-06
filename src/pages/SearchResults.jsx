import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import ProductCard from '../components/Category/ProductCard.jsx';
import { Search } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, isLoading, searchQuery, setSearchQuery, total } = useSearch(query);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Search Results
            </h1>
          </div>
          <p className="text-gray-600">
            {isLoading ? 'Searching...' : `${total} product${total !== 1 ? 's' : ''} found`}
            {query && ` for "${query}"`}
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to refine search..."
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isLoading ? (
          <LoadingGrid />
        ) : products.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const LoadingGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
    ))}
  </div>
);

const EmptyState = ({ query }) => (
  <div className="text-center py-20">
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6"></div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No products found
    </h3>
    <p className="text-gray-500">
      {query ? `We couldn't find anything for "${query}"` : 'Try searching for a product'}
    </p>
  </div>
);

export default SearchResults;