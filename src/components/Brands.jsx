export function Brands() {
  const brands = [
    { id: 1, src: '/src/assets/img/brand/brand1.png', alt: 'Brand 1' },
    { id: 2, src: '/src/assets/img/brand/brand2.png', alt: 'Brand 2' },
    { id: 3, src: '/src/assets/img/brand/brand3.png', alt: 'Brand 3' },
    { id: 4, src: '/src/assets/img/brand/brand4.png', alt: 'Brand 4' },
    { id: 5, src: '/src/assets/img/brand/brand5.png', alt: 'Brand 5' },
    { id: 6, src: '/src/assets/img/brand/brand6.png', alt: 'Brand 6' },
    { id: 7, src: '/src/assets/img/brand/brand1.png', alt: 'Brand 1' },
    { id: 8, src: '/src/assets/img/brand/brand2.png', alt: 'Brand 2' },
  ];

  return (
    <div className="brands-area bg-gray-50 py-8">
      <div className="zigzag-bottom"></div>
      <div className="container mx-auto px-4">
        <div className="brand-wrapper overflow-hidden">
          <div className="brand-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
            {brands.map((brand) => (
              <img
                key={brand.id}
                src={brand.src}
                alt={brand.alt}
                className="h-50 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
