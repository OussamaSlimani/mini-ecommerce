import ProductWidget from './ProductWidget';
import { useTopSellers } from '../hooks/useTopSellers';
import { useTopNew } from '../hooks/useTopNew';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

const ProductWidgetArea = () => {
  const { data: topSellers = [], isLoading: loadingSellers } = useTopSellers();
  const { data: topNew = [], isLoading: loadingNew } = useTopNew();
  const { items: recentlyViewed } = useRecentlyViewed();

  return (
    <section className="py-12 bg-gray-50">
      <div className="zigzag-bottom"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductWidget
            title="Top Sellers"
            items={topSellers}
            isLoading={loadingSellers}
            type="top-sellers"
          />

          <ProductWidget
            title="Recently Viewed"
            items={recentlyViewed}
            isLoading={false}
            type="recently-viewed"
          />

          <ProductWidget
            title="Top New"
            items={topNew}
            isLoading={loadingNew}
            type="top-new"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductWidgetArea;