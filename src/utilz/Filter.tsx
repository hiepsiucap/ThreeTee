/** @format */

type DataEntry = {
  year: number;
  month: number;
  total_price: string;
};

export default function getYearlyProfit(
  data: DataEntry[],
  years: number[]
): { [key: number]: number[] } {
  // Initialize an object to hold yearly profits
  const yearlyProfit: { [key: number]: number[] } = {};

  // Initialize profit arrays for the specified years with default value 0
  years.forEach((year) => {
    yearlyProfit[year] = Array(12).fill(0);
  });

  // Populate the profits from the input data
  data.forEach((item) => {
    const year = item.year;
    const month = item.month;
    const totalPrice = parseInt(item.total_price, 10); // Convert to number

    if (yearlyProfit[year]) {
      yearlyProfit[year][month - 1] = totalPrice; // month - 1 because it's 1-based indexing
    }
  });

  return yearlyProfit;
}

type OrderData = {
  year: number;
  month: number;
  total_orders: number;
};

export function aggregateOrdersByQuarterWithTotal(
  orders: OrderData[]
): number[] {
  // Initialize an array to store totals for each quarter
  const quarterlyOrders = [0, 0, 0, 0];

  orders.forEach((order) => {
    if (order.year === 2024) {
      // Determine the quarter (0: Q1, 1: Q2, 2: Q3, 3: Q4)
      const quarter = Math.floor((order.month - 1) / 3);
      quarterlyOrders[quarter] += order.total_orders;
    }
  });

  // Add the total orders for the year as the last element
  const totalOrdersForYear = quarterlyOrders.reduce(
    (sum, orders) => sum + orders,
    0
  );
  quarterlyOrders.push(totalOrdersForYear);

  return quarterlyOrders;
}
