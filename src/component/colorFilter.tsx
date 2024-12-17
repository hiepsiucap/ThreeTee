/** @format */
interface Filter {
  size: string;
  color: string;
  amount: string;
  category: string;
  price: string;
  pageCount: number;
}

export default function ColorFilter({
  filter,
  changefilter,
}: {
  filter: Filter;
  changefilter: (updateFn: (prev: Filter) => Filter) => void;
}) {
  const listSize = ["Nam", "Nữ", "Phụ kiện"];

  return (
    <div className="grid grid-cols-2 gap-3 py-6">
      {listSize.map((size, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              changefilter((prev) => ({
                ...prev,
                size: size !== filter.size ? size : "all",
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
