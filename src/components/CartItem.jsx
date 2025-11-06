// Importation de l’icône "poubelle" (Trash2) depuis la librairie lucide-react
import { Trash2 } from 'lucide-react';

// --- Composant : CartItem ---
// Ce composant représente un produit individuel dans le panier.
// Il affiche :
// - L’image du produit
// - Son nom et son prix unitaire
// - Une zone pour modifier la quantité
// - Un bouton pour le supprimer du panier
// - Le total du prix pour cet article (prix unitaire × quantité)
const CartItem = ({ item, onUpdate, onRemove }) => {

  // Construction du chemin vers l’image du produit
  const imageUrl = `/products/${item.imageName}`;

  return (
    <div className="flex gap-4 py-4 border-b">
      
      {/* --- Image du produit --- */}
      <img 
        src={imageUrl} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded" 
      />

      {/* --- Informations sur le produit --- */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">${item.price} each</p>
      </div>

      {/* --- Section quantité et suppression --- */}
      <div className="flex items-center gap-2">
        {/* Champ de saisie pour modifier la quantité */}
        <input
          type="number"
          value={item.qty}
          onChange={(e) => 
            // Appelle la fonction onUpdate avec l’ID du produit et la nouvelle quantité
            onUpdate(item.id, parseInt(e.target.value) || 1)
          }
          min="1" // Empêche d’entrer une valeur négative ou zéro
          className="w-16 px-2 py-1 border rounded text-center"
        />

        {/* Bouton de suppression de l’article */}
        <button
          onClick={() => onRemove(item.id)} // Appelle la fonction de suppression
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" /> {/* Icône de poubelle */}
        </button>
      </div>

      {/* --- Total de cet article --- */}
      <div className="text-right font-semibold">
        ${(item.price * item.qty).toFixed(2)} {/* Calcul dynamique du sous-total */}
      </div>
    </div>
  );
};

// Exportation du composant pour l’utiliser dans le panier
export default CartItem;
