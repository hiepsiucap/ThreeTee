/** @format */
import cancel from "../assets/img/cancel.webp";
import { Link } from "react-router-dom";

export default function CancelPage() {
  return (
    <div className=" h-screen flex flex-col py-24 space-y-6 items-center">
      <img
        src={cancel}
        alt=""
        className=" w-24 h-24 animate-bounce"
      />
      <p className=" font-poppins text-3xl ">Đơn hàng đã bị huỷ ! </p>
      <div className=" py-8">
        <Link
          to="/"
          className=" bg-primary font-poppins text-lg py-3 px-8 text-white rounded-lg "
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}
