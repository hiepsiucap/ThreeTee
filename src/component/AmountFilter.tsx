/** @format */
interface Filter {
  size: string;
  color: string;
  amount: string;
  category: string;
  price: string;
  pageCount: number;
}
export default function AmountFilter({
  filter,
  changefilter,
}: {
  filter: Filter;
  changefilter: (updateFn: (prev: Filter) => Filter) => void;
}) {
  const listAmount = ["1-5", "5-20", "20-50", "50-100", "100-200", "200+"];

  return (
    <div className=" grid grid-cols-2 gap-3 py-6">
      {listAmount.map((size, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              changefilter((prev) => ({
                ...prev,
                amount: size,
              }));
            }}
            className={
              size === filter.amount
                ? " border-gray-800 border-2 font-semibold scale-105 rounded-sm py-1 px-3"
                : "border border-gray-600  rounded-sm py-2 px-3"
            }
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
