/** @format */
interface Filter {
  size: string;
  color: string;
  amount: string;
  category: string;
  price: string;
  pageCount: number;
  name: string;
}

export default function CategoryFilter({
  filter,
  changefilter,
}: {
  filter: Filter;
  changefilter: (updateFn: (prev: Filter) => Filter) => void;
}) {
  const listSize = [
    { label: "Nam", data: "nam" },
    { label: "Nữ", data: "nu" },
    { label: "Phụ kiện", data: "phukien" },
    { label: "Custom", data: "custom" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 py-6">
      {listSize.map((size, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              changefilter((prev) => ({
                ...prev,
                category: size.data !== filter.category ? size.data : "all",
              }));
            }}
            className={
              size.data === filter.category
                ? "border-gray-800 border-2 font-semibold scale-105 rounded-sm py-1 px-3"
                : "border border-gray-600 rounded-sm py-2 px-3"
            }
          >
            {size.label}
          </button>
        );
      })}
    </div>
  );
}
