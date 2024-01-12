import React from 'react';
import { IonItem, IonLabel, IonNote, IonButton, IonIcon } from '@ionic/react';
import { add, addCircleOutline } from 'ionicons/icons';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

interface MenuItemProps {
  item: MenuItem;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {

  const { items, setItems } = useShoppingCart();

  const addToCart = () => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((cartItem) => cartItem.title === item.title);
      if (existingItemIndex > -1) {
        const updatedItems = currentItems.slice();
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        return [...currentItems, { ...item, quantity: 1 }];
      }
    });
  };


  const glassEffectStyle = {
    background: 'rgba(255, 255, 255, 0.21)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(3.9px)',
    WebkitBackdropFilter: 'blur(3.9px)',
    border: '1px solid rgba(255, 255, 255, 0.01)',
  };

  return (
    <IonItem lines="none" style={glassEffectStyle} className="mb-2">
      <IonLabel className="ion-text-wrap">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </IonLabel>
      <div className="flex flex-col justify-center items-end">
        <IonNote className="text-lg">
          {item.price.toFixed(2)} €
        </IonNote>
      </div>

      <IonButton
        fill="clear"
        style={{ color: '#C5E1A5' }}
        onClick={addToCart}
      >
        <IonIcon icon={addCircleOutline} className="text-4xl" />
      </IonButton>
    </IonItem>
  );
};

export default MenuItem;
