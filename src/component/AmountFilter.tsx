/** @format */

import { useState } from "react";

export default function AmountFilter() {
  const listAmount = ["1-5", "5-20", "20-50", "50-100", "100-200", "200+"];
  const [choose, changeChoose] = useState<string>("");
  return (
    <div className=" grid grid-cols-3 gap-3 py-6">
      {listAmount.map((size, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              changeChoose(size);
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
