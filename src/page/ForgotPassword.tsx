/** @format */

import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../customhook/FetchHook";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import success from "../assets/img/success.webp";
import { Circles } from "react-loader-spinner";
import { GetPostRequest } from "../utilz/Request/postRequest";
interface LoginInterFace {
  email: string;
}
export default function ForgotPassword() {
  const [isSend, changeSend] = useState(false);
  const [data, changeDate] = useState<LoginInterFace>({
    email: "",
  });
  const { isLoading, setLoading } = useFetch();
  const onSubitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const { email } = data;
    if (!email) {
      Swal.fire({
        title: "Error!",
        text: "Vui lòng điền đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    console.log(email);
    const response = await GetPostRequest({
      route: "api/forgot-password",
      body: { email },
    });
    if (response.success) {
      changeSend(true);
      setLoading(false);
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
              <h5 className=" text-center text-3xl font-light pb-2">
                Quên mật khẩu
              </h5>
              <div className=" flex flex-col space-x-1">
                <p className=" text-sm">Email xác thực:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  value={data.email}
                  onChange={(e) => changeDate({ email: e.target.value })}
                />
              </div>
              <div className=" w-full flex justify-end space-x-2 italic text-xs">
                <Link to="/login">Đăng nhập ?</Link>
                <Link to="/register">Chưa có tài khoản ?</Link>
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
                    Gửi email xác nhận
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
                Đã gửi email xác nhận thành công, vui lòng kiểm tra email
              </h2>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
