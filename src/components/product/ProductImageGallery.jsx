import { useState } from 'react';

const ProductImageGallery = ({ mainImage, thumbnails = [] }) => {
  const [selected, setSelected] = useState(mainImage);
  const allImages = [mainImage, ...thumbnails.filter(img => img !== mainImage)]; // Avoid duplicates

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-xl overflow-hidden shadow-sm">
        <img
          src={selected}
          alt="Selected product view"
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(img)}
              className={`
                relative aspect-square rounded-lg overflow-hidden transition-all duration-200
                ring-2 ring-offset-2 focus:outline-none focus:ring-blue-500
                ${selected === img 
                  ? 'ring-blue-600 shadow-md' 
                  : 'ring-transparent hover:ring-blue-300'
                }
              `}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={img}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;