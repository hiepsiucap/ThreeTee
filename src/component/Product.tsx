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
export default function Product() {
  const Product = [
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

      <div className="grid grid-cols-3 gap-10 ">
        {Product.map((product) => {
          return <ProductItem product={product}></ProductItem>;
        })}
      </div>
    </motion.div>
  );
}
