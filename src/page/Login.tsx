/** @format */
import { Link } from "react-router-dom";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { useState } from "react";
import useFetch from "../customhook/FetchHook";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import { Circles } from "react-loader-spinner";
import { GetPostRequest } from "../utilz/Request/postRequest";
interface LoginInterFace {
  email: string;
  password: string;
}
export default function Login() {
  const { setToken, setUserWithStorage } = useStateUserContext();
  const navigate = useNavigate();
  const [data, changeDate] = useState<LoginInterFace>({
    email: "",
    password: "",
  });
  const { isLoading, setLoading } = useFetch();
  const onSubitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = data;
    if (!email || !password) {
      Swal.fire({
        title: "Error!",
        text: "Vui lòng điền đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    const response = await GetPostRequest({
      route: "api/login",
      body: { email, password },
    });
    if (response.success) {
      setToken(response.data?.token);
      setUserWithStorage(response.data?.user);
      navigate("/admin");
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
          <form
            onSubmit={onSubitHandler}
            className=" flex flex-col space-y-6"
          >
            <h5 className=" text-center text-3xl font-light pb-2">Đăng nhập</h5>
            <div className=" flex flex-col space-x-1">
              <p className=" text-sm">Tên đăng nhập:</p>
              <input
                className="border border-gray-400 rounded-md py-2 px-4"
                type="text"
                value={data.email}
                onChange={(e) => changeDate({ ...data, email: e.target.value })}
              />
            </div>
            <div className=" flex flex-col space-x-1">
              <p className=" text-sm">Mật khẩu :</p>
              <input
                className="border border-gray-400 rounded-md py-2 px-4"
                type="password"
                value={data.password}
                onChange={(e) =>
                  changeDate({ ...data, password: e.target.value })
                }
              />
            </div>
            <div className=" w-full flex justify-end space-x-2 italic text-xs">
              <Link to="/forgotpassword">Quên mật khẩu ?</Link>
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
                  Đăng nhập
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
