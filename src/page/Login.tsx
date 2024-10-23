/** @format */
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div>
      <section className=" w-screen  h-screen bg-slate-50 flex items-center font-light justify-center ">
        <div className=" bg-white min-w-64 w-1/3  rounded-md shadow-lg py-12 px-6">
          <form
            action=""
            className=" flex flex-col space-y-6"
          >
            <h5 className=" text-center text-3xl font-light pb-2">Đăng nhập</h5>
            <div className=" flex flex-col space-x-1">
              <p className=" text-sm">Tên đăng nhập:</p>
              <input
                className="border border-gray-400 rounded-md py-2 px-4"
                type="text"
              />
            </div>
            <div className=" flex flex-col space-x-1">
              <p className=" text-sm">Tên đăng nhập:</p>
              <input
                className="border border-gray-400 rounded-md py-2 px-4"
                type="text"
              />
            </div>
            <div className=" w-full flex justify-end space-x-2 italic text-xs">
              <Link to="/forgotpassword">Quên mật khẩu ?</Link>
              <Link to="/register">Chưa có tài khoản ?</Link>
            </div>
            <div className=" pt-4 w-1/2 mx-auto ">
              <button className="  border border-gray-400 w-full py-2 px-4 rounded-md">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
