import React, { useState, useContext } from 'react';
import {
    IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonLabel, IonInput, IonButton, IonIcon, IonToast
} from '@ionic/react';
import { cardOutline, cashOutline, peopleOutline, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useTranslation } from 'react-i18next';

const PaymentPage: React.FC = () => {
    const { items, setItems, totalAmount } = useShoppingCart();
    const [email, setEmail] = useState('');
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const handlePayment = () => {
        history.push('/')
        setItems([]);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{t("paymendPage.title")}</IonTitle>
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon slot="icon-only" icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLabel> {t("paymendPage.inTotal")} {totalAmount.toFixed(2)} €</IonLabel>
                <IonButton expand="block" onClick={handlePayment} >
                    <IonIcon slot="start" icon={cardOutline} />
                    {t("paymendPage.payOnline")}
                </IonButton>
                <IonButton expand="block" id="present-bar">
                    <IonIcon slot="start" icon={cashOutline} />
                    {t("paymendPage.payCash")}
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
                    {t("paymendPage.payInGroup")}
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default PaymentPage;
