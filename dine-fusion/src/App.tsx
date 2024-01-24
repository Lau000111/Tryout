import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import "./globals.css";
import ShoppingCartPage from './pages/ShoppingCart';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import PaymentPage from './pages/Payment';
import MenuComponent from './components/MenuComponent';


setupIonicReact();


const App: React.FC = () => {

  return (
    <IonApp>
      <ShoppingCartProvider>
        <IonReactRouter>
          <MenuComponent />
          <IonRouterOutlet>
            <Router>
              <Switch>
                <RootLayout>
                  {/* public routes */}
                  <Route path="/sign-in">
                    <AuthLayout>
                      <SignInForm />
                    </AuthLayout>
                  </Route>

                  <Route path="/sign-up">
                    <AuthLayout>
                      <SignUpForm />
                    </AuthLayout>
                  </Route>

                  {/* private routes */}
                  <Route path="/home">
                    <Home />
                  </Route>
                  <Route path="/cart">
                    <ShoppingCartPage />
                  </Route>

                  <Route path="/payment" component={PaymentPage} exact />
                  {/* Redirect von der Root-Route */}
                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                </RootLayout>
              </Switch>
            </Router>
          </IonRouterOutlet>
        </IonReactRouter>
      </ShoppingCartProvider>
    </IonApp>
  );
};

export default App;
