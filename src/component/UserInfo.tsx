import { useState, useEffect } from "react";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import { PatchRequestWithCre } from "../utilz/Request/PatchRequest";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Profile {
  name: string;
  avatar: File | null;
  email: string;
  // phone?: string;
  // address?: string;
}

export default function UserInfo() {
  const { token } = useStateUserContext();

  const [data, setData] = useState<Profile>({ name: "", avatar: null, email: "" });
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const response = await GetRequestWithCre({ route: "api/user", token });
      if (response.success) {
        setData({
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar || null, 
        });
      }
      setLoading(false);
    };
    getProfile();
  }, [token]);
  

  // Cập nhật state data chung
  const handleInputChange = (field: keyof Profile, value: string | File) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  

  // Xử lý thay đổi ảnh đại diện
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange("avatar", file); // Lưu file trực tiếp vào state
    }
  };
  
  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("_method", "PATCH");
  
    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar); // Chỉ thêm avatar nếu người dùng upload file
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER}/api/update-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Gửi FormData
      });
  
      if (response.ok) {
        const result = await response.json();
        toast.success("Cập nhật thông tin thành công!");
        console.log("Kết quả:", result);
      } else {
        const error = await response.text();
        console.error("Lỗi cập nhật:", error);
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin.");
    }
  };
  

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
  
    try {
      const response = await PatchRequestWithCre({
        route: "api/user/change-password",
        body: {
          email: data.email,
          password: currentPassword,
          password_confirmation: newPassword,
          token: token,
        },
        token: token,
      });
  
      if (response.success) {
        toast.success("Đổi mật khẩu thành công!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(`Đổi mật khẩu thất bại: ${response.msg}`);
      }
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      toast.error("Đã xảy ra lỗi khi đổi mật khẩu.");
    }
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
              src={
                data.avatar
                  ? data.avatar instanceof File
                    ? URL.createObjectURL(data.avatar) 
                    : data.avatar 
                  : "https://via.placeholder.com/150"
              }
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
            { label: "Số điện thoại", value: "0918888465", field: "phone" },
            { label: "Địa chỉ", value: "Nhà số 2 kiệt 159 Hàn Mặc Tử", field: "address" },
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
