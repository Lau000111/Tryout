import React from 'react';
import { IonSpinner, IonProgressBar } from '@ionic/react';

const SpinnerComponent: React.FC = () => {
  return (
    <>
    {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> */}
      {/* <IonSpinner /> */}
    <IonProgressBar type="indeterminate" data-testid="spinner-component"></IonProgressBar>
    {/* </div> */}
    </>
  );
};

export default SpinnerComponent;
