/** @format */

import { useState } from "react";

export default function SizeFilter({
  filter,
  changefilter,
}: {
  filter: string;
  changefilter: () => void;
}) {
  const listSize = ["XL", "L", "M", "XS", "S", "XXL"];
  const [choose, changeChoose] = useState<string>("");
  return (
    <div className=" grid grid-cols-3 gap-3 py-6">
      {listSize.map((size, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              changefilter((...prev: unknown) => {
                return { prev, size };
              });
            }}
            className={
              size === choose
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
