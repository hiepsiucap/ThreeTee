/** @format */

import { formatPrice } from "../utilz/Price";
import { Link } from "react-router-dom";
interface Product {
  name: string;
  category: string;
  price: number;
  description: string;
  img: string;
}
export default function ProductItem({ product }: { product: Product }) {
  return (
    <Link to={"/product/1"}>
      <div className=" flex flex-col space-x-2 items-center">
        <div className=" flex justify-center">
          <img
            src={product.img}
            alt=""
            className="w-[300px] h-[300px]"
          />
        </div>
        <div className=" text-sm text-amber-600">{product.description}</div>
        <div className=" pt-2 md:text-sm text-xl md:font-semibold">
          {product.name}
        </div>
        <div className=" text-gray-500 text-xs">{product.category}</div>
        <div className=" md:font-bold text-lg  md:text-sm py-2">
          {formatPrice(product.price)}
        </div>
      </div>
    </Link>
  );
}
