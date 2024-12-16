/** @format */
interface Filter {
  size: string;
  color: string;
  amount: string;
  category: string;
  price: string;
}
export default function PriceFilter({
  filter,
  changefilter,
}: {
  filter: Filter;
  changefilter: (updateFn: (prev: Filter) => Filter) => void;
}) {
  const listPrice = [
    "100.000-300.000",
    "300.000-600.000",
    "600.000-1.000.000",
    "1.000.000-2.000.000",
    "2.000.000-3.000.000",
  ];

  return (
    <div className=" grid grid-cols-2 gap-3 py-6">
      {listPrice.map((price, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              changefilter((prev) => ({
                ...prev,
                price: price,
              }));
            }}
            className={
              price === filter.amount
                ? " border-gray-800 border-2 font-semibold scale-105 rounded-sm py-1 px-3"
                : "border border-gray-600  rounded-sm py-2 px-3"
            }
          >
            {price}
          </button>
        );
      })}
    </div>
  );
}
