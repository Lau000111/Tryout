import React from 'react';
import { useHistory, Link } from "react-router-dom";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
} from '@ionic/react';

const SigninForm = () => {
  const navigate = useHistory();
  const isLoggedIn = false;

    if (isLoggedIn) {
      navigate.push("/");
    } else {
      
    };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" width={50}/>
          <h2>Log in to your account</h2>
          <p>Welcome back! Please enter your details.</p>
          <form className="flex flex-col gap-5 w-full mt-4">
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
              />
            </IonItem>

            <IonButton expand="block" type="submit">
            Log in
            </IonButton>
          </form>
          <p className="text-center">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-primary-500">
              Sign up
            </Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SigninForm;
