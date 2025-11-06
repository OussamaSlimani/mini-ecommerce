import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';

const OtherBrandsSidebar = ({ currentCategoryId }) => {
  const { data: categories = [], isLoading } = useCategories();

  const otherBrands = categories.filter(cat => cat.id !== currentCategoryId).slice(0, 5);

  if (isLoading || otherBrands.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <h2 className="text-2xl font-semibold text-orange-400 uppercase mb-4">Other Brands</h2>
      <ul className="space-y-2">
        {otherBrands.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/category/${cat.id}`}
              className="block text-gray-600 hover:text-blue-600 transition-colors"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OtherBrandsSidebar;