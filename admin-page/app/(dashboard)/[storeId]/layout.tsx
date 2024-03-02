"use client"

import Navbar from '@/components/navbar';
import Navbar2 from '@/components/navbar2';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import "@/app/i18n"


// import Navbar from '@/components/navbar'

export default function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  // const store = await prismadb.store.findFirst({ 
  //   where: {
  //     id: params.storeId,
  //     userId,
  //   }
  //  });


  useEffect(() => {
    if (!localStorage.getItem('store')) {
      redirect('/');
    };
  
  },);


  return (
    <>
      <Navbar />
      <Navbar2 />
      {children}
    </>
  );
};