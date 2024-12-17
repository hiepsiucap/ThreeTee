/** @format */
import plus from "../assets/icon/plus.svg";
import minus from "../assets/icon/minus.svg";
import { useStateCartContext } from "../contexts/CartContext";
import { formatPrice } from "../utilz/Price";
import refund from "../assets/icon/refund.png";
import delivery from "../assets/icon/delivery.png";
export default function Cart() {
  const { cart, DeleteCart, AddCart, MinusCart, getTotal } =
    useStateCartContext();
  return (
    <section className=" md:container mx-auto flex space-x-10">
      <div className=" w-2/3">
        <h2 className=" text-2xl py-2 pt-6"> Giỏ hàng</h2>
        <div className=" flex flex-col space-y-6 py-6">
          {cart && cart?.length > 0 ? (
            cart?.map((c) => {
              return (
                <div
                  key={c.productId}
                  className=" flex justify-between space-x-2 items-center"
                >
                  <div className=" flex space-x-5 items-center">
                    <div className=" w-48 h-48">
                      <img
                        src={c.image}
                        alt=""
                        className=" w-48 h-48"
                      />
                    </div>
                    <div className=" flex flex-col space-y-1 items-start">
                      <p className=" text-2xl  font-light">{c.name}</p>
                      <p className="   border-gray-700 pb-4">{c.category}</p>
                      <p className="text-xl py-1">
                        {formatPrice(Number(c.price))}
                      </p>
                      <p className=" text-gray-600 text-sm py-1">
                        Số lượng: {c.amount}
                      </p>
                      <div className=" flex space-x-2 items-end">
                        <button
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
                    <p className=" text-2xl font-light pb-2">
                      {formatPrice(Number(c.price) * Number(c.amount))}
                    </p>
                    <div
                      className=" bg-slate-100 p-2 rounded-lg flex space-x-2 pt-2
                    "
                    >
                      <img
                        src={delivery}
                        alt=""
                        className=" w-5 h-5"
                      />
                      <p className=" text-sm text-light  italic">
                        Giao hàng siêu tốc 1-2 ngày
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className=" text-2xl font-light">Không có sản phẩm nào</p>
          )}
        </div>
      </div>
      {getTotal() > 0 && (
        <div className=" mt-12 p-8 bg-slate-100 w-1/3  space-y-6">
          <h2 className=" text-2xl py-2 pb-4"> Tổng tiền thanh toán</h2>
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
          <div className=" flex flex-col space-x-1 items-center justify-center py-8">
            <button className=" font-light text-lg border-2 mb-1  border-gray-800 rounded-md py-3 px-16">
              Mua ngay
            </button>
            <div
              className=" bg-slate-100 p-1   rounded-lg flex space-x-2 pt-8
                    "
            >
              <img
                src={delivery}
                alt=""
                className=" w-5 h-5"
              />
              <p className=" text-sm text-light  italic">
                Giao hàng siêu tốc 1-2 ngày
              </p>
            </div>
            <div
              className=" bg-slate-100 p-1 rounded-lg flex space-x-2 pt-1
                    "
            >
              <img
                src={refund}
                alt=""
                className=" w-5 h-5"
              />
              <p className=" text-sm text-light  italic">
                Kiểm tra hàng, đổi trả 30 ngày
              </p>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </section>
  );
}
