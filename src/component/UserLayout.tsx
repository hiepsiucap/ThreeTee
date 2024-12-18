/** @format */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import { useStateUserContext } from "../contexts/UserContextProvider";
import Loading from "./Loading";
import UserInfo from "./UserInfo";
import UserOrder from "./UserOrder";
import UserNotification from "./UserNotification";
import UserSecurity from "./UserSecurity";

export default function UserLayout() {
  const [profile, setProfile] = useState("info");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    avatar: "",
    email: "",
  });
  const { token } = useStateUserContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await GetRequestWithCre({ route: "api/user", token });
      if (response.success) {
        setData(response.data);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) {
    return <Loading modalIsOpen={loading} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="w-full h-full">
        {/* Header */}
        <div className="pl-6 py-4">
          <img
            src="https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728564771/header_setting_ddmmoz.png"
            alt="Header"
            className="w-full"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full w-full">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 border-r border-gray-300 py-6 flex flex-col items-center space-y-4 font-light font-inter">
            <button
              onClick={() => setProfile("info")}
              className={`w-4/5 px-4 py-2 rounded-lg text-center ${
                profile === "info"
                  ? "bg-green-400 bg-opacity-25 text-green-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Thông tin cá nhân
            </button>
            <button
              onClick={() => setProfile("order")}
              className={`w-4/5 px-4 py-2 rounded-lg text-center ${
                profile === "order"
                  ? "bg-green-400 bg-opacity-25 text-green-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Đơn hàng
            </button>
            <button
              onClick={() => setProfile("nofi")}
              className={`w-4/5 px-4 py-2 rounded-lg text-center ${
                profile === "nofi"
                  ? "bg-green-400 bg-opacity-25 text-green-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Thông báo
            </button>
            <button
              onClick={() => setProfile("pass")}
              className={`w-4/5 px-4 py-2 rounded-lg text-center ${
                profile === "pass"
                  ? "bg-green-400 bg-opacity-25 text-green-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Bảo mật & mật khẩu
            </button>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 px-6 py-4">
            {profile === "info" && <UserInfo />}
            {profile === "order" && <UserOrder />}
            {profile === "nofi" && <UserNotification />}
            {profile === "pass" && <UserSecurity />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
