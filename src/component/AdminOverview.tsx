/** @format */

import BasicLine from "./LineChart";
import Basic from "./ApexChart";
import { useState, useEffect } from "react";
import BasicPie from "./PieChart";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import { InfinitySpin } from "react-loader-spinner";
import getYearlyProfit from "../utilz/Filter";
import { aggregateOrdersByQuarterWithTotal } from "../utilz/Filter";
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
type YearlyProfit = { [key: number]: number[] };
export default function AdminOverview() {
  const [summary, changeSummary] = useState<Summary | null>();
  const [user, changeUser] = useState<TransformedUser[]>([]);
  const [profit, changeProfit] = useState<YearlyProfit>({});
  const [order, changeOrder] = useState<number[]>([]);
  const categories = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
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
  const data = [20, 30, 40, 50, 60];
  const truycap = [
    {
      name: "Hiệp nguyễn",
      role: "user",
      activity: "2 months",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg",
    },
    {
      name: "Vy nguyễn",
      role: "staff",
      activity: "4 months",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1727711973/461481020_328739150328316_8329668403506128640_n_tkxenm.jpg",
    },
  ];
  interface TransformedUser {
    name: string;
    role: "admin" | "user";
    activity: string;
    img: string;
  }

  const calculateActivity = (updatedAt: string): string => {
    const lastUpdate = new Date(updatedAt);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - lastUpdate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins`;
    } else if (diffInMinutes < 1440) {
      // less than 24 hours
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hours`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} days`;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transformUserData = (users: OriginalUser[]): TransformedUser[] => {
    return users.map((user) => ({
      name: user.name,
      role: user.role,
      activity: calculateActivity(user.updated_at),
      img: user.avatar,
    }));
  };

  interface OriginalUser {
    id: number;
    user_id: number;
    name: string;
    role: "admin" | "user";
    avatar: string;
    created_at: string;
    updated_at: string;
  }
  const { token } = useStateUserContext();
  const [isLoading, changeIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        changeIsLoading(true); // Set to true at start

        const [summaryResponse, userResponse, profitResponse, orderResponse] =
          await Promise.all([
            GetRequestWithCre({
              route: "api/admin/dashboard-statistics",
              token,
            }),
            GetRequestWithCre({
              route: "api/admin/user-logs",
              token,
            }),
            GetRequestWithCre({
              route: "api/staff/profit-statistics",
              token,
            }),
            GetRequestWithCre({
              route: "api/staff/order-statistics",
              token,
            }),
          ]);

        // Process responses
        if (summaryResponse?.success) {
          changeSummary(summaryResponse.data);
        } else {
          console.error("Summary fetch failed:", summaryResponse);
        }
        if (orderResponse?.success) {
          changeOrder(aggregateOrdersByQuarterWithTotal(orderResponse.data));
        } else {
          console.error("Summary fetch failed:", summaryResponse);
        }
        if (userResponse?.success) {
          changeUser(transformUserData(userResponse.data));
        } else {
          console.error("User logs fetch failed:", userResponse);
        }

        if (profitResponse?.success) {
          changeProfit(getYearlyProfit(profitResponse.data, [2023, 2024]));
        } else {
          console.error("Profit fetch failed:", profitResponse);
        }
      } catch (error) {
        console.error("Network or fetch error:", error);
      } finally {
        changeIsLoading(false); // Single place to handle loading state
      }
    };

    if (token) {
      fetchDashboardData();
    }

    return () => {
      // Optional: Add cleanup if needed
    };
  }, [
    token,
    changeSummary,
    changeUser,
    changeProfit,
    changeIsLoading,
    changeOrder,
  ]); // Include all dependencies
  return (
    <section>
      {isLoading === true ? (
        <div className=" pt-36 pl-72 flex w-full justify-center items-center">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <div className=" font-inter pl-72 w-full py-6">
          <div className=" flex space-x-6">
            <div className=" p-8 space-y-3 w-1/5 bg-cyan-300 tracking-wide bg-opacity-40 rounded-2xl">
              <p className=" font-light">Tổng doanh thu</p>
              <div className=" flex space-x-2 items-end">
                <p className=" font text-xl">
                  {" "}
                  {Number(summary?.revenue?.total).toLocaleString() +
                    "VNĐ"}{" "}
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
                <p className=" font text-2xl">
                  {summary?.sold_products?.total}{" "}
                </p>
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
                data={profit[2023]}
                data1={profit[2024]}
              />
            </div>
            <div className=" w-1/3 p-5 bg-gray-50 shadow-md rounded-3xl">
              <p className=" font-bold">Lượng truy cập </p>
              <div className=" flex flex-col space-y-3 py-4 font-light text-sm">
                {user.map((user) => {
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
                        <p className=" text-xs text-gray-500">
                          {user.activity}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
                        <p className=" text-xs text-gray-500">
                          {user.activity}
                        </p>
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
                data={order}
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
      )}
    </section>
  );
}
