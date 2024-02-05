import { IonButton, IonModal } from '@ionic/react';

export default function Example() {
  return (
    <>
      <IonButton id="open-modal">Open</IonButton>
      <IonModal trigger="open-modal">Modal content</IonModal>
    </>
  );
}