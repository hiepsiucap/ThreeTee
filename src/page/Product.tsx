/** @format */
import plus from "../assets/icon/plus.svg";
import minus from "../assets/icon/minus.svg";
import price from "../assets/icon/price.svg";
import color from "../assets/icon/color.svg";
import Numb from "../assets/icon/numb.svg";
import ProductItem from "../component/ProductItem";
import { motion } from "framer-motion";
import {
  SizeFilter,
  AmountFilter,
  CategoryFilter,
  PriceFilter,
} from "../component";
import ColorFilter from "../component/colorFilter";
import { useState } from "react";

interface Product {
  name: string;
  category: string;
  price: number;
  description: string;
  img: string;
}

const products: Product[] = [
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
    name: "Áo phông trắng",
    category: "Áo quần",
    price: 100000,
    description: "Bán chạy nhất",
    img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526016/pngtree-white-t-shirt-mockup-realistic-t-shirt-png-image_9906363_oprp1f.png",
  },
  {
    name: "Áo hoodie đen",
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
  const [isOpen, setIsOpen] = useState<OpenFilter>({
    size: false,
    color: false,
    amount: false,
    category: false,
    price: false,
  });

  const [filter, setFilter] = useState<Filter>({
    size: "all",
    color: "all",
    amount: "all",
    category: "all",
    price: "all",
  });

  const toggleFilter = (key: keyof OpenFilter) => {
    setIsOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className="flex md:container md:mx-auto px-4 py-12">
        {/* Sidebar Filters */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-1/5 hidden md:block font-light text-md py-12"
        >
          {[
            {
              title: "SIZE ĐỒ",
              component: (
                <SizeFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "size",
            },
            {
              title: "MÀU SẮC",
              component: (
                <ColorFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "color",
            },
            {
              title: "SỐ LƯỢNG",
              component: (
                <AmountFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "amount",
            },
            {
              title: "CATEGORIES",
              component: (
                <CategoryFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "category",
            },
            {
              title: "MỨC GIÁ",
              component: (
                <PriceFilter
                  filter={filter}
                  changefilter={setFilter}
                />
              ),
              key: "price",
            },
          ].map(({ title, component, key }) => (
            <div
              key={key}
              className="py-5 border-b-2"
            >
              <div
                onClick={() => toggleFilter(key as keyof OpenFilter)}
                className="flex justify-between items-center cursor-pointer w-full"
              >
                <div>{title}</div>
                <div>
                  <img
                    src={!isOpen[key as keyof OpenFilter] ? plus : minus}
                    alt=""
                    className="w-7 h-7"
                  />
                </div>
              </div>
              {isOpen[key as keyof OpenFilter] && component}
            </div>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full"
        >
          <div className="flex justify-between items-center">
            <h5 className="font-light text-xl">
              Danh sách sản phẩm <span>{"(" + products.length + ")"}</span>
            </h5>
            <div>
              <select
                className="border border-gray-700 rounded-md py-1 px-2 text-sm md:text-base md:py-3 md:px-6 font-light"
                defaultValue="Sort theo giá"
              >
                <option>Sort theo giá</option>
              </select>
            </div>
          </div>

          {/* Filters for Small Screens */}
          <div className="md:hidden py-4 flex space-x-2">
            {[
              { title: "SỐ LƯỢNG", icon: Numb },
              { title: "MÀU SẮC", icon: color },
              { title: "MỨC GIÁ", icon: price },
            ].map(({ title, icon }, idx) => (
              <button
                key={idx}
                className="flex space-x-1 border p-2 items-center rounded-md text-sm border-gray-400"
              >
                <img
                  src={icon}
                  alt=""
                  className="w-4 h-4"
                />
                <div className="text-xs">{title}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:p-8">
            {products.map((product, index) => (
              <ProductItem
                key={index}
                product={product}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
