/** @format */

import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import pie from "../assets/icon/ChartPieSlice.svg";
import order from "../assets/icon/IconSet.svg";
import product from "../assets/icon/FolderNotch.svg";
import Post from "../assets/icon/book.svg";
import social from "../assets/icon/social.png";
import profile from "../assets/icon/profile.png";
import start from "../assets/icon/start1.svg";
import find from "../assets/icon/find.svg";
import sun from "../assets/icon/sun.svg";
import noti from "../assets/icon/nofi.svg";
import SideBar from "../assets/icon/Sidebar.svg";
export default function AdminLayout() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className=" font-inter  bg-white  text-blackadmin flex text-admin w-full ">
      <div className=" fixed bg-white px-7 pr-7 shadow-md flex flex-col space-y-5 h-screen py-4">
        <div className=" flex flex-col">
          <div className=" py-5 flex space-x-2 items-center">
            <img
              src="https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg"
              alt=""
              className=" w-8 h-8 rounded-full"
            />
            <div className=" font-light ">Hiệp nguyễn</div>
          </div>
          <div className=" flex space-x-3 py-2   text-sm font-light">
            <p className=" text-black opacity-60">Yêu thích</p>
            <p className=" text-slate-200">Gần đây</p>
          </div>
          <ul className="list-disc px-5">
            <li className="  font-light py-1">Tổng quan</li>
            <li className=" font-light py-1 ">Dự án</li>
          </ul>
        </div>
        <div className=" flex flex-col">
          <p className=" text-slate-400 font-light text-sm">Dashboards</p>
          <div className=" flex flex-col  pl-3 py-4">
            <Link
              to="/admin/overview"
              className={
                location.pathname === "/admin/overview"
                  ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                  : " flex space-x-2  py-2 "
              }
            >
              <img
                src={pie}
                alt=""
              />
              <p className=" font-light">Tổng quan</p>
            </Link>
            <Link
              to="/admin/orders"
              className={
                location.pathname === "/admin/orders"
                  ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                  : " flex space-x-2  py-2 "
              }
            >
              <img
                src={order}
                alt=""
              />
              <p className=" font-light">Đơn hàng</p>
            </Link>
            <Link
              to="/admin/products"
              className={
                location.pathname === "/admin/products"
                  ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                  : " flex space-x-2  py-2 "
              }
            >
              <img
                src={product}
                alt=""
              />
              <p className=" font-light">Sản phẩm</p>
            </Link>
            <Link
              to="/admin/posts"
              className={
                location.pathname === "/admin/posts"
                  ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                  : " flex space-x-2  py-2 "
              }
            >
              <img
                src={Post}
                alt=""
              />
              <p className=" font-light">Bài viết</p>
            </Link>
          </div>
        </div>
        <div className=" flex flex-col">
          <p className=" text-slate-400 font-light text-sm">Đơn hàng</p>
          <div className=" flex flex-col space-y-4 pl-3 py-4">
            <div className=" flex space-x-2 ">
              <img
                src={profile}
                alt=""
              />
              <p className=" font-light">Chờ xác nhận</p>
            </div>
            <div className=" flex space-x-2">
              <img
                src={order}
                alt=""
              />
              <p className=" font-light">Đang giao</p>
            </div>
            <div className=" flex space-x-2">
              <img
                src={product}
                alt=""
              />
              <p className=" font-light">Sản phẩm</p>
            </div>
            <div className=" flex space-x-2">
              <img
                src={social}
                alt=""
              />
              <p className=" font-light">Đã giao</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <p className=" text-slate-400 font-light text-sm">Sản phẩm</p>
          <div className=" flex flex-col space-y-4 pl-3 py-4">
            <div className=" flex space-x-2 ">
              <img
                src={profile}
                alt=""
              />
              <p className=" font-light">Tạo sản phẩm</p>
            </div>
            <div className=" flex space-x-2">
              <img
                src={order}
                alt=""
              />
              <p className=" font-light">Cập nhật sản phẩm</p>
            </div>
            <div className=" flex space-x-2">
              <img
                src={product}
                alt=""
              />
              <p className=" font-light">Xoá sản phẩm</p>
            </div>
            <div className=" flex space-x-2">
              <img
                src={social}
                alt=""
              />
              <p className=" font-light">Thống kê sản phẩm</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full">
        <div className="pl-72 py-6 pr-12 items-center shadow-sm w-full flex justify-between">
          <div className=" flex space-x-4 items-end">
            <img
              src={SideBar}
              alt=""
            />
            <img
              src={start}
              alt=""
            />
            <p className=" opacity-60 text-sm font-light">DashBoard</p>
            <p>/</p>
            <p className=" font-light text-sm ">Tổng quan</p>
          </div>
          <div className=" flex space-x-4">
            <div className="bg-gray-100 flex w-44 px-2 space-x-2 rounded-lg py-2">
              <img
                src={find}
                alt=""
              />
              <input
                type="text"
                className="bg-gray-100 text-sm font-light w-32"
                placeholder="tìm kiếm"
              />
            </div>
            <img
              src={SideBar}
              alt=""
            />
            <img
              src={noti}
              alt=""
            />
            <img
              src={sun}
              alt=""
            />
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
