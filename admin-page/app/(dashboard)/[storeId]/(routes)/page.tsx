"use client"
import { CreditCard, DollarSign, Package, EuroIcon } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getStockCount } from "@/actions/get-stock-count";
import { formatter } from "@/lib/utils";
import { useTranslation } from 'react-i18next';

interface DashboardPageProps {
  params: {
    storeId: string;
  };
};

const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null);
  const [graphRevenue, setGraphRevenue] = useState<any | null>(null); // Ersetze 'any' durch einen geeigneteren Typ
  const [salesCount, setSalesCount] = useState<number | null>(null);
  const [stockCount, setStockCount] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      const totalRev = await getTotalRevenue(params.storeId);
      const graphRev = await getGraphRevenue(params.storeId);
      const sales = await getSalesCount(params.storeId);
      const stock = await getStockCount(params.storeId);

      setTotalRevenue(totalRev);
      setGraphRevenue(graphRev);
      setSalesCount(sales);
      setStockCount(stock);
    }

    fetchData();
  }, [params.storeId]);



  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('overview.title')}
              </CardTitle>
              <EuroIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRevenue !== null ? formatter.format(totalRevenue) : ''}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


export default DashboardPage;
