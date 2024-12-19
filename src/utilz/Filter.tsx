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
