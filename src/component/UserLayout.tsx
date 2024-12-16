/** @format */

import { Outlet, Link, useLocation } from "react-router-dom";
import { useStateUserContext } from "../contexts/UserContextProvider";

export default function UserLayout() {
  const location = useLocation();
  const { user } = useStateUserContext();

  // Define reusable classes for active menu items
  const activeClass = "bg-indigo-200 font-bold text-indigo-700";
  const menuClass = "px-4 py-2 rounded-lg hover:bg-indigo-100 transition duration-150";

  return (
    <div className="flex h-full min-h-screen w-full bg-gray-50">
      {/* Settings Menu */}
      <aside className="w-1/4 min-w-[250px] bg-white p-6 border-r shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Settings</h2>

        {/* Personal Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Personal</h3>
          <nav className="flex flex-col gap-2">
            <Link
              to="/user/profile"
              className={`${menuClass} ${
                location.pathname === "/user/profile" ? activeClass : ""
              }`}
            >
              Tài khoản
            </Link>
            <Link
              to="/user/api-keys"
              className={`${menuClass} ${
                location.pathname === "/user/order" ? activeClass : ""
              }`}
            >
              Đơn hàng 
            </Link>
            <Link
              to="/user/notifications"
              className={`${menuClass} ${
                location.pathname === "/user/notifications" ? activeClass : ""
              }`}
            >
              Notifications
            </Link>
          </nav>
        </div>

        {/* Workspace Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Workspace</h3>
          <nav className="flex flex-col gap-2">
            <Link
              to="/user/billing"
              className={`${menuClass} ${
                location.pathname === "/user/billing" ? activeClass : ""
              }`}
            >
              Billing
            </Link>
            <Link
              to="/user/integrations"
              className={`${menuClass} ${
                location.pathname === "/user/integrations" ? activeClass : ""
              }`}
            >
              Integrations
            </Link>
            <Link
              to="/user/team"
              className={`${menuClass} ${
                location.pathname === "/user/team" ? activeClass : ""
              }`}
            >
              Team Members
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
            <p className="text-gray-500 mt-2">
              Update your profile and personal details here.
            </p>
          </header>

          {/* Content Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
