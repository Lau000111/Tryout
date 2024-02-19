import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import { OrderColumn } from "./components/columns";
import { OrderClient } from "./components/client";

const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  // Beispiel-Daten
  const exampleOrders: OrderColumn[] = [
    {
      id: '1',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, AT 12345',
      isPaid: true,
      totalPrice: formatter.format(59.99),
      products: 'Product A, Product B',
      createdAt: format(new Date(), 'MMMM do, yyyy'),
    },
    {
      id: '2',
      phone: '987-654-3210',
      address: '456 Side St, Othertown, OT 54321',
      isPaid: false,
      totalPrice: formatter.format(89.99),
      products: 'Product C',
      createdAt: format(new Date(), 'MMMM do, yyyy'),
    },
    // Weitere Beispieldaten...
  ];

  // Nutze exampleOrders hier...
  // Zum Beispiel, wenn du die Daten an OrderClient übergeben möchtest:
  // <OrderClient data={exampleOrders} />

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={exampleOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
