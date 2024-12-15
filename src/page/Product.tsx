/** @format */
import plus from "../assets/icon/plus.svg";
import minus from "../assets/icon/minus.svg";
import price from "../assets/icon/price.svg";
import color from "../assets/icon/color.svg";
import Numb from "../assets/icon/numb.svg";
import ProductItem from "../component/ProductItem";
import { motion } from "framer-motion";
import { SizeFilter, AmountFilter } from "../component";
import ColorFilter from "../component/colorFilter";
import { useState } from "react";
interface Product {
  name: string;
  category: string;
  price: number;
  description: string;
  img: string;
}
const product = [
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
    name: "Áo hoddie đen",
    category: "Áo quần",
    price: 100000,
    description: "Bán chạy nhất",
    img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526010/pngtree-blank-black-male-hoodie-sweatshirt-long-sleeve-with-clipping-path-mens-png-image_12258589_xi3vzm.png",
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
interface OpenFilter {
  size: boolean;
  color: boolean;
  amount: boolean;
  category: boolean;
  price: boolean;
}
interface Filter {
  size: string;
  color: string;
  amount: string;
  category: string;
  price: string;
}
export default function Product() {
  const [isopen, changeisopen] = useState<OpenFilter>({
    size: false,
    color: false,
    amount: false,
    category: false,
    price: false,
  });
  const [filter, changefilter] = useState<Filter>({
    size: "all",
    color: "all",
    amount: "all",
    category: "all",
    price: "all",
  });
  return (
    <div>
      <div className=" flex md:container md:mx-auto px-4  py-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className=" w-1/5 hidden md:block font-light text-md py-12"
        >
          <div className=" py-5 border-y-2 ">
            <div
              onClick={() => {
                changeisopen((prev) => {
                  return { ...prev, size: !prev.size };
                });
              }}
              className=" flex justify-between items-center cursor-pointer w-full"
            >
              <div>SIZE ĐỒ</div>
              <div>
                <img
                  src={!isopen.size ? plus : minus}
                  alt=""
                  className="w-7 h-7"
                />
              </div>
            </div>
            {isopen.size && (
              <SizeFilter
                filter={filter}
                changefilter={changefilter}
              ></SizeFilter>
            )}
          </div>
          <div className=" py-5 border-b-2 ">
            <div
              onClick={() => {
                changeisopen((prev) => {
                  return { ...prev, color: !prev.color };
                });
              }}
              className=" flex justify-between items-center cursor-pointer w-full"
            >
              <div>MÀU SẮC</div>
              <div>
                <img
                  src={!isopen.color ? plus : minus}
                  alt=""
                  className="w-7 h-7"
                />
              </div>
            </div>
            {isopen.color && <ColorFilter></ColorFilter>}
          </div>
          <div className=" py-5 border-b-2 ">
            <div
              onClick={() => {
                changeisopen((prev) => {
                  return { ...prev, amount: !prev.amount };
                });
              }}
              className=" flex justify-between items-center cursor-pointer w-full"
            >
              <div>SỐ LƯỢNG</div>
              <div>
                <img
                  src={!isopen.amount ? plus : minus}
                  alt=""
                  className="w-7 h-7"
                />
              </div>
            </div>
            {isopen.color && <ColorFilter></ColorFilter>}
          </div>
          <div className="flex justify-between py-5 border-b-2">
            <div>CATEGORY </div>
            <div>
              <img
                src={plus}
                alt=""
                className="w-7 h-7"
              />
            </div>
          </div>
          <div className="flex justify-between py-5 border-b-2">
            <div>MỨC GIÁ </div>
            <div>
              <img
                src={plus}
                alt=""
                className="w-8 h-8"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full "
        >
          <div className=" flex justify-between items-center">
            <h5 className=" font-light text-xl ">
              Danh sách sản phẩm <span>{"(" + product.length + ")"}</span>
            </h5>
            <div>
              <select
                name=""
                className=" border border-gray-700 rounded-md py-1 px-2 text-sm md:text-base md:py-3 md:px-6 font-light"
                id=""
              >
                <option>Sort theo giá</option>
              </select>
            </div>
          </div>
          <div className=" md:hidden py-4 flex space-x-2 ">
            <button className=" flex space-x-1  border p-2 items-center rounded-md text-sm border-gray-400">
              <div>
                <img
                  src={Numb}
                  alt=""
                  className="w-4 h-4"
                />
              </div>
              <div className="  text-xs">SỐ LƯỢNG </div>
            </button>
            <button className=" flex space-x-1   border p-2 items-center rounded-md text-sm border-gray-400">
              <div>
                <img
                  src={color}
                  alt=""
                  className="w-4 h-4"
                />
              </div>
              <div className="  text-xs">MÀU SẮC </div>
            </button>
            <button className=" flex space-x-1  border p-2 items-center rounded-md text-sm border-gray-400">
              <div>
                <img
                  src={price}
                  alt=""
                  className="w-4 h-4"
                />
              </div>
              <div className="  text-xs">MỨC GIÁ </div>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:p-8  ">
            {product.map((product) => {
              return <ProductItem product={product}></ProductItem>;
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
