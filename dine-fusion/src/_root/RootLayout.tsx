import React from 'react';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonButtons, IonMenuButton, IonPage, IonButton, useIonRouter
} from '@ionic/react';
import { arrowBack, languageOutline, person } from 'ionicons/icons';
import { useHistory, useLocation  } from 'react-router';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  
  const history = useHistory();
  const location = useLocation();


  const homePath = '/home';

  const isDineFusionPage = location.pathname.includes('dine-fusion');

  // Prüfe, ob der Nutzer sich auf dem Home-Screen befindet
  const isHomeScreen = location.pathname === homePath;
  
  return (
    <IonPage>
      {!isDineFusionPage && (
      <IonHeader class="ion-no-borders" style={{ backgroundColor: "var(--ion-color-background)" }} collapse="fade">
        <IonToolbar className='h-11/12'>
        {!isHomeScreen && (
          <IonButtons slot="start">
            <IonButton  onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} className="text-gray-500" />
            </IonButton>
          </IonButtons>
         )}
          <IonButtons slot="end" className='mr-4 mt-4'>
            <IonMenuButton autoHide={false}>
            </IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      )}
      <IonContent>
        {children}
      </IonContent>
    </IonPage>
  )
};

export default RootLayout;
