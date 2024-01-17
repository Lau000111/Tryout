import React, { useState, FC, useRef, useEffect } from 'react';
import {
  IonContent, IonPage, IonButton, IonButtons, IonMenuButton,IonIcon, IonFabButton
} from '@ionic/react';
import { arrowBack, languageOutline, person } from 'ionicons/icons';
import MenuItem from '../components/MenuItem';
import menuDataDe from '../menuData_de.json';
import menuDataEn from '../menuData_en.json';

import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useHistory } from 'react-router-dom';
import CategoryScroller from '../components/CategoryScroller';
import { getDishes } from '../api/route';

const Home: FC = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'de'
  );

  const [dishes, setDishes] = useState<Dish[]>([]);

  const [isLoading, setIsLoading] = useState(true); // Neuer State für Loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Setze Loading zu Beginn des Ladens
        const dishesData = await getDishes();
        setDishes(dishesData);
        setSelectedCategory(dishesData[0]);
        setIsLoading(false); // Beende Loading nach dem Laden
      } catch (error) {
        console.error('Fehler beim Laden der Gerichte:', error);
        setIsLoading(false); // Beende Loading auch im Fehlerfall
      }
    };
    fetchData();
  }, []);

  const [menuData, setMenuData] = useState<MenuData>(menuDataDe.categories);
  const { items } = useShoppingCart();
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<Dish>(dishes[0]);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

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
