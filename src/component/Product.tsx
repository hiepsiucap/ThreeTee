/** @format */
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
import { motion } from "framer-motion";
import ProductItem from "./ProductItem";
import { InfinitySpin } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { GetRequest } from "../utilz/Request/getRequest";
export default function Product() {
  const [listProduct, changeListProduct] = useState<Product[]>([]);
  const [loading, changeLoading] = useState<boolean>(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetRequest({ route: "api/products" });
        if (response.success) {
          changeListProduct(response.data?.data);
          changeLoading(false);
        }
      } catch (e) {
        console.log(e);
        changeLoading(true);
      }
    };
    getData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className=" md:container flex flex-col items-center md:mx-auto text-center "
    >
      <h3 className="font-roboto font-light text-3xl pb-12">
        Sản phẩm bán chạy nhất
      </h3>
      {loading === true ? (
        <div className=" pt-12">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <>
          <div className=" md:grid-cols-3 grid-cols-1 hidden md:grid gap-10 ">
            {listProduct.map((product, index) => {
              if (index > 5) return;
              return (
                <ProductItem
                  key={index}
                  product={product}
                ></ProductItem>
              );
            })}
          </div>
          <div className=" md:hidden grid-cols-1 grid  gap-10 ">
            {listProduct.map((product, index) => {
              if (index > 5) return;
              return (
                <ProductItem
                  key={index}
                  product={product}
                ></ProductItem>
              );
            })}
          </div>
        </>
      )}
      {/* <div className=" px-6 flex md:hidden flex-col items-center relative">
        <ProductItem product={Product[number]}></ProductItem>
        <button
          onClick={() => {
            changenumber((prev) => {
              return (prev + 1) % Product.length;
            });
          }}
          className=" absolute -left-8 top-1/3 rounded-full border p-2 border-black translate-x-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            changenumber((prev) => {
              return (prev + 1) % Product.length;
            });
          }}
          className=" absolute right-2 top-1/3 rounded-full border p-2 border-black translate-x-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div> */}
    </motion.div>
  );
}
