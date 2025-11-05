import { useState } from 'react';

const ProductImageGallery = ({ mainImage, thumbnails = [] }) => {
  const [selected, setSelected] = useState(mainImage);

  return (
    <div className="space-y-4">
      <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={selected}
          alt="Main product"
          className="w-full h-full object-cover"
        />
      </div>

      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {[mainImage, ...thumbnails].map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(img)}
              className={`aspect-w-1 aspect-h-1 rounded border-2 transition-all ${
                selected === img ? 'border-blue-600' : 'border-gray-300'
              } overflow-hidden`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;