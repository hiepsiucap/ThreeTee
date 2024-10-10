/** @format */
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import CheveRon from "../assets/icon/Chevron";
export default function DefaultLayout() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="py-6"
      >
        <nav className=" md:container mx-auto flex justify-between px-6 ">
          <ul className="flex space-x-16 px-4  font-lexend items-center text-primary ">
            <li className=" flex space-x-2 items-center font-medium">
              <Link
                className=" font-bold text-2xl"
                to="/"
              >
                {" "}
                <img
                  src={""}
                  alt=""
                  className=" w-32"
                />
                ThreeTee
              </Link>
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link to="/">Trang chủ</Link>
              <CheveRon size={6}></CheveRon>
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link to="/product">Sản phẩm</Link>
              <CheveRon size={6}></CheveRon>
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link to="/events">Về chúng tôi</Link>
              <CheveRon size={6}></CheveRon>
            </li>
            <li className=" flex space-x-2 items-center text-md font-light">
              <Link to="/events">Tin tức</Link>
              <CheveRon size={6}></CheveRon>
            </li>
          </ul>
          <div className=" flex items-center font-lexend space-x-4">
            <Link
              to="/admin"
              className=" font-light text-md border-2 border-gray-800 rounded-md py-2 px-6"
            >
              Trải nghiệm ngay
            </Link>
          </div>
        </nav>
      </motion.div>
      <Outlet></Outlet>
    </div>
  );
}
