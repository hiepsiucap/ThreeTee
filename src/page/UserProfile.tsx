import { useState, useRef } from "react";
import { useStateUserContext } from "../contexts/UserContextProvider";

export default function UserProfile() {
  const { user, setUserWithStorage } = useStateUserContext(); // Sử dụng setUserWithStorage từ context
  const [password, setPassword] = useState(""); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Xác nhận mật khẩu
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const avatarInputRef = useRef(null); // Dùng để chọn avatar mới

  // Xử lý đổi mật khẩu
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER}/api/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Failed to update password");
      } else {
        alert("Password successfully updated!");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating password");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý upload avatar
  const handleAvatarUpload = async () => {
    const file = avatarInputRef.current;
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER}/api/user/update-avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Failed to upload avatar");
      } else {
        const updatedUser = await response.json(); // API trả về dữ liệu user đã cập nhật
        setUserWithStorage(updatedUser); // Cập nhật state user và localStorage
        alert("Avatar updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("An error occurred while uploading avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
      <p className="text-gray-600">Here you can view and update your profile information.</p>

      {/* Avatar Section */}
      <div className="mt-6 flex items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
          <img
            src={user?.ava || "https://via.placeholder.com/96"}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <label
            htmlFor="avatar-upload"
            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition duration-150 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Uploading..." : "Change Avatar"}
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            className="hidden"
            ref={avatarInputRef}
            onChange={handleAvatarUpload}
            disabled={loading}
          />
        </div>
      </div>

      {/* User Info Section */}
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <label className="w-32 font-semibold text-gray-700">Name:</label>
          <span className="text-gray-800">{user?.name}</span>
        </div>
        <div className="flex items-center mb-4">
          <label className="w-32 font-semibold text-gray-700">Email:</label>
          <span className="text-gray-800">{user?.email}</span>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <div>
            <label htmlFor="new-password" className="block text-gray-700 font-medium mb-2">
              New Password:
            </label>
            <input
              type="password"
              id="new-password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
