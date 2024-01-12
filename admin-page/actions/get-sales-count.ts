// Dummy-Daten für Bestellungen
const dummyOrders = [
  { storeId: "asdf", isPaid: true },
  { storeId: "asdf", isPaid: true },
  { storeId: "asdf", isPaid: false },
  { storeId: "asdf", isPaid: true },
  // ... Weitere Dummy-Bestellungen
];

export const getSalesCount = async (storeId: string) => {
  // Zählen der Bestellungen, die den Kriterien entsprechen
  const salesCount = dummyOrders.filter(order => order.storeId === storeId && order.isPaid).length;

  return salesCount;
};
