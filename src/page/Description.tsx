/** @format */

import React from "react";
import waitting from "../assets/img/image.png";
export default function Description() {
  return (
    <section className=" w-full py-32 items-center flex  justify-center">
      <div className=" flex items-center">
        <img
          src={waitting}
          alt=""
          className=" w-96"
        />
        <h5 className=" text-3xl mt-16 font-light">
          Nhóm mình đang phát triển thêm <br></br>các cậu đợi mình nhé !
        </h5>
      </div>
    </section>
  );
}
