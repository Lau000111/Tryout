
interface GraphData {
  name: string;
  total: number;
}

const dummyOrders = [
  // Beispiel für Bestellungen im Januar
  {
    createdAt: new Date('2023-01-15'),
    orderItems: [
      { product: { price: 20 } },
      { product: { price: 30 } },
    ],
  },
  // Beispiel für Bestellungen im Februar
  {
    createdAt: new Date('2023-02-20'),
    orderItems: [
      { product: { price: 15 } },
      { product: { price: 25 } },
    ],
  },
  // ... Weitere Dummy-Daten für andere Monate
];

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
  const paidOrders = dummyOrders; // Verwende Dummy-Daten statt Datenbankabfrage

  const monthlyRevenue: { [key: number]: number } = {};

  // Gruppieren der Bestellungen nach Monat und Summieren des Umsatzes
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price;
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }



  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
