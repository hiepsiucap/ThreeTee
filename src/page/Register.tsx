/** @format */
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../customhook/FetchHook";
import { GetPostRequest } from "../utilz/Request/postRequest";
import Swal from "sweetalert2";
import { Circles } from "react-loader-spinner";
import success from "../assets/img/success.webp";
interface LoginInterFace {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
}
export default function Register() {
  const [isSend, changeSend] = useState<boolean>(false);
  const [data, changeData] = useState<LoginInterFace>({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
  });
  const onChangeData = (e: { target: { name: string; value: string } }) => {
    changeData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const { isLoading, setLoading } = useFetch();
  const onSubitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    const { email, password, password_confirmation, name } = data;
    if (!email || !password || !password_confirmation || !name) {
      Swal.fire({
        title: "Error!",
        text: "Vui lòng điền đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    const response = await GetPostRequest({
      route: "api/register",
      body: { email, password, password_confirmation, name },
    });
    if (response.success) {
      setLoading(false);
      changeSend(true);
    } else {
      Swal.fire({
        title: "Error!",
        text: response.msg,
        icon: "error",
        confirmButtonText: "Cool",
      });
      setLoading(false);
    }
    return;
  };
  return (
    <div>
      <section className=" w-screen  h-screen bg-slate-50 flex items-center font-light justify-center ">
        <div className=" bg-white min-w-64 w-1/3  rounded-md shadow-lg py-12 px-6">
          {!isSend ? (
            <form
              onSubmit={onSubitHandler}
              className=" flex flex-col space-y-6"
            >
              <h5 className=" text-center text-3xl font-light pb-2">Đăng Ký</h5>
              <div className=" flex flex-col space-x-1">
                <p className=" text-sm">Email đăng kí:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={onChangeData}
                />
              </div>
              <div className=" flex flex-col space-x-1">
                <p className=" text-sm">Tên của bạn:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={onChangeData}
                />
              </div>
              <div className=" flex flex-col space-x-1">
                <p className=" text-sm">Mật khẩu:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  name="password"
                  value={data.password}
                  onChange={onChangeData}
                />
              </div>
              <div className=" flex flex-col space-x-1">
                <p className=" text-sm">Nhập lại mật khẩu:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={onChangeData}
                />
              </div>
              <div className=" w-full flex justify-end space-x-2 italic text-xs">
                <Link to="/forgotpassword">Quên mật khẩu ?</Link>
                <Link to="/login">Đã có tài khoản ?</Link>
              </div>
              <div className=" pt-4 w-1/2 mx-auto ">
                {isLoading ? (
                  <button
                    disabled
                    className="  border border-gray-400 flex justify-center w-full py-2 px-4 rounded-md"
                  >
                    <Circles
                      height="24"
                      width="24"
                      color="green"
                      ariaLabel="loading"
                    />
                  </button>
                ) : (
                  <button className="  border border-gray-400 flex justify-center w-full py-2 px-4 rounded-md">
                    Đăng ký
                  </button>
                )}
              </div>
            </form>
          ) : (
            <section className=" flex flex-col w-full items-center space-y-12 py-24">
              <img
                src={success}
                className=" w-24 h-24 animate-bounce"
                alt=""
              />
              <h2 className=" text-lg font-mono text-center font-semibold">
                Tài khoản đăng kí thành công, vui lòng kiểm tra email
              </h2>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
