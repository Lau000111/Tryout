import React, { useState, FC, useRef, useEffect } from 'react';
import {
  IonContent, IonLabel,
  IonMenu, IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonButtons, IonMenuButton, IonList, IonListHeader, IonMenuToggle, 
} from '@ionic/react';
import { arrowBack, languageOutline, person } from 'ionicons/icons';
import menuDataDe from '../menuData_de.json';
import menuDataEn from '../menuData_en.json';

import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useHistory } from 'react-router-dom';

const MenuComponent = () => {

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

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const languageChangePage = () => {
    setShowLanguageMenu(true);
  };

  const handleBackToMenu = () => {
    setShowLanguageMenu(false);
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{showLanguageMenu ? 'Sprachauswahl' : 'Einstellungen'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">

          {!showLanguageMenu && (
            <>
              <IonListHeader>Profile</IonListHeader>
              <IonItem button>
                Profil bearbeiten
              </IonItem>
              <IonListHeader>Sprache ändern</IonListHeader>
            </>
          )}
          {showLanguageMenu ? (
            <>
              <div className="back-button" onClick={handleBackToMenu}>
                <IonIcon icon={arrowBack} style={{ marginRight: '5px' }} />
                <IonLabel>Zurück</IonLabel>
              </div>
              <IonListHeader>Sprache</IonListHeader>
              <IonItem button onClick={() => handleLanguageChange('de')}>Deutsch</IonItem>
              <IonItem button onClick={() => handleLanguageChange('en')}>English</IonItem>
            </>
          ) : (
            <>
              <IonItem button onClick={languageChangePage}>
                Sprache ändern
                <IonIcon icon={languageOutline} slot='end' />
              </IonItem>
            </>
          )}
          <IonListHeader>Settings</IonListHeader>
              <IonItem button>
                Profil bearbeiten
              </IonItem>
              <IonItem button>
                Abmelden
              <IonIcon icon={person} slot='end' />
              </IonItem>
        </IonContent>
      </IonMenu>
    </>
  )
}



export default MenuComponent