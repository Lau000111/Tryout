import { useState, FC, useEffect } from 'react';
import {
  IonContent, IonPage, IonButton, IonFab, IonToast
} from '@ionic/react';
import MenuItem from '../components/MenuItem';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useHistory } from 'react-router-dom';
import CategoryScroller from '../components/CategoryScroller';
import { getDishes } from '../api/route';
import { useTranslation } from 'react-i18next';
import SpinnerComponent from '../components/SpinnerComponent';
import { globe } from 'ionicons/icons';

const Home: FC = () => {
  const { t } = useTranslation();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);


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
        setShowToast(true);
      }
    };
    fetchData();
  }, []);

  const { items } = useShoppingCart();
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<Dish>(dishes[0]);

  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  const filteredDishes = dishes
    .filter(dish => dish.name === selectedCategory.name)
    .flatMap(dish => dish.items);

  console.log("selectedCategory", dishes);


  if (isLoading) {
    return <SpinnerComponent />
  }

  if (!isLoading && dishes.length === 0) {
    return <div>Error: Es konnten keine Gerichte geladen werden. Bitte versuche es später erneut.</div>;
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

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          duration={3000}
          message="Es konnten keine Gerichte geladen werden. Bitte kontaktiere den Restaurantbesitzer"
          className="custom-toast"
          buttons={[
            {
              text: 'Dismiss',
              role: 'cancel',
            },
          ]}
        ></IonToast>
      
    </IonPage >
    </>
  );
};


export default Home;
