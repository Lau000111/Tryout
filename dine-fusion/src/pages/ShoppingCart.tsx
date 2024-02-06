import React, { useState, useEffect } from 'react';
import {
  IonPage, IonContent, IonList, IonItem, IonLabel,
  IonButton, IonIcon, IonInput, IonHeader, IonToolbar,
  IonTitle, IonFooter, IonButtons, IonBackButton, IonAlert
} from '@ionic/react';
import { trashOutline, closeCircle, removeCircleOutline, addCircleOutline, cashOutline, cardOutline, ticketOutline } from 'ionicons/icons';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ShoppingCartPage: React.FC = () => {
  const history = useHistory();
  const { items, setItems, totalAmount, setTotalAmount } = useShoppingCart();
  const [showCouponInput, setShowCouponInput] = useState(false);
  const { t } = useTranslation();

  const checkCouponCode = async (code: string) => {
    try {
      const response = await fetch('/api/check-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        throw new Error('Fehler beim Überprüfen des Coupon-Codes');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Fehler:', error);
      alert('Fehler beim Überprüfen des Coupon-Codes');
    }
  };

  const removeFromCart = (itemTitle: string) => {
    setItems(items.filter(item => item.name !== itemTitle));
  };

  const updateQuantity = (itemTitle: string, newQuantity: number) => {
    setItems(items.map(item => item.name === itemTitle ? { ...item, quantity: newQuantity } : item));
  };

  const increaseQuantity = (itemTitle: string) => {
    const item = items.find(item => item.name === itemTitle);
    if (item) {
      updateQuantity(itemTitle, item.quantity + 1);
    }
  };

  const decreaseQuantity = (itemTitle: string) => {
    const item = items.find(item => item.name === itemTitle);
    if (item && item.quantity > 1) { 
      updateQuantity(itemTitle, item.quantity - 1);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const addTip = (percentage: number) => {
    const tipAmount = totalAmount * percentage;
    setTotalAmount(totalAmount + tipAmount);
  };


  useEffect(() => {
    const newTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalAmount(newTotal);
  }, [items]);

  const applyCoupons = (code: string) => {
    let newDiscount = 0;
    if (code === "Lau10") {
      newDiscount = 0.1; 
    } else {
      alert("Ungültiger Coupon-Code");
      return;
    }
    const newTotal = totalAmount - (totalAmount * newDiscount);
    setTotalAmount(newTotal);
    setShowCouponInput(false); 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("shoppingCardPage.applyCoupon")} </IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ padding: '1rem' }}>
        <IonList>
          {items.map((item, index) => (
            <IonItem key={index} lines="full" style={{
              marginBottom: '1rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            }}>
              <IonLabel style={{ flex: '1', padding: '1rem' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.name}</h2>
                <p style={{ fontSize: '1rem' }}>{`${item.price.toFixed(2)} €`}</p>
              </IonLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IonButton fill="clear" onClick={() => decreaseQuantity(item.name)}>
                  <IonIcon icon={removeCircleOutline} />
                </IonButton>
                <IonInput
                  type="number"
                  value={item.quantity.toString()}
                  onIonChange={e => updateQuantity(item.name, parseInt(e.detail.value!, 10))}
                  style={{ maxWidth: '50px', margin: '0 8px', textAlign: 'center', fontSize: '1.1rem' }}
                />
                <IonButton fill="clear" onClick={() => increaseQuantity(item.name)}>
                  <IonIcon icon={addCircleOutline} />
                </IonButton>
              </div>

              <IonButton fill="clear" onClick={() => removeFromCart(item.name)}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter style={{ padding: '1rem' }}>
        <IonButton expand="block" onClick={clearCart} style={{ marginBottom: '1rem' }}>
          <IonIcon slot="start" icon={trashOutline} />
          {t("shoppingCardPage.deleteAll")} 
        </IonButton>

        <IonButton expand="block" style={{ marginBottom: '1rem' }} id="present-alert">
          <IonIcon slot="start" icon={ticketOutline} />
          {t("shoppingCardPage.applyCoupon")} 
          </IonButton>

        <IonAlert
          trigger="present-alert"
          header="Bitte füge dein Coupon hier hinein"
          buttons={[
            {
              text: 'Anwenden',
              handler: (data) => {
                applyCoupons(data[0]);
              }
            }
          ]}
          inputs={[
            {
              placeholder: 'Coupon',
            },
          ]}
        ></IonAlert>

        <IonButton expand="block" style={{ marginBottom: '1rem' }} id="present-tip-alert">
          <IonIcon slot="start" icon={cashOutline} />
          {t("shoppingCardPage.applyCoupon")} 
        </IonButton>

        <IonAlert
          trigger="present-tip-alert"
          header="Trinkgeld auswählen"
          buttons={[
            {
              text: '5%',
              handler: () => addTip(0.05)
            },
            {
              text: '15%',
              handler: () => addTip(0.15)
            },
            {
              text: 'Abbrechen',
              role: 'cancel'
            }
          ]}
          message="Wie viel Trinkgeld möchtest du hinzufügen?"
        ></IonAlert>

        <div style={{ borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
          <IonLabel style={{ fontSize: '1.1rem' }}>{t("paymendPage.inTotal")}</IonLabel>
          <IonLabel style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            {totalAmount.toFixed(2)} €
          </IonLabel>
        </div>
        <IonButton expand="block" onClick={() => history.push('/payment')}>
          <IonIcon slot="start" icon={cardOutline} />
          {t("shoppingCardPage.pay")} 
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default ShoppingCartPage;

{/* <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        body {
            font-family: 'Roboto', sans-serif;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
            border: 1px solid transparent;
            border-radius: 0.375rem;
            font-size: 1rem;
            line-height: 1.5rem;
            font-weight: 500;
        }
        .btn-outline {
            background-color: transparent;
            color: #374151;
            border-color: #d1d5db;
        }
        .btn-red {
            background-color: #ef4444;
            color: white;
        }
        .btn-red:hover {
            background-color: #dc2626;
        }
        .btn-white {
            background-color: white;
            color: #4b5563;
        }
        .btn-white:hover {
            background-color: #f9fafb;
        }
        .input-quantity {
            width: 2rem;
            text-align: center;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
        }
    </style>
</head>
<body class="bg-gray-100">
    <div class="max-w-md mx-auto">
        <!-- Header -->
        <div class="text-center p-4 bg-white shadow-md">
            <div class="text-lg font-bold">COȘUL MEU</div>
            <div class="text-sm">MASA #6</div>
            <button class="absolute top-0 right-0 p-4">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <div class="mt-4 space-y-4">
            <div class="flex justify-between items-center p-4 bg-white shadow-md rounded">
                <div class="flex-1">
                    <div class="font-bold">BRIOCHE CU RICOTTA ȘI AFINE</div>
                    <div class="flex items-center mt-2">
                        <button class="btn btn-outline">-</button>
                        <input type="text" class="input-quantity mx-2" value="1" readonly>
                        <button class="btn btn-outline">+</button>
                    </div>
                </div>
                <div class="flex-1 text-right">
                    <div class="font-bold">35.00 LEI</div>
                    <div class="flex justify-end items-center mt-2">
                        <button class="btn btn-outline mr-2"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn btn-outline text-red-500"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center p-4 bg-white shadow-md rounded">
                <div class="flex-1">
                    <div class="font-bold">EGGS IN PURGATORY</div>
                    <div class="flex items-center mt-2">
                        <button class="btn btn-outline">-</button>
                        <input type="text" class="input-quantity mx-2" value="1" readonly>
                        <button class="btn btn-outline">+</button>
                    </div>
                </div>
                <div class="flex-1 text-right">
                    <div class="font-bold">35.00 LEI</div>
                    <div class="flex justify-end items-center mt-2">
                        <button class="btn btn-outline mr-2"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn btn-outline text-red-500"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 p-4 space-y-2">
            <button class="w-full btn btn-red">GOLEȘTE COȘUL</button>
            <button class="w-full btn btn-white">APLICĂ CUPON</button>
            <button class="w-full btn btn-white">ADAUGĂ BACȘIȘ</button>
        </div>

        <div class="flex justify-between items-center p-4 bg-brown-600 text-white">
            <div>TOTAL:</div>
            <div class="font-bold">70 LEI</div>
            <button class="btn btn-white">PLĂTEȘTE</button>
        </div>
    </div>
</body>
</html> */}
