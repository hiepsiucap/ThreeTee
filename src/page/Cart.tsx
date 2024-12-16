/** @format */
import plus from "../assets/icon/plus.svg";
export default function Cart() {
  return (
    <section className=" md:container mx-auto flex space-x-6">
      <div className=" w-7/12">
        <h2 className=" text-2xl py-2 pt-6"> Giỏ hàng</h2>
        <div className=" flex flex-col space-y-6"></div>
      </div>
      <div className=" p-6 bg-slate-100 w-5/12">
        <h2 className=" text-2xl py-2 pb-4"> Tổng tiền</h2>
        <div className=" flex justify-between">
          <p className="">Mã khuyến mãi</p>
          <div>
            <img
              src={plus}
              alt={``}
              className=" w-6 h-6"
            />
          </div>
        </div>
        <div className=" flex justify-between">
          <p className="">Đơn giá:</p>
          <div>
            <img
              src={plus}
              alt={``}
              className=" w-6 h-6"
            />
          </div>
        </div>
        <div className=" flex justify-between">
          <p className="">Phí shipping:</p>
          <div>
            <p className=" text-gray-800 font-semibold"></p>
          </div>
        </div>
        <div className=" flex justify-between">
          <p className="">Tổng tiền:</p>
          <div>
            <img
              src={plus}
              alt={``}
              className=" w-6 h-6"
            />
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}
