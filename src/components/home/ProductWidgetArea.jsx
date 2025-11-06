// Importation du composant enfant qui affiche une section de produits
import ProductWidget from './ProductWidget';

// Importation des hooks personnalisés pour récupérer différentes catégories de produits
import { useTopSellers } from '../../hooks/useTopSellers';          // Produits les plus vendus
import { useTopNew } from '../../hooks/useTopNew';                  // Nouveaux produits
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';  // Produits récemment consultés

// Composant principal : ProductWidgetArea
// Ce composant regroupe trois widgets (Top Sellers, Recently Viewed, Top New)
const ProductWidgetArea = () => {
  // Récupération des produits les plus vendus via le hook useTopSellers
  // data contient la liste des produits, isLoading indique si la requête est en cours
  const { data: topSellers = [], isLoading: loadingSellers } = useTopSellers();

  // Récupération des nouveaux produits via le hook useTopNew
  const { data: topNew = [], isLoading: loadingNew } = useTopNew();

  // Récupération des produits récemment consultés depuis le local storage ou un contexte
  const { items: recentlyViewed } = useRecentlyViewed();

  return (
    // Section englobante de la zone de widgets produits
    <section className="py-12 bg-gray-50">
      {/* Élément décoratif en bas (ex. : effet zigzag pour la séparation visuelle) */}
      <div className="zigzag-bottom"></div>

      {/* Conteneur principal centré */}
      <div className="container mx-auto px-4">
        {/* Grille responsive :
            - 1 colonne sur mobile
            - 3 colonnes sur les écrans moyens et grands */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* --- Widget 1 : Top Sellers --- */}
          <ProductWidget
            title="Top Sellers"            // Titre affiché dans le widget
            items={topSellers}             // Liste de produits à afficher
            isLoading={loadingSellers}     // Indicateur de chargement
            type="top-sellers"             // Type pour personnaliser le comportement ou le style
          />

          {/* --- Widget 2 : Recently Viewed --- */}
          <ProductWidget
            title="Recently Viewed"
            items={recentlyViewed}         // Produits stockés localement ou suivis récemment
            isLoading={false}              // Pas de chargement nécessaire ici
            type="recently-viewed"
          />

          {/* --- Widget 3 : Top New --- */}
          <ProductWidget
            title="Top New"
            items={topNew}                 // Nouveaux produits
            isLoading={loadingNew}
            type="top-new"
          />
        </div>
      </div>
    </section>
  );
};

// Exportation du composant pour utilisation dans d'autres pages (ex. page d’accueil)
export default ProductWidgetArea;
