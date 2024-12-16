/** @format */
interface Filter {
  size: string;
  color: string;
  amount: string;
  category: string;
  price: string;
}

export default function SizeFilter({
  filter,
  changefilter,
}: {
  filter: Filter;
  changefilter: (updateFn: (prev: Filter) => Filter) => void;
}) {
  const listSize = ["XL", "L", "M", "XS", "S", "XXL"];

  return (
    <div className="grid grid-cols-3 gap-3 py-6">
      {listSize.map((size, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              changefilter((prev) => ({
                ...prev,
                size: size,
              }));
            }}
            className={
              size === filter.size
                ? "border-gray-800 border-2 font-semibold scale-105 rounded-sm py-1 px-3"
                : "border border-gray-600 rounded-sm py-2 px-3"
            }
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
