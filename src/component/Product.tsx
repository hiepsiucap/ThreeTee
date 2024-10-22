/** @format */

interface Product {
  name: string;
  category: string;
  price: number;
  description: string;
  img: string;
}
import { motion } from "framer-motion";
import ProductItem from "./ProductItem";
import { useState } from "react";
export default function Product() {
  const Product = [
    {
      name: "Áo hoddie đen",
      category: "Áo quần",
      price: 100000,
      description: "Bán chạy nhất",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526010/pngtree-blank-black-male-hoodie-sweatshirt-long-sleeve-with-clipping-path-mens-png-image_12258589_xi3vzm.png",
    },
    {
      name: "Ly sứ cao cấp",
      category: "Dụng cụ",
      price: 100000,
      description: "Bán chạy nhất",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728524094/cup_f6btxs.avif",
    },
    {
      name: "Bình giữ nhiệt",
      category: "Dụng cụ",
      price: 100000,
      description: "Bán chạy nhất",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728523965/binh-giu-nhiet-wmf-impulse-350ml_kqqgjc.webp",
    },
    {
      name: "Áo phông trăng",
      category: "Áo quần",
      price: 100000,
      description: "Bán chạy nhất",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526016/pngtree-white-t-shirt-mockup-realistic-t-shirt-png-image_9906363_oprp1f.png",
    },

    {
      name: "Áo tay dài đen",
      category: "Áo quần",
      price: 100000,
      description: "Bán chạy nhất",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526552/pngtree-white-tshirt-long-sleeve-mockup-realistic-style-png-image_2004252_gz1fik.jpg",
    },
    {
      name: "Áo Polo tay ngắn",
      category: "Áo quần",
      price: 100000,
      description: "Bán chạy nhất",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526644/pngtree-white-polo-shirt-mockup-realistic-style-png-image_2004254_dcbehn.jpg",
    },
  ];
  const [number, changenumber] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className=" md:container flex flex-col items-center mx-auto text-center "
    >
      <h3 className="font-roboto font-light text-3xl pb-12">
        Sản phẩm nổi bật
      </h3>

      <div className=" md:grid-cols-3 md:grid hidden gap-10 ">
        {Product.map((product) => {
          return <ProductItem product={product}></ProductItem>;
        })}
      </div>
      <div className=" px-6 flex md:hidden flex-col items-center relative">
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
      </div>
    </motion.div>
  );
}
