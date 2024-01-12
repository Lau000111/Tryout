import React, { useState, FC, useRef, useEffect, ReactNode } from 'react';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonButtons, IonMenuButton, IonPage,
} from '@ionic/react';
import { arrowBack, languageOutline, person } from 'ionicons/icons';
import menuDataDe from '../menuData_de.json';
import menuDataEn from '../menuData_en.json';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <IonPage>
      <IonHeader class="ion-no-borders" style={{ backgroundColor: "var(--ion-color-background)" }}>
        <IonToolbar className='h-11/12'>
          <IonButtons slot="end" className='mr-4 mt-4'>
            <IonMenuButton>
              <IonIcon icon={person} className="text-gray-500" />
            </IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {children}
      </IonContent>
    </IonPage>

  )
};


export default RootLayout;