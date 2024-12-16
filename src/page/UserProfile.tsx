
import { useStateUserContext } from "../contexts/UserContextProvider";

export default function UserProfile() {
  const { user } = useStateUserContext(); 

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
      <p className="text-gray-600">Here you can view and update your profile information.</p>

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

      <div className="mt-6">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
