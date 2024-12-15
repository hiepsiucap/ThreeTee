/** @format */

import { useState } from "react";

export default function ColorFilter() {
  const listSize: Array<keyof typeof colorLabels> = [
    "red",
    "green",
    "yellow",
    "black",
    "white",
    "blue",
    "gray",
  ];

  const colorLabels: Record<string, string> = {
    red: "Màu đỏ",
    green: "Màu xanh",
    yellow: "Màu vàng",
    black: "Màu đen",
    white: "Màu trắng",
    blue: "Màu xanh",
    gray: "Màu xám",
  };

  const [choose, changeChoose] = useState<string>("");

  return (
    <div className="grid grid-cols-2 gap-3 py-6">
      {listSize.map((color, index) => (
        <button
          key={index}
          onClick={() => changeChoose(color)}
          className={
            color === choose
              ? "border-gray-800 border-2 flex items-center justify-between font-semibold scale-105 rounded-sm py-1 px-3"
              : "border border-gray-600 flex items-center justify-between rounded-sm py-2 px-3"
          }
        >
          <div
            className={`w-5 h-5 px-2 rounded-full border border-gray-500 ${
              color === "red"
                ? "bg-red-600"
                : color === "green"
                ? "bg-green-600"
                : color === "yellow"
                ? "bg-yellow-600"
                : color === "black"
                ? "bg-black"
                : color === "white"
                ? "bg-white border"
                : color === "blue"
                ? "bg-blue-600"
                : "bg-gray-600"
            }`}
          ></div>
          <span className="text-gray-800 text-sm">{colorLabels[color]}</span>
        </button>
      ))}
    </div>
  );
}
