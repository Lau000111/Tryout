"use client"
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState  } from 'react';

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isChecking, setIsChecking] = useState(true);
  // const { userId } = auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  // const store = await prismadb.store.findFirst({
  //   where: {
  //     userId,
  //   }
  // });

  // if (store) {
  //   redirect(`/${store.id}`);
  // };

  useEffect(() => {
    const store = localStorage.getItem('store');
    if (store) {
      redirect(`/${store}`);
    } else {
      
    }
  });

  if (isChecking) {
    return <div>Lade...</div>; // oder irgendein Lade-Indikator
  }
 

  return (
    <>
      {children}
    </>
  );
};