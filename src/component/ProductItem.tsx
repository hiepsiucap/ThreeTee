/** @format */

import { formatPrice } from "../utilz/Price";
import { Link } from "react-router-dom";
interface Image {
  id: number;
  product_id: number;
  image_link: string;
  created_at: string;
  updated_at: string;
}
interface Product {
  id: number;
  name: string;
  description: string;
  sold: number;
  rate: number;
  category: string;
  created_at: string;
  updated_at: string;
  product_details: ProductDetail[];
  images: Image[];
}

interface ProductDetail {
  id: number;
  product_id: number;
  stock: number;
  price: number;
  size: string;
  created_at: string;
  updated_at: string;
}

export default function ProductItem({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className=" flex flex-col space-x-2 items-center">
        <div className=" flex justify-center">
          <img
            src={product?.images[0]?.image_link}
            alt=""
            className="w-[300px] h-[300px]"
          />
        </div>
        <div className=" text-sm text-amber-600">Giảm 20%</div>
        <div className=" pt-2 md:text-sm text-xl md:font-semibold">
          {product.name}
        </div>
        <div className=" text-gray-500 text-xs">{product.category}</div>
        <div className=" md:font-bold text-lg  md:text-sm py-2">
          {formatPrice(product?.product_details[0]?.price)}
        </div>
      </div>
    </Link>
  );
}
