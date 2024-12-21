/** @format */

import React, { useState, useRef } from "react";
import Modal from "react-modal";
import pie from "../assets/icon/ChartPieSlice.svg";
import order from "../assets/icon/IconSet.svg";
import product from "../assets/icon/FolderNotch.svg";
import Post from "../assets/icon/book.svg";
import social from "../assets/icon/social.png";
import profile from "../assets/icon/profile.png";
import hamburger from "../assets/img/hamburger.png";
import { Link } from "react-router-dom";
import { useStateUserContext } from "../contexts/UserContextProvider";
const customStyles = {
  content: {
    top: "0%",
    left: "-2.5%",
    height: "100%",
    width: "50%",
    bottom: "auto",
    zIndex: "1000",
    border: "none", // Remove border on all sides, including the Y-axis
  },
};

// Make sure to bind modal to your appElement
Modal.setAppElement("#root");

const Hamburger: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const subtitle = useRef<HTMLHeadingElement | null>(null);
  const { user } = useStateUserContext();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitle.current) {
      subtitle.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>
        {" "}
        <img
          src={hamburger}
          alt=" w-12 h-12"
          className=" md:hidden w-8 h-8"
        />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="    shadow-md md:hidden flex-col space-y-5  py-4">
          <div className=" flex flex-col">
            <Link
              to="/admin/profile"
              className=" py-5 flex space-x-2 items-center"
            >
              <img
                src="https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg"
                alt=""
                className=" w-8 h-8 rounded-full"
              />
              <div className=" font-light ">{user?.name}</div>
            </Link>
            <div className=" flex space-x-3 py-2   text-sm font-light">
              <p className=" text-black opacity-60">Yêu thích</p>
              <p className=" text-slate-200">Gần đây</p>
            </div>
            <ul className="list-disc px-5">
              <li className="  font-light py-1">
                <Link to="overview">Tổng quan</Link>
              </li>
              <li className=" font-light py-1 ">
                <Link to="orders">Đơn hàng</Link>
              </li>
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
            <div className=" flex flex-col  pl-3 py-4">
              <Link
                to="/admin/orders/pending"
                className={
                  location.pathname === "/admin/orders/pending"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={profile}
                  alt=""
                />
                <p className=" font-light">Chờ xác nhận</p>
              </Link>
              <Link
                to="/admin/orders/delivery"
                className={
                  location.pathname === "/admin/orders/delivery"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={order}
                  alt=""
                />
                <p className=" font-light">Đang giao</p>
              </Link>
              <Link
                to="/admin/orders/cancel"
                className={
                  location.pathname === "/admin/orders/cancel"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={product}
                  alt=""
                />
                <p className=" font-light">Đã huỷ</p>
              </Link>
              <Link
                to="/admin/orders/complete"
                className={
                  location.pathname === "/admin/orders/complete"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={social}
                  alt=""
                />
                <p className=" font-light">Đã giao</p>
              </Link>
            </div>
          </div>
          <div className=" flex flex-col">
            <p className=" text-slate-400 font-light text-sm">Sản phẩm</p>
            <div className=" flex flex-col space-y-2 pl-3 py-4">
              <Link
                to="/admin/product/create"
                className={
                  location.pathname === "/admin/product/create"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={profile}
                  alt=""
                />
                <p className=" font-light">Tạo sản phẩm</p>
              </Link>
              <Link
                to="/admin/product/update/-1"
                className={
                  location.pathname === "/admin/product/update/-1"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={order}
                  alt=""
                />
                <p className=" font-light">Cập nhật sản phẩm</p>
              </Link>
              <Link
                to="/admin/product/delete"
                className={
                  location.pathname === "/admin/product/delete"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={product}
                  alt=""
                />
                <p className=" font-light">Xoá sản phẩm</p>
              </Link>
              <Link
                to="/admin/product/allproduct"
                className=" flex space-x-2"
              >
                <img
                  src={social}
                  alt=""
                />
                <p className=" font-light">Thống kê sản phẩm</p>
              </Link>
            </div>
          </div>
          <div className=" flex flex-col">
            <p className=" text-slate-400 font-light text-sm">Tài khoản</p>
            <div className=" flex flex-col  pl-3 py-4">
              <Link
                to="/admin/user/alluser"
                className={
                  location.pathname === "/admin/user/alluser"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={profile}
                  alt=""
                />
                <p className=" font-light">Danh sách tài khoản</p>
              </Link>
              <Link
                to="/admin/user/updatestaff"
                className={
                  location.pathname === "/admin/user/updatestaff"
                    ? " flex space-x-2 bg-gray-100 py-2 rounded-md"
                    : " flex space-x-2  py-2 "
                }
              >
                <img
                  src={order}
                  alt=""
                />
                <p className=" font-light">Cấp quyền tài khoản</p>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Hamburger;
