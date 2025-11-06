// Composant Brands : affiche une grille de logos de marques partenaires
export function Brands() {
  // Tableau contenant la liste des marques avec leur id, chemin d'image et texte alternatif
  const brands = [
    { id: 1, src: '../../src/assets/img/brand/brand1.png', alt: 'Brand 1' },
    { id: 2, src: '/src/assets/img/brand/brand2.png', alt: 'Brand 2' },
    { id: 3, src: '/src/assets/img/brand/brand3.png', alt: 'Brand 3' },
    { id: 4, src: '/src/assets/img/brand/brand4.png', alt: 'Brand 4' },
    { id: 5, src: '/src/assets/img/brand/brand5.png', alt: 'Brand 5' },
    { id: 6, src: '/src/assets/img/brand/brand6.png', alt: 'Brand 6' },
    { id: 7, src: '/src/assets/img/brand/brand1.png', alt: 'Brand 1' },
    { id: 8, src: '/src/assets/img/brand/brand2.png', alt: 'Brand 2' },
  ];

  return (
    // Section principale du composant avec un espacement vertical
    <div className="py-8">
      {/* Conteneur centré avec marges latérales */}
      <div className="container mx-auto px-4">
        
        {/* Wrapper pour la liste des marques */}
        <div className="brand-wrapper overflow-hidden">
          
          {/* Grille responsive : 
              - 2 colonnes sur mobile
              - 3 colonnes sur petit écran
              - 4 colonnes sur moyen et grand écran */}
          <div className="brand-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
            
            {/* Boucle sur le tableau "brands" pour afficher chaque logo */}
            {brands.map((brand) => (
              <img
                key={brand.id} // Clé unique pour chaque élément dans la liste
                src={brand.src} // Source de l’image du logo
                alt={brand.alt} // Texte alternatif pour l’accessibilité
                className="h-50 w-auto object-contain" // Taille du logo adaptée et non déformée
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
