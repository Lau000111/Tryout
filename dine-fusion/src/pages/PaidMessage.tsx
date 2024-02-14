import React, { useEffect, useState } from 'react'
import { IonButton } from '@ionic/react';
import Confetti from 'react-confetti';
import { useHistory } from 'react-router-dom';

const PaidMessage = () => {
  const history = useHistory();
  const [confetti, setConfetti] = useState(true);

  const toggleConfetti = () => {
    setConfetti(!confetti);
  };
   const navigateToHome = () => {
    history.push("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfetti(false); // Deaktiviert den Confetti-Effekt nach 3 Sekunden
    }, 3000); // 3000 Millisekunden = 3 Sekunden

    return () => clearTimeout(timer); // Bereinigung, um den Timer zu löschen
  }, []);

    return (
      <div className="flex flex-col px-6 pt-6 pb-2 mx-auto w-full whitespace-nowrap bg-neutral-900 max-w-[450px] rounded-[32px]">
        {confetti && <Confetti/>}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b63a0e9d0e8309639df19af7c31b7e0c0ac3c13dddacca6ce42b49329e48868?apiKey=9253664459f648d7bd41c8f0841ddcc2&"
        className="self-center mt-10 aspect-square w-[72px] fadeInUpAndGrow"
      />
      <div className="mt-4 text-xl font-medium leading-7 text-center text-white">
        Payment Success!
      </div>
      <div className="mt-1.5 text-sm leading-5 text-center text-white text-opacity-70">
        Your payment has been successfully done.
      </div>
      <div className="flex flex-col p-5 mt-8 w-full rounded-2xl bg-zinc-800">
        <div className="flex gap-4 justify-between">
          <div className="grow text-sm leading-4 text-white text-opacity-70">
            Amount
          </div>
          <div className="grow text-lg font-medium leading-6 text-center text-white">
            IDR 1,000,000
          </div>
        </div>
        <div className="flex gap-4 justify-between mt-3">
          <div className="grow my-auto text-sm leading-4 text-white text-opacity-70">
            Payment Status
          </div>
          <div className="justify-center px-2.5 py-1.5 text-xs font-medium leading-4 text-center text-emerald-400 rounded-3xl aspect-[2.21] bg-emerald-400 bg-opacity-10">
            Success
          </div>
        </div>
        <div className="shrink-0 mt-5 h-px bg-white bg-opacity-20" />
        <div className="flex gap-4 justify-between mt-5 text-sm leading-4">
          <div className="grow text-white text-opacity-70">Ref Number</div>
          <div className="grow font-medium text-center text-white">
            000085752257
          </div>
        </div>
        <div className="flex gap-4 justify-between mt-3.5 text-sm leading-4">
          <div className="grow text-white text-opacity-70">Merchant Name</div>
          <div className="font-medium text-center text-white">Otomoto Car</div>
        </div>
        <div className="flex gap-4 justify-between mt-3.5 text-sm leading-4">
          <div className="grow text-white text-opacity-70">Payment Method</div>
          <div className="grow font-medium text-center text-white">
            Bank Transfer
          </div>
        </div>
        <div className="flex gap-4 justify-between mt-3.5 text-sm leading-4">
          <div className="grow text-white text-opacity-70">Payment Time</div>
          <div className="grow font-medium text-center text-white">
            Mar 22, 2023, 13:22:16
          </div>
        </div>
        <div className="flex gap-4 justify-between mt-3.5 text-sm leading-4">
          <div className="grow text-white text-opacity-70">Sender</div>
          <div className="grow font-medium text-center text-white">
            Antonio Ibrahimovic
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 justify-between px-20 py-3 mt-40 text-sm font-medium leading-6 text-center text-white rounded-xl border border-solid border-white border-opacity-20">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/585d2ae19a22c6d8bd1703f482bc63bed4c2aea165e4f2825de78faf6d1f5715?apiKey=9253664459f648d7bd41c8f0841ddcc2&"
          className="w-6 aspect-square"
        />
        <div className="grow">Get PDF Receipt</div>
      </div>
      <div className="mt-2">
      <IonButton 
          expand="block" 
          className="justify-center items-center px-16 py-1 text-sm font-semibold leading-6 text-center text-white bg-violet-800 rounded-xl" 
          fill='clear'
          onClick={navigateToHome}>
          Done
        </IonButton>
        </div>
    </div>
  );
}

export default PaidMessage