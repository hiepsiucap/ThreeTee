/** @format */

import { useState } from "react";
import plus from "../assets/icon/plus.svg";
import minus from "../assets/icon/minus.svg";
import { formatPrice } from "../utilz/Price";
import Loading from "../component/Loading";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { useStateCartContext } from "../contexts/CartContext";
import { GetPostRequestWithCre } from "../utilz/Request/postRequest";
import Swal from "sweetalert2";
export default function CheckOut() {
  const [data, setData] = useState({
    name: "",
    phonenumber: "",
    address: "",
    method: "qr",
  });
  const [loading, changeloading] = useState(false);
  const { cart, DeleteCart, AddCart, MinusCart, getTotal } =
    useStateCartContext();
  const { token } = useStateUserContext();
  const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    changeloading(true);
    try {
      if (!cart || cart?.length < 0) throw Error("Giỏ hàng không tồn tại ");
      const response = await GetPostRequestWithCre({
        route: "api/orders",
        body: {
          phonenumber: data.phonenumber,
          address: data.address,
          totalprice: getTotal(),
        },
        token,
      });
      if (!response.success) {
        throw new Error(response.msg);
      }
      await Promise.all(
        cart?.map((c) =>
          GetPostRequestWithCre({
            route: "api/order_details",
            body: {
              order_id: response.data.data.id,
              product_detail_id: c.productdetailId,
              amount: c.amount,
            },
            token,
          }).then((res) => {
            if (!res.success) throw new Error(res.msg);
          })
        )
      );
      const anores = await GetPostRequestWithCre({
        route: `api/orders/${response.data.data.id}/payment-link`,
        body: {},
        token,
      });
      if (!anores.success) throw new Error(anores.msg);

      window.location.href = anores.data.payment_link;
    } catch (e) {
      if (e instanceof Error) {
        changeloading(false);
        return Swal.fire({
          title: "Lỗi rồi",
          text: e.message,
          icon: "error",
          confirmButtonText: "Trở lại",
        });
      }
    }
    changeloading(false);
  };
  return (
    <section className=" md:container mx-auto">
      <form
        onSubmit={onSubmitHandler}
        className="   "
      >
        <Loading modalIsOpen={loading}></Loading>
        <div className="flex flex-col md:flex-row items-center md:space-x-10">
          <div className=" flex flex-col w-full px-6 md:px-0 md:w-1/2 ">
            <p className=" text-2xl md:py-6 py-3">Thông tin đặt hàng</p>
            <div className=" bg-slate-50 p-12  flex flex-col space-y-6">
              <h2 className="text-xl font-light  py-2">Thông tin cá nhân</h2>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">Tên khách hàng:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">Số điện thoại:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  value={data.phonenumber}
                  onChange={(e) =>
                    setData({ ...data, phonenumber: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">Địa chỉ giao hàng:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />
              </div>
              <h2 className="text-lg font-light py-2">
                Chọn Phương Thức Thanh Toán
              </h2>
              <div className="space-y-3">
                {/* Phương thức QR Code */}
                <label
                  className={`flex items-center space-x-3 p-3 border rounded-md cursor-pointer 
          transition-all duration-300 ease-in-out
          ${
            data.method === "qr"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:bg-gray-50"
          }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={data.method === "qr"}
                    onChange={() =>
                      setData((prev) => {
                        return { ...prev, method: "qr" };
                      })
                    }
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <rect
                        width="16"
                        height="16"
                        x="4"
                        y="4"
                        rx="2"
                      />
                      <path d="M16 8h.01" />
                      <path d="M4 12h16" />
                      <path d="M20 16h-4" />
                      <path d="M4 16h10" />
                    </svg>
                    <span className="text-gray-700 font-light">
                      Thanh Toán Qua QR Code
                    </span>
                  </span>
                </label>

                {/* Phương thức Thanh toán khi nhận hàng */}
                <label
                  className={`flex items-center space-x-3 p-3 border rounded-md cursor-pointer 
          transition-all duration-300 ease-in-out
          ${
            data.method === "cod"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:bg-gray-50"
          }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={data.method === "cod"}
                    onChange={() =>
                      setData((prev) => {
                        return { ...prev, method: "cod" };
                      })
                    }
                    className="form-radio h-5 w-5 text-green-600"
                  />
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <rect
                        width="20"
                        height="8"
                        x="2"
                        y="7"
                        rx="4"
                        ry="4"
                      />
                      <path d="M22 17v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1z" />
                      <path d="M8 13v-2" />
                      <path d="M16 13v-2" />
                    </svg>
                    <span className="text-gray-700 font-light">
                      Thanh Toán Khi Nhận Hàng
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className=" md:w-1/2 flex flex-col space-y-4">
            <div className=" flex justify-between">
              <p className=" text-xl md:text-2xl py-4">Danh sách sản phẩm</p>
              <p className=" text-lg py-4 px-3">Đơn giá</p>
            </div>

            <div className=" flex flex-col space-y-6 py-6">
              {cart && cart?.length > 0 ? (
                cart?.map((c) => {
                  return (
                    <div
                      key={c.productdetailId}
                      className=" flex justify-between space-x-2 items-center"
                    >
                      <div className=" flex space-x-5 items-center">
                        <div className=" w-36 h-36">
                          <img
                            src={c.image}
                            alt=""
                            className=" w-40 h-40"
                          />
                        </div>
                        <div className=" flex flex-col space-y-1 items-start">
                          <p className=" text-lg  font-light">{c.name}</p>

                          <p className="text-lg py-1">
                            {formatPrice(Number(c.price))}
                          </p>
                          <p className="font-light">
                            size:{" "}
                            <span className=" font-semibold">{c.size}</span>
                          </p>
                          <p className=" text-gray-600 text-sm py-1">
                            Số lượng: {c.amount}
                          </p>
                          <div className=" flex space-x-2 items-end">
                            <button
                              type="button"
                              onClick={() => {
                                AddCart(c);
                              }}
                              className=" border-black p-1 border"
                            >
                              <img
                                src={plus}
                                alt=""
                                className=" w-5 h-5"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                MinusCart(c.productdetailId);
                              }}
                              className=" border-black p-1 border"
                            >
                              <img
                                src={minus}
                                alt=""
                                className=" w-5 h-5"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                DeleteCart(c.productdetailId);
                              }}
                              className=" text-sm underline  "
                            >
                              Xoá sản phẩm
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className=" flex flex-col items-center">
                        <p className=" text-xl font-light pb-2">
                          {formatPrice(Number(c.price) * Number(c.amount))}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className=" text-2xl font-light">Không có sản phẩm nào</p>
              )}
            </div>
            <div className=" flex justify-between">
              <p className=" font-light">Mã khuyến mãi</p>
              <div>
                <img
                  src={plus}
                  alt={``}
                  className=" w-6 h-6"
                />
              </div>
            </div>
            <div className=" flex justify-between flex-end">
              <p className="font-light">Đơn giá:</p>
              <div>
                <p className=" text-gray-800 font-light">
                  {getTotal().toLocaleString() + " VNĐ"}
                </p>
              </div>
            </div>
            <div className=" flex justify-between items-end">
              <p className="font-light">Phí shipping:</p>
              <div>
                <p className=" text-gray-800 font-light">Miễn phí</p>
              </div>
            </div>
            <div className=" flex justify-between">
              <p className="font-light">Thuế (10%):</p>
              <div>
                <p className=" text-gray-800 font-light">
                  {" "}
                  {(getTotal() * 0.1).toLocaleString() + " VNĐ"}
                </p>
              </div>
            </div>
            <div className=" flex justify-between items-end">
              <p className="font-light">Tổng tiền:</p>
              <div>
                <p className=" text-gray-800 font-light text-xl">
                  {" "}
                  {(getTotal() * 1.1).toLocaleString() + " VNĐ"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center mt-12">
          <button className=" font-light text-lg border-2 mb-1  border-gray-800 rounded-md py-3 px-16">
            Thanh toán ngay
          </button>
        </div>
      </form>
    </section>
  );
}
