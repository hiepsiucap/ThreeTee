/** @format */
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Hamburger from "./Hambuger";
import Cart from "../assets/icon/cart.png";
import { useStateUserContext } from "../contexts/UserContextProvider";
import Logo from "../assets/icon/logo";
import { useStateCartContext } from "../contexts/CartContext";
// import { ReactComponent as Logo } from "../assets/icon/logo.svg";
export default function DefaultLayout() {
  const location = useLocation();
  const { cart } = useStateCartContext();
  const { user } = useStateUserContext();
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="py-4 hidden md:block"
      >
        <nav className=" md:container mx-auto flex  items-center justify-between px-6 ">
          <ul className="flex space-x-16 px-4  font-lexend items-center text-primary ">
            <li className=" flex space-x-2 items-center font-medium">
              <Link
                className=" font-bold text-2xl pb-2"
                to="/"
              >
                <Logo></Logo>
              </Link>
            </li>
            <li className=" flex space-x-2   items-center text-md font-light">
              <Link
                className={
                  location.pathname === "/"
                    ? " border-b-2 pb-2 px-2 border-gray-600"
                    : " border-b-2 pb-2 px-2 border-white"
                }
                to="/"
              >
                Trang chủ
              </Link>{" "}
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link
                className={
                  location.pathname === "/product"
                    ? " border-b-2 pb-2 px-2 border-gray-600"
                    : " border-b-2 pb-2 px-2 border-white"
                }
                to="/product"
              >
                Sản phẩm
              </Link>
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link
                to="/description"
                className={
                  location.pathname === "/description"
                    ? " border-b-2 pb-2 px-2 border-gray-600"
                    : " border-b-2 pb-2 px-2 border-white"
                }
              >
                Hướng dẫn
              </Link>
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link
                to="/posts"
                className={
                  location.pathname === "/posts"
                    ? " border-b-2 pb-2 px-2 border-gray-600"
                    : " border-b-2 pb-2 px-2 border-white"
                }
              >
                Tin tức
              </Link>
            </li>
          </ul>
          <div className=" flex items-center font-lexend space-x-4">
            {!user ? (
              <>
                <Link
                  to="/cart"
                  className=" relative px-4"
                >
                  <img
                    src={Cart}
                    className=" w-12 h-12 "
                    alt=""
                  />
                  <div className="text-xs bg-red-500 text-white absolute rounded-full font-medium py-0.5 px-1.5 -top-0.5 left-3.5 bg-opacity-100 w-5 h-5 flex items-center justify-center">
                    {cart?.length || 0}
                  </div>
                </Link>
                <Link
                  to="/login"
                  className=" font-light text-md border-2 mb-1 border-gray-800 rounded-md py-2 px-6"
                >
                  Đăng nhập
                </Link>
              </>
            ) : (
              <section className=" flex font-roboto pb-4 space-x-4 items-center">
                <Link
                  to="/cart"
                  className=" relative px-4"
                >
                  <img
                    src={Cart}
                    className=" w-8 h-8 "
                    alt=""
                  />
                  <div className="text-xs bg-red-500 text-white absolute rounded-full font-medium py-0.5 px-1.5 -top-0.5 left-3.5 bg-opacity-100 w-5 h-5 flex items-center justify-center">
                    {cart?.length || 0}
                  </div>
                </Link>
                <Link
                  to="/admin"
                  className=" bg-green-500 text-sm rounded-md py-1 px-3 text-white"
                >
                  ADMIN
                </Link>
                <div className="text-lg font-semibold">Chào {user.name} !</div>
                <Link
                  to={user.role === "user" ? "/user/profile" : "/admin/profile"}
                >
                  <img
                    src={
                      user?.ava ||
                      "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg"
                    }
                    className=" w-12 h-12 rounded-full"
                  ></img>
                </Link>
              </section>
            )}
          </div>
        </nav>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className=" block md:hidden"
      >
        <nav className=" md:container mx-auto flex justify-between py-3   ">
          <ul className="flex space-x-16 px-4 justify-between w-full  font-lexend items-center text-primary ">
            <li className=" flex space-x-2 items-center  font-medium">
              <Link
                className=" font-bold text-2xl pb-2"
                to="/"
              >
                {" "}
                <img
                  src={""}
                  alt=""
                  className=" "
                />
                <Logo />
              </Link>
            </li>
            <li className=" flex space-x-2 items-center  justify-between font-medium">
              <Link
                to="/cart"
                className=" relative px-4 pb-2"
              >
                <img
                  src={Cart}
                  className=" w-10 h-10 "
                  alt=""
                />
                <div className="text-xs bg-red-500 text-white absolute rounded-full font-medium py-0.5  px-1.5 -top-0.5 left-3.5 bg-opacity-100 w-5 h-5 flex items-center justify-center">
                  {cart?.length || 0}
                </div>
              </Link>
              <Hamburger></Hamburger>
            </li>
            {/* <li className=" flex space-x-2   items-center text-md font-light">
              <Link
                className={
                  location.pathname === "/"
                    ? " border-b-2 pb-2 px-2 border-gray-600"
                    : " border-b-2 pb-2 px-2 border-white"
                }
                to="/"
              >
                Trang chủ
              </Link>{" "}
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link
                className={
                  location.pathname === "/product"
                    ? " border-b-2 pb-2 px-2 border-gray-600"
                    : " border-b-2 pb-2 px-2 border-white"
                }
                to="/product"
              >
                Sản phẩm
              </Link>
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link
                to="/description"
                className={
                  location.pathname === "/description"
                    ? " border-b-2 pb-2 px-2 border-gray-600"
                    : " border-b-2 pb-2 px-2 border-white"
                }
              >
                Hướng dẫn
              </Link>
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link
                to="/posts"
                className={
                  location.pathname === "/posts"
                    ? " border-b-2 pb-2 px-2 border-gray-600"
                    : " border-b-2 pb-2 px-2 border-white"
                }
              >
                Tin tức
              </Link>
            </li> */}
          </ul>
        </nav>
      </motion.div>
      <Outlet></Outlet>
    </div>
  );
}
