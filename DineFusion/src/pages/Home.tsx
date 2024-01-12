import React, { useState, FC, useRef, useEffect } from 'react';
import {
  IonContent, IonPage, IonButton, IonButtons, IonMenuButton,IonIcon,
} from '@ionic/react';
import { arrowBack, languageOutline, person } from 'ionicons/icons';
import MenuItem from '../components/MenuItem';
import menuDataDe from '../menuData_de.json';
import menuDataEn from '../menuData_en.json';

import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useHistory } from 'react-router-dom';
import CategoryScroller from '../components/CategoryScroller';

const Home: FC = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'de'
  );
  const [menuData, setMenuData] = useState<MenuData>(menuDataDe.categories);
  const { items } = useShoppingCart();
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(menuDataDe.categories)[0]);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  useEffect(() => {
    const newMenuData = language === 'de' ? menuDataDe.categories : menuDataEn.categories;
    setMenuData(newMenuData);
    setSelectedCategory(Object.keys(newMenuData)[0]);
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const categories = Object.keys(menuData);

  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      <IonPage>
        <div className="flex items-center" id="main-content">
          <CategoryScroller
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

        </div>
        <IonContent>
          {menuData[selectedCategory as keyof MenuData]
            .map((item) => (
              <MenuItem
                key={item.id}
                item={item}
              />
            ))
          }
        </IonContent>
        {cartItemCount > 0 && (
          <IonButton
            className="cart-button"
            fill="clear"
            onClick={() => history.push('/cart')}>
            🛒 {cartItemCount}
          </IonButton>
        )}

      </IonPage>
    </>
  );
};

export default Home;
