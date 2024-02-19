import React, { useState, FC, useRef, useEffect } from 'react';
import {
  IonContent, IonLabel,
  IonMenu, IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonButtons, IonMenuButton, IonList, IonListHeader, IonMenuToggle,  IonButton, IonPage
} from '@ionic/react';
import { arrowBack, languageOutline, person } from 'ionicons/icons';

import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MenuComponent = () => {

  const [language, setLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'de'
  );
  const { items } = useShoppingCart();
  const history = useHistory();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    localStorage.setItem('preferredLanguage', 'de');
  }, [language]);

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    setShowLanguageMenu(false);
  };

  const languageChangePage = () => {
    setShowLanguageMenu(true);
  };

  const handleBackToMenu = () => {
    setShowLanguageMenu(false);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'de';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            {/* <IonTitle>{showLanguageMenu ? t('settings.changeLanguage.title') : t('settings.title')}</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">


          {!showLanguageMenu && (
            <>
              <IonListHeader>{t("settings.title")}</IonListHeader>
              <IonItem button>
                {t("settings.profile.title")}
              </IonItem>
              <IonListHeader>{t("settings.chanceLanguage.editProfile")}</IonListHeader>
            </>
          )}
          {showLanguageMenu ? (
            <>
              <div className="back-buttonMenu" onClick={handleBackToMenu}>
                <IonIcon icon={arrowBack} style={{ marginRight: '5px' }} />
                <IonLabel>{t("general.back")}</IonLabel>
              </div>
              <IonListHeader>{t("settings.chanceLanguage.title")}</IonListHeader>
              <IonItem button onClick={() => handleLanguageChange('de')}>{t("settings.chanceLanguage.german")}</IonItem>
              <IonItem button onClick={() => handleLanguageChange('en')}>{t("settings.chanceLanguage.english")}</IonItem>
            </>
          ) : (
            <>
              <IonItem button onClick={languageChangePage} data-testid="change-language-button">
              {t("settings.chanceLanguage.editProfile")}
                <IonIcon icon={languageOutline} slot='end' />
              </IonItem>
              <IonListHeader>{t("settings.title")}</IonListHeader>
              <IonItem button>
                {t("settings.else.signOut")}
              <IonIcon icon={person} slot='end' />
              </IonItem>
            </>
          )}
        
        </IonContent>
        
      </IonMenu>

      <IonPage id="main-content">
            
      </IonPage>
    </>
  )
}



export default MenuComponent