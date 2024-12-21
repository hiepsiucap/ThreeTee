/** @format */
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Comment from "../component/Comment";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { formatPrice } from "../utilz/Price";
import { redirect, useParams } from "react-router-dom";
import { GetRequest } from "../utilz/Request/getRequest";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateCartContext } from "../contexts/CartContext";
import Swal from "sweetalert2";
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
  images: ProductImage[];
}

interface Review {
  order_id: number;
  user_id: number;
  product_id: number;
  score: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  role: string;
  avatar: string;
  created_at: string;
  updated_at: string;
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

interface ProductImage {
  id: number;
  product_id: number;
  image_link: string;
  created_at: string;
  updated_at: string;
}
const initialData: Product = {
  id: 0,
  name: "",
  description: "",
  sold: 0,
  rate: 0,
  category: "",
  created_at: "",
  updated_at: "",
  product_details: [
    {
      id: 0,
      product_id: 0,
      stock: 0,
      price: 0,
      size: "",
      created_at: "",
      updated_at: "",
    },
  ],
  images: [
    {
      id: 0,
      product_id: 0,
      image_link: "",
      created_at: "",
      updated_at: "",
    },
  ],
};

export default function DetailProduct() {
  const [selectsize, setSelectsize] = useState<number | null>();
  const { AddCart } = useStateCartContext();
  const [data, changedata] = useState<Product>(initialData);
  const [review, changeReview] = useState<Review[]>();
  const navigate = useNavigate();
  const [loading, changeLoading] = useState<boolean>(true);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const getData = async () => {
      const response = await GetRequest({ route: `api/products/${id}` });
      if (!response.success) {
        return Swal.fire({
          title: "Error!",
          text: "Mạng đang gặp lỗi",
          icon: "error",
          confirmButtonText: "Trở lại",
        }).then(() => {
          redirect("/");
        });
      }
      changeLoading(false);
      changedata(response.data.data);
      setSelectsize(response?.data?.data?.product_details[0]?.id);
    };
    const getReview = async () => {
      const response = await GetRequest({ route: `api/reviews/${id}` });
      if (!response.success) {
        return Swal.fire({
          title: "Error!",
          text: "Mạng đang gặp lỗi",
          icon: "error",
          confirmButtonText: "Trở lại",
        }).then(() => {
          redirect("/");
        });
      }
      changeReview(response.data.data);
    };
    getData();
    getReview();
  }, [id]);
  return (
    <section className=" md:container mx-auto py-6  md:px-24">
      <div className=" hidden font-roboto pl-6 md:flex flex-col items-center md:flex-row md:space-x-2 font-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <Link to="/product">Trở về trang sản phẩm</Link>
      </div>
      {loading === true ? (
        <div className=" pt-16 flex items-center justify-center">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <>
          <div className=" flex flex-col md:flex-row md:space-x-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="md:w-1/2 relative flex items-center justify-center"
            >
              <img
                src={data.images[0].image_link}
                alt=""
                className=" max-h-screen"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="  py-6 px-6 flex flex-col items-center w-full md:w-1/2  md:items-start"
            >
              <div className=" pt-6 font-roboto font-light text-3xl">
                {data.name}
              </div>
              <div className=" flex font-light ">{data.category}</div>
              <div className=" font-roboto pb-3 pt-4  font-light text-3xl">
                {formatPrice(100000)}
              </div>
              <div className=" flex  space-x-4 items-center  pb-4">
                <div className=" flex font-light ">{data.sold} Đã bán</div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="text-yellow-400 w-4 h-4 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <div className=" font-light">{data.description}</div>
              <div className=" font-light pt-4">Chọn size áo</div>
              <div className="mb-4 flex py-3 space-x-2">
                {data.product_details &&
                  data.product_details.map((sz) => {
                    return sz.stock > 0 ? (
                      <button
                        onClick={() => setSelectsize(sz.id)}
                        key={sz.id}
                        className={
                          selectsize == sz.id
                            ? "p-3 w-14 h-14 border-black  transition-transform hover:scale-110 font-roboto border rounded-sm "
                            : " p-3 w-14 h-14 border-gray-200    font-light transition-transform hover:scale-110 font-roboto border rounded-sm"
                        }
                      >
                        {sz.size}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectsize(sz.id)}
                        key={sz.size}
                        disabled
                        className={
                          selectsize == sz.id
                            ? "p-3 w-14 h-14 border-black  transition-transform hover:scale-110 font-roboto border rounded-sm "
                            : " p-3 w-14 h-14 border-gray-200    font-light transition-transform hover:scale-110 font-roboto border rounded-sm"
                        }
                      >
                        {sz.size}
                      </button>
                    );
                  })}
              </div>
              <div className=" flex flex-col space-y-2 items-center  py-4">
                <button
                  onClick={() => {
                    AddCart({
                      productId: data.id.toString(),
                      category: data.category,
                      image: data.images[0].image_link,
                      amount: "1",
                      productdetailId:
                        data.product_details
                          .find((dt) => dt.id == selectsize)
                          ?.id.toString() || "",
                      size:
                        data.product_details.find((dt) => dt.id == selectsize)
                          ?.size || "2XL",
                      name: data.name,
                      price: data.product_details[0].price.toString(),
                    });
                    navigate("/cart");
                  }}
                  className=" w-full flex space-x-4 justify-center  font-light text-xl border border-gray-800 rounded-md py-2 px-6"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </div>
                  <p>Mua ngay</p>
                </button>
                <button
                  onClick={() => {
                    AddCart({
                      productId: data.id.toString(),
                      category: data.category,
                      image: data.images[0].image_link,
                      amount: "1",
                      productdetailId:
                        data.product_details
                          .find((dt) => dt.id == selectsize)
                          ?.id.toString() || "",
                      size:
                        data.product_details.find((dt) => dt.id == selectsize)
                          ?.size || "2XL",
                      name: data.name,
                      price: data.product_details[0].price.toString(),
                    });
                  }}
                  className=" text-gray-700 italic text-sm"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </motion.div>
          </div>
          {review && <Comment review={review}></Comment>}
        </>
      )}
    </section>
  );
}
