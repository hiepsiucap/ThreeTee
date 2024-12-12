/** @format */

import { useEffect, useState } from "react";
import success from "../assets/img/success.webp";
import { Circles } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import cancel from "../assets/img/cancel.webp";
import { Link } from "react-router-dom";
export default function VerificationEmail() {
  const [status, changestatus] = useState("none");
  const url = useLocation();
  useEffect(() => {
    if (url.search) {
      const getRequest = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL_SERVER}/api/verify-email${
              url.search
            }`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
            }
          );
          if (response.ok) {
            changestatus("success");
          } else {
            changestatus("cancel");
          }
        } catch {
          changestatus("cancel");
        }
      };
      getRequest();
    }
  }, [url]);
  return (
    <section className=" w-screen  h-screen bg-slate-50 flex items-center font-light justify-center ">
      <div className=" bg-white min-w-64 w-1/3  rounded-md shadow-lg py-12 px-6">
        {status == "success" ? (
          <section className=" flex flex-col w-full items-center space-y-12 py-24">
            <img
              src={success}
              className=" w-24 h-24 animate-bounce"
              alt=""
            />
            <h2 className=" text-lg font-mono text-center font-semibold">
              Tài khoản xác thực thành công, đăng nhập tại
            </h2>
            <Link
              to="/login"
              className=" font-mono text-lg text-primary2 bg-primary rounded-lg py-2 px-6"
            >
              Đăng nhập
            </Link>
          </section>
        ) : status == "cancel" ? (
          <section className=" flex flex-col w-full items-center space-y-12 py-24">
            <img
              src={cancel}
              className=" w-24 h-24 animate-bounce"
              alt=""
            />
            <h2 className=" text-lg font-mono text-center font-semibold">
              Xác thức thất bại, Vui lòng kiểm tra lại !
            </h2>
          </section>
        ) : (
          <section className=" flex flex-col w-full items-center space-y-12 py-24">
            <Circles
              height="64"
              width="64"
              color="green"
              ariaLabel="loading"
            />
            <h2 className=" animate-pulse text- text-lg font-mono text-center font-semibold">
              Vui lòng đợi trong giây lát ....
            </h2>
          </section>
        )}
      </div>
    </section>
  );
}
