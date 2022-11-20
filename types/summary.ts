export interface SalesData {
  _id: string;
  totalSales: number;
}

export interface SummaryTypes {
  ordersCount: number;
  productsCount: number;
  usersCount: number;
  ordersPrice: number;
  salesData: SalesData[];
}
