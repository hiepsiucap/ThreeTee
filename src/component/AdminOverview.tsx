/** @format */

import BasicLine from "./LineChart";
import Basic from "./ApexChart";
import React from "react";
import BasicPie from "./PieChart";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
interface Summary {
  revenue: {
    total: string; // The total revenue as a string, e.g., "400000"
    growth: number; // The growth percentage, e.g., 0
  };
  users: {
    total: number; // The total number of users, e.g., 46
    growth: number; // The growth percentage, e.g., 42.11
  };
  products: {
    total: number; // The total number of products, e.g., 2
    growth: number; // The growth percentage, e.g., 0
  };
  sold_products: {
    total: string; // The total sold products as a string, e.g., "2"
    growth: number; // The growth percentage, e.g., 0
  };
}
export default function AdminOverview() {
  const [summary, changeSummary] = React.useState<Summary | null>();
  const categories = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const categoriess = [
    "Áo thun",
    "Áo Hoddies",
    "Ly sứ",
    "Bình giữ nhiệt",
    "Áo Polo",
  ];
  const categoriesss = ["Quý 1", "Quý 2", "Quý 3", "Quý 4", "Cả Năm"];
  const data2 = [30, 40, 50, 40, 30, 40, 80, 85, 100];
  const data = [20, 30, 40, 50, 60];
  const data3 = [30, 40, 50, 25, 70, 40, 80, 60, 90];
  const truycap = [
    {
      name: "Hiệp nguyễn",
      role: "user",
      activity: "15 mins",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg",
    },
    {
      name: "Vy nguyễn",
      role: "staff",
      activity: "15 mins",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1727711973/461481020_328739150328316_8329668403506128640_n_tkxenm.jpg",
    },
    {
      name: "Minh nguyễn",
      role: "user",
      activity: "15 mins",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1727751526/Joyner-8E2A9181-cmyk_web_t2bsnn.jpg",
    },
    {
      name: "Phước nguyễn",
      role: "staff",
      activity: "15 mins",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1710902959/efvhzegkbsvirtippnzd.png",
    },
    {
      name: "Hoàng nguyễn",
      role: "user",
      activity: "15 mins",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg",
    },
    {
      name: "Hiệp nguyễn",
      role: "staff",
      activity: "15 mins",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg",
    },
  ];
  const { token } = useStateUserContext();

  const [, changeLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const fetchOrders = async () => {
      const response = await GetRequestWithCre({
        route: "api/admin/dashboard-statistics",
        token,
      });
      if (response.success) {
        changeSummary(response.data);
      }
      changeLoading(false);
    };
    fetchOrders();
  }, [token]);

  return (
    <div className=" font-inter pl-72 w-full py-6">
      <div className=" flex space-x-6">
        <div className=" p-8 space-y-3 w-1/5 bg-cyan-300 tracking-wide bg-opacity-40 rounded-2xl">
          <p className=" font-light">Tổng doanh thu</p>
          <div className=" flex space-x-2 items-end">
            <p className=" font text-xl">
              {" "}
              {Number(summary?.revenue?.total).toLocaleString() + "VNĐ"}{" "}
            </p>
            <div className=" font-light text-xs pb-2">
              +{summary?.revenue?.growth}%
            </div>
          </div>
        </div>
        <div className=" p-8 space-y-3 w-1/5 bg-slate-300 tracking-wide bg-opacity-40 rounded-2xl">
          <p className=" font-light text-sm">Số user</p>
          <div className=" flex space-x-2 items-end">
            <p className=" font text-2xl">
              {Number(summary?.users?.total).toLocaleString()}{" "}
            </p>
            <div className=" font-light text-xs pb-2">
              +{summary?.users?.growth}%
            </div>
          </div>
        </div>
        <div className=" p-8 space-y-3 w-1/5 bg-cyan-300 tracking-wide bg-opacity-40 rounded-2xl">
          <p className=" font-light text-sm">Số sản phẩm</p>
          <div className=" flex space-x-2 items-end">
            <p className=" font text-2xl">
              {" "}
              {Number(summary?.products?.total).toLocaleString()}{" "}
            </p>
            <div className=" font-light text-xs pb-2">
              +{summary?.products?.growth}%
            </div>
          </div>
        </div>
        <div className=" p-8 space-y-3 w-1/5 bg-slate-300 tracking-wide bg-opacity-40 rounded-2xl">
          <p className=" font-light text-sm">Sản phẩm bán ra</p>
          <div className=" flex space-x-2 items-end">
            <p className=" font text-2xl">{summary?.sold_products?.total} </p>
            <div className=" font-light text-xs pb-2">
              +{summary?.sold_products?.growth}%
            </div>
          </div>
        </div>
      </div>
      <div className="  flex py-6 space-x-8 mr-6">
        <div className=" w-2/3 bg-gray-50 p-6 rounded-3xl shadow-md">
          {" "}
          <BasicLine
            categories={categories}
            data={data2}
            data1={data3}
          />
        </div>
        <div className=" w-1/3 p-5 bg-gray-50 shadow-md rounded-3xl">
          <p className=" font-bold">Lượng truy cập </p>
          <div className=" flex flex-col space-y-3 py-4 font-light text-sm">
            {truycap.map((user) => {
              return (
                <div className=" flex justify-between items-center">
                  <div className=" flex items-center">
                    <img
                      src={user.img}
                      alt=""
                      className=" w-8 h-8 mr-2 rounded-full"
                    />
                    <div className=" w-28 font-light ">{user.name}</div>
                    <p
                      className={
                        user.role === "user"
                          ? "bg-teal-600 py-1 px-2 text-white rounded-lg"
                          : "bg-sky-500 py-1 px-2 text-white rounded-lg"
                      }
                    >
                      {user.role}
                    </p>
                  </div>
                  <div className=" flex space-x-2 items-end">
                    <p className=" text-xs text-gray-500">{user.activity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" space-x-6 flex">
        <div className="bg-gray-50 p-6 px-8  rounded-3xl shadow-md w-1/2">
          <Basic
            categories={categoriesss}
            data={data}
          ></Basic>
        </div>
        <div className="bg-gray-50 p-6 px-8  rounded-3xl shadow-md w-1/2">
          <BasicPie
            categories={categoriess}
            data={data}
          ></BasicPie>
        </div>
      </div>
    </div>
  );
}
