// Importation du hook useState de React
import { useState } from 'react';

// --- Composant : ProductImageGallery ---
// Ce composant affiche une galerie d'images pour un produit :
// - Une image principale (affichée en grand)
// - Plusieurs miniatures cliquables pour changer l’image principale
const ProductImageGallery = ({ mainImage, thumbnails = [] }) => {
  
  // État local pour suivre l’image actuellement sélectionnée
  const [selected, setSelected] = useState(mainImage);

  // Fusionne l’image principale et les miniatures,
  // tout en évitant les doublons (si mainImage est déjà dans thumbnails)
  const allImages = [mainImage, ...thumbnails.filter(img => img !== mainImage)];

  return (
    <div className="space-y-6">
      
      {/* --- Zone d’affichage de l’image principale --- */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-xl overflow-hidden shadow-sm">
        <img
          src={selected} // affiche l’image actuellement sélectionnée
          alt="Selected product view"
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* --- Liste des miniatures --- */}
      {/* Affichée uniquement s’il y a plus d’une image à présenter */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          
          {/* Boucle sur toutes les images disponibles */}
          {allImages.map((img, index) => (
            <button
              key={index}
              // Lorsqu'on clique, on change l’image sélectionnée
              onClick={() => setSelected(img)}

              // Classes Tailwind pour le style, l’interaction et la mise en évidence
              className={`
                relative aspect-square rounded-lg overflow-hidden transition-all duration-200
                ring-2 ring-offset-2 focus:outline-none focus:ring-blue-500
                ${selected === img 
                  ? 'ring-blue-600 shadow-md'  // met en évidence l’image sélectionnée
                  : 'ring-transparent hover:ring-blue-300' // effet hover sur les autres
                }
              `}
              aria-label={`View image ${index + 1}`} // accessibilité
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

// Exportation du composant pour utilisation ailleurs
export default ProductImageGallery;
