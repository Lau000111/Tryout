import React from 'react';

interface Item {
  title: string;
  price: number;
  quantity: number;
}

interface ShoppingCartItemProps {
  item: Item;
  onDelete: () => void;
  onQuantityChange: (quantity: number) => void;
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ item, onDelete, onQuantityChange }) => {

  const increaseQuantity = () => {
    onQuantityChange(item.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.quantity - 1);
    } else {
      onDelete();
    }
  };

  return (
    <div className="flex items-center p-2 border-b border-gray-200">
      {/* Wenn du Bilder verwenden möchtest, könntest du sie hier einfügen. */}
      {/* <img src="YOUR_IMAGE_URL" className="w-15 h-15 rounded-full" alt="item" /> */}

      <div className="flex-grow ml-4">
        <p className="text-lg font-medium">{item.title}</p>
        <p className="text-gray-500">{item.price.toFixed(2)}€</p>

        <div className="flex items-center">
          <button onClick={decreaseQuantity} className="px-4 py-1 text-2xl">
            -
          </button>
          <span className="mx-4 text-lg">{item.quantity}</span>
          <button onClick={increaseQuantity} className="px-4 py-1 text-2xl">
            +
          </button>
        </div>
      </div>

      <button onClick={onDelete} className="p-2">
        <span className="text-xl">🗑️</span>
      </button>
    </div>
  );
};

export default ShoppingCartItem;
