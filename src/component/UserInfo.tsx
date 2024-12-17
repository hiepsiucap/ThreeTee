import { useState, useEffect } from "react";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { GetRequestWithCre } from "../utilz/Request/getRequest";

interface Profile {
  name: string;
  avatar: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function UserInfo() {
  const { token } = useStateUserContext();

  // State quản lý dữ liệu và trạng thái
  const [data, setData] = useState<Profile>({ name: "", avatar: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch dữ liệu người dùng
  useEffect(() => {
    const getProfile = async () => {
      const response = await GetRequestWithCre({ route: "api/user", token });
      if (response.success) {
        setData(response.data);
      }
      setLoading(false);
    };
    getProfile();
  }, [token]);

  // Cập nhật state data chung
  const handleInputChange = (field: keyof Profile, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // Xử lý thay đổi ảnh đại diện
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange("avatar", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gửi dữ liệu cập nhật thông tin
  const handleUpdateProfile = () => {
    console.log("Cập nhật thông tin:", data);
  };

  // Đổi mật khẩu
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
    console.log("Cập nhật mật khẩu:", { currentPassword, newPassword });
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Cột Trái: Avatar và Thông tin người dùng */}
      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <label htmlFor="avatarInput" className="relative cursor-pointer">
            <img
              src={data.avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
            />
            <span className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Chọn ảnh
            </span>
            <input
              id="avatarInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Form thông tin cá nhân */}
        <div className="space-y-4">
          {[
            { label: "Họ và tên", value: data.name, field: "name" },
            { label: "Email", value: data.email, field: "email" },
            { label: "Số điện thoại", value: data.phone || "", field: "phone" },
            { label: "Địa chỉ", value: data.address || "", field: "address" },
          ].map((input) => (
            <label key={input.field} className="block">
              <span className="text-gray-600">{input.label}</span>
              <input
                type="text"
                value={input.value}
                onChange={(e) => handleInputChange(input.field as keyof Profile, e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
          ))}
        </div>

        {/* Nút cập nhật thông tin */}
        <div className="text-center">
          <button
            onClick={handleUpdateProfile}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Cập nhật thông tin
          </button>
        </div>
      </div>

      {/* Cột Phải: Đổi mật khẩu */}
      <div className="border-l pl-6 space-y-6">
        <h2 className="text-xl font-semibold">Đổi mật khẩu</h2>
        <div className="space-y-4">
          {[
            { label: "Mật khẩu hiện tại", value: currentPassword, onChange: setCurrentPassword },
            { label: "Mật khẩu mới", value: newPassword, onChange: setNewPassword },
            { label: "Nhập lại mật khẩu mới", value: confirmPassword, onChange: setConfirmPassword },
          ].map((input, idx) => (
            <label key={idx} className="block">
              <span className="text-gray-600">{input.label}</span>
              <input
                type="password"
                value={input.value}
                onChange={(e) => input.onChange(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
          ))}
        </div>

        {/* Nút đổi mật khẩu */}
        <div className="text-center">
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
}
