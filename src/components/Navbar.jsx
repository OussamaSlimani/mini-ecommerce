
import { useCategories } from '../hooks/useCategory';
import NavItem from './NavItem';
import NavSkeleton from './NavSkeleton';

const Navbar = () => {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) return <NavSkeleton />;
  if (error) return <div className="text-red-500 text-center py-2">Failed to load categories</div>;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-6 md:gap-8 py-4 text-sm sm:text-base font-medium">
            <li key="home">
              <NavItem to="/" label="Home" />
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <NavItem to={`/category/${cat.id}`} label={cat.name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default Navbar; 