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
  const [profile, setProfile] = useState("info"); // Tab hiện tại
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [data, setData] = useState({
    name: "",
    avatar: "",
    email: "",
  }); // Dữ liệu người dùng
  const { token } = useStateUserContext();

  // Fetch thông tin người dùng
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
        <div>
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
            {[
              { key: "info", label: "Thông tin cá nhân" },
              { key: "order", label: "Đơn hàng" },
              { key: "nofi", label: "Thông báo" },
              { key: "pass", label: "Bảo mật & mật khẩu" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setProfile(tab.key)}
                className={`w-4/5 px-4 py-2 rounded-lg text-center ${
                  profile === tab.key
                    ? "bg-green-400 bg-opacity-25 text-green-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 px-6 py-4">
            {/* Thay vì unmount, chúng ta dùng CSS để hiển thị/ẩn */}
            <div style={{ display: profile === "info" ? "block" : "none" }}>
              <UserInfo />
            </div>
            <div style={{ display: profile === "order" ? "block" : "none" }}>
              <UserOrder />
            </div>
            <div style={{ display: profile === "nofi" ? "block" : "none" }}>
              <UserNotification />
            </div>
            <div style={{ display: profile === "pass" ? "block" : "none" }}>
              <UserSecurity />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
