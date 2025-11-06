import { Trash2 } from 'lucide-react';

const CartItem = ({ item, onUpdate, onRemove }) => {
  const imageUrl = `/products/${item.imageName}`;

  return (
    <div className="flex gap-4 py-4 border-b">
      <img src={imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">${item.price} each</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={item.qty}
          onChange={(e) => onUpdate(item.id, parseInt(e.target.value) || 1)}
          min="1"
          className="w-16 px-2 py-1 border rounded text-center"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="text-right font-semibold">
        ${(item.price * item.qty).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;