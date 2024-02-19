// Dummy-Daten für Produkte
const dummyProducts = [
  { storeId: "asdf", isArchived: false },
  { storeId: "asdf", isArchived: false },
  { storeId: "asdf", isArchived: true },
  { storeId: "asdf", isArchived: false },
  // ... Weitere Dummy-Produkte
];

export const getStockCount = async (storeId: string) => {
  // Zählen der Produkte, die den Kriterien entsprechen
  const stockCount = dummyProducts.filter(product => product.storeId === storeId && !product.isArchived).length;

  return stockCount;
};
