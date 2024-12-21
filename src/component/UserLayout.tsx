import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import { useStateUserContext } from "../contexts/UserContextProvider";
import Loading from "./Loading";
import UserInfo from "./UserInfo";
import UserOrder from "./UserOrder";
import UserNotification from "./UserNotification";
import UserSecurity from "./UserSecurity";

interface Profile {
  name: string;
  avatar: File | string | null;
  email: string;
  city?: string;
  address?: string;
  country?: string;
  phone_number?: string;
  token: string | null;
}

export default function UserLayout() {
  const [profile, setProfile] = useState("info"); // Quản lý tab hiện tại
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const { token } = useStateUserContext(); // Lấy token từ context

  // Khởi tạo dữ liệu mặc định
  const [data, setData] = useState<Profile>({
    name: "",
    avatar: null,
    email: "",
    city: "",
    address: "",
    country: "",
    phone_number: "",
    token: null,
  });

  // Cập nhật token vào `data` khi `token` thay đổi
  useEffect(() => {
    if (token) {
      setData((prevData) => ({ ...prevData, token }));
    }
  }, [token]);

  // Lấy dữ liệu người dùng khi token sẵn sàng
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return; // Chỉ gọi API nếu token hợp lệ

      setLoading(true); // Bắt đầu loading
      const response = await GetRequestWithCre({ route: "api/user", token });
      if (response.success) {
        setData((prevData) => ({
          ...prevData, // Giữ lại token và các giá trị cũ
          ...response.data, // Gộp dữ liệu từ API
        }));
      }
      setLoading(false); // Kết thúc loading
    };

    fetchProfile();
  }, [token]);

  // Hiển thị trạng thái loading
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
            {profile === "info" && <UserInfo userData={data} />}
            {profile === "order" && <UserOrder />}
            {profile === "nofi" && <UserNotification />}
            {profile === "pass" && <UserSecurity />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
