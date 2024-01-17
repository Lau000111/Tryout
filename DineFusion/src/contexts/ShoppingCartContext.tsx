// ShoppingCartContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';

type CartItem = {
  title: string;
  description: string;
  price: number;
  quantity: number;
};

type ExtendedItem = Item & {
  quantity: number;
};


type ShoppingCartProviderProps = {
    children: React.ReactNode;
  };

type ShoppingCartContextType = {
  items: ExtendedItem[];
  setItems: React.Dispatch<React.SetStateAction<ExtendedItem[]>>;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
};

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<ExtendedItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const calculateTotalAmount = () => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };
  
  useEffect(() => {
    calculateTotalAmount();
  }, [items]);

  return (
    <ShoppingCartContext.Provider value={{ items, setItems, totalAmount, setTotalAmount}}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = (): ShoppingCartContextType => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart muss innerhalb eines ShoppingCartProvider verwendet werden.');
  }
  return context;
};


