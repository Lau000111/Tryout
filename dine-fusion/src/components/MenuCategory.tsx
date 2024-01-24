import React from 'react';
import { IonListHeader } from '@ionic/react';

interface MenuCategoryProps {
  type: string;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ type }) => {
  return (
    <IonListHeader>
      {type}
    </IonListHeader>
  );
};

export default MenuCategory;
