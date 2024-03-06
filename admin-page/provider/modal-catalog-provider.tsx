"use client";

import { useEffect, useState } from "react";

import { RestaurantModal } from "@/components/modals/restaurant-modal";

export const RestaurantProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RestaurantModal />
    </>
  );
}