"use client"
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = ({
  params
}: {
  params: { storeId: string }
}) => {

    const [store, setStore] = React.useState<any>();
  
    useEffect(() => {
        const store = localStorage.getItem('store');
        if (!store) {
            redirect('/');
        }
        setStore(store);
      });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}

export default SettingsPage;