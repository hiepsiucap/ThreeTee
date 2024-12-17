/** @format */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import { useStateUserContext } from "../contexts/UserContextProvider";
import Loading from "./Loading";
interface Profile {
  name: string;
  avatar: string;
  email: string;
}
export default function UserLayout() {
  const [profile, setprofile] = useState("info");

  const [loading, changeLoading] = useState(true);
  const [data, changeData] = useState<Profile>({
    name: "",
    avatar: "",
    email: "",
  });
  const { token } = useStateUserContext();
  useEffect(() => {
    const getProfile = async () => {
      const response = await GetRequestWithCre({ route: "api/user", token });
      if (response.success) {
        changeData(response.data);
        changeLoading(false);
      }
    };
    getProfile();
  }, [token]);
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {!loading ? (
        <div className="w-full ">
          <div className=" pl-60">
            <img
              src="https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728564771/header_setting_ddmmoz.png"
              alt=""
              className=" "
            />
          </div>
          <div className=" relative flex items-center h-full w-full">
            <div className=" border-r-2 border-green-400 py-6 flex font-light items-start flex-col pl-72 space-y-4 font-inter">
              <button
                onClick={() => {
                  setprofile("info");
                }}
                className={
                  profile === "info"
                    ? "px-4 py-2 bg-green-400 bg-opacity-25 rounded-lg"
                    : "px-4 py-2 0 bg-opacity-25 rounded-lg"
                }
              >
                Thông tin cá nhân
              </button>
              <button
                onClick={() => {
                  setprofile("order");
                }}
                className={
                  profile === "order"
                    ? "px-4 py-2 bg-green-400 bg-opacity-25 rounded-lg"
                    : "px-4 py-2 0 bg-opacity-25 rounded-lg"
                }
              >
                Đơn hàng
              </button>
              <button
                onClick={() => {
                  setprofile("nofi");
                }}
                className={
                  profile === "nofi"
                    ? "px-4 py-2 bg-green-400 bg-opacity-25 rounded-lg"
                    : "px-4 py-2 0 bg-opacity-25 rounded-lg"
                }
              >
                Thông báo
              </button>
              <button
                className={
                  profile === "pass"
                    ? "px-4 py-2 bg-green-400 bg-opacity-25 rounded-lg"
                    : "px-4 py-2 0 bg-opacity-25 rounded-lg"
                }
                onClick={() => {
                  setprofile("pass");
                }}
              >
                Bảo mật và mật khẩu
              </button>
            </div>

            <div className=" w-2/3  relative">
              <div className=" absolute -left-52 -top-24">
                <img
                  src={
                    data?.avatar ||
                    "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg"
                  }
                  alt=""
                  className=" w-44 h-44 rounded-full border-4 shadow-lg border-green-500"
                />
              </div>

              <h1 className="  text-2xl pb-12 py-2 font-semibold">
                {data.name}
              </h1>
              <h1 className=" text-xl pb-6 px-8">Thông tin cá nhân</h1>
              <div className=" flex space-x-12 px-8">
                <div className=" flex  space-x-5 w-1/2">
                  <div className=" flex flex-col space-y-6 w-full">
                    <p className=" text-gray-500 pl-2">Thông tin</p>
                    <div className="flex space-x-1 w-full">
                      <div className=" flex flex-col w-1/2 space-x-2 items-start">
                        <p className=" pl-2.5 text-sm font-semibold">
                          Họ của bạn
                        </p>
                        <input
                          type="text"
                          className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                          value={data.name.split(" ")[0]}
                        />
                      </div>
                      <div className=" flex flex-col w-1/2 space-x-2 items-start">
                        <p className=" pl-2.5 text-sm font-semibold">
                          Tên của bạn
                        </p>
                        <input
                          type="text"
                          className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                          value={data.name.split(" ")[1]}
                        />
                      </div>
                    </div>
                    <div className=" flex flex-col w-full space-x-2 items-start">
                      <p className=" pl-2.5 text-sm font-semibold">Post Code</p>
                      <input
                        type="text"
                        className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                      />
                    </div>
                    <div className=" flex flex-col w-full space-x-2 items-start">
                      <p className=" pl-2.5 text-sm font-semibold">Ngày sinh</p>
                      <input
                        type="text"
                        className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                      />
                    </div>
                    <div className=" flex flex-col w-full space-x-2 items-start">
                      <p className=" pl-2.5 text-sm font-semibold">Địa chỉ </p>
                      <input
                        type="text"
                        className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex  space-x-5 w-1/2">
                  <div className=" flex flex-col space-y-6 w-full">
                    <p className=" text-gray-500  pl-2">Liên Hệ</p>
                    <div className=" flex flex-col w-full space-x-2 items-start">
                      <p className=" pl-2.5 text-sm font-semibold">Email</p>
                      <input
                        type="text"
                        value={data.email}
                        className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                      />
                    </div>
                    <div className=" flex flex-col space-x-2 items-start">
                      <p className=" pl-2.5 text-sm font-semibold">
                        Số điện thoại
                      </p>
                      <div className="flex space-x-1 w-full">
                        <div className=" flex flex-col w-1/6 space-x-2 items-start">
                          <input
                            type="text"
                            className="rounded-lg border py-2 px-5 text-gray-500 focus:border-green-500 w-full "
                            placeholder="+84"
                          />
                        </div>
                        <div className=" flex flex-col w-5/6 space-x-2 items-start">
                          <input
                            type="text"
                            className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col w-full space-x-2 items-start">
                      <p className=" pl-2.5 text-sm font-semibold">Thành phố</p>
                      <input
                        type="text"
                        className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                      />
                    </div>
                    <div className=" flex flex-col w-full space-x-2 items-start">
                      <p className=" pl-2.5 text-sm font-semibold">Quốc gia </p>
                      <input
                        type="text"
                        className="rounded-lg border py-2 px-5 focus:border-green-500 w-full "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button className="py-3 px-8 my-8 ml-10 text-center text-white bg-green-600 rounded-lg">
                Cập nhật thông tin
              </button>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <Loading modalIsOpen={loading}></Loading>
      )}
    </motion.div>
  );
}
