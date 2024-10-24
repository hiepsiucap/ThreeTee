/** @format */

import waitting from "../assets/img/image.png";
export default function Description() {
  return (
    <section className=" w-full py-32 items-center flex  justify-center">
      <div className=" flex flex-col md:flex items-center">
        <img
          src={waitting}
          alt=""
          className=" w-96"
        />
        <h5 className=" text-2xl md:text-3xl text-center md:text-start mt-16 font-light">
          Nhóm mình đang phát triển thêm <br></br>các cậu đợi mình nhé !
        </h5>
      </div>
    </section>
  );
}
