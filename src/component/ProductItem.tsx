/** @format */

import { formatPrice } from "../utilz/Price";

interface Product {
  name: string;
  category: string;
  price: number;
  description: string;
  img: string;
}
export default function ProductItem({ product }: { product: Product }) {
  return (
    <div>
      <div className=" flex flex-col space-x-2 items-start">
        <img
          src={product.img}
          alt=""
          className="w-[300px] h-[300px]"
        />
        <div className=" text-sm text-amber-600">{product.description}</div>
        <div className=" pt-2 text-sm font-semibold">{product.name}</div>
        <div className=" text-gray-500 text-xs">{product.category}</div>
        <div className=" font-bold text-sm py-2">
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
}
