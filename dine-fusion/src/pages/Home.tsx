import React, { useState, FC, useRef, useEffect } from 'react';
import {
  IonContent, IonPage, IonButton, IonButtons, IonMenuButton,IonIcon, IonFab
} from '@ionic/react';
import { arrowBack, languageOutline, person } from 'ionicons/icons';
import MenuItem from '../components/MenuItem';
import menuDataDe from '../menuData_de.json';
import menuDataEn from '../menuData_en.json';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useHistory } from 'react-router-dom';
import CategoryScroller from '../components/CategoryScroller';
import { getDishes } from '../api/route';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

const Home: FC = () => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'de'
  );

  const [dishes, setDishes] = useState<Dish[]>([]);
  console.log(t('main.header'));
  const [isLoading, setIsLoading] = useState(true);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        const dishesData = await getDishes();
        setDishes(dishesData);
        setSelectedCategory(dishesData[0]);
        setIsLoading(false); 
      } catch (error) {
        console.error('Fehler beim Laden der Gerichte:', error);
        setIsLoading(false); 
      }
    };
    fetchData();
  }, []);

  const [menuData, setMenuData] = useState<MenuData>(menuDataDe.categories);
  const { items } = useShoppingCart();
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<Dish>(dishes[0]);

  useEffect(() => {
    const newMenuData = language === 'de' ? menuDataDe.categories : menuDataEn.categories;
    setMenuData(newMenuData);
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const categories = dishes.map(dish => dish.name);

  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  const filteredDishes = dishes
  .filter(dish => dish.name === selectedCategory.name)
  .flatMap(dish => dish.items);

  console.log("selectedCategory",dishes);


  if (isLoading) {
    return <div>Lädt...</div>;
  }
  
  return (
    <>
      <IonPage>
        <div className="flex items-center" id="main-content">
          <CategoryScroller
            categories={dishes}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

        </div>
        <IonContent>
        {filteredDishes.map((item, index) => (
          <MenuItem
            key={index}
            item={item} 
          />
        ))}

        </IonContent>
        {cartItemCount > 0 && (
          <IonFab>
          <IonButton
            className="cart-button"
            fill="clear"
            onClick={() => history.push('/cart')}>
            🛒 {cartItemCount}
          </IonButton>
          </IonFab>
        )}

      </IonPage>
    </>
  );
};


export default Home;
