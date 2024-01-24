import React, { useState, useContext } from 'react';
import {
    IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonLabel, IonInput, IonButton, IonIcon, IonToast
} from '@ionic/react';
import { cardOutline, cashOutline, peopleOutline, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

const PaymentPage: React.FC = () => {
    const { items, setItems, totalAmount } = useShoppingCart();
    const [email, setEmail] = useState('');
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);


    const handlePayment = () => {
        history.push('/')
        setItems([]);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Zahlung</IonTitle>
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon slot="icon-only" icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLabel>Insgesamt: {totalAmount.toFixed(2)} €</IonLabel>
                <IonButton expand="block" onClick={handlePayment} >
                    <IonIcon slot="start" icon={cardOutline} />
                    Online bezahlen
                </IonButton>
                <IonButton expand="block" id="present-bar">
                    <IonIcon slot="start" icon={cashOutline} />
                    Barzahlung
                </IonButton>
                <IonToast
                    trigger="present-bar"
                    isOpen={isOpen}
                    message="Barzhalung wird eingereicht..."
                    onDidDismiss={() => setIsOpen(false)}
                    duration={4000}
                ></IonToast>

                <IonButton expand="block" onClick={handlePayment}>
                    <IonIcon slot="start" icon={peopleOutline} />
                    Gruppenzahlung
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default PaymentPage;
