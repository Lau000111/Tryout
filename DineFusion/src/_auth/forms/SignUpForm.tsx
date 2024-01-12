import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
} from '@ionic/react';


const SignupForm = () => {


  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" width={50}/>
          <h2>Create a new account</h2>
          <p>To use snapgram, Please enter your details</p>
          <form className="flex flex-col gap-5 w-full mt-4">
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                type="text"
              
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                type="text"
             
              />
            </IonItem>

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
                Sign Up
            </IonButton>
          </form>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-primary-500">
              Log in
            </Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupForm;
