/** @format */
import { Link } from "react-router-dom";
import { formatPrice } from "../utilz/Price";
export default function ProductItem3D() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:p-8">
      <Link to="/producthoodie">
        <div className=" flex flex-col space-x-2 items-center">
          <div className=" flex justify-center">
            <img
              src={
                "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1734748191/Screenshot_2024-12-21_at_09.28.02_wxcljz.png"
              }
              alt=""
              className="w-[300px] h-[300px]"
            />
          </div>
          <div className=" text-sm text-amber-600">Giảm 20%</div>
          <div className=" pt-2 md:text-sm text-xl md:font-semibold">
            Áo Hoddie tự custom
          </div>
          <div className=" text-gray-500 text-xs">Custom</div>
          <div className=" md:font-bold text-lg  md:text-sm py-2">
            {formatPrice(300000)}
          </div>
        </div>
      </Link>

      <Link to="/producthat">
        <div className=" flex flex-col space-x-2 items-center">
          <div className=" flex justify-center">
            <img
              src={
                "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1734749444/christmas-hat-png-15_cya3e8.png"
              }
              alt=""
              className="w-[300px] h-[300px]"
            />
          </div>
          <div className=" text-sm text-amber-600">Giảm 30%</div>
          <div className=" pt-2 md:text-sm text-xl md:font-semibold">
            Mũ quai nón tự custom
          </div>
          <div className=" text-gray-500 text-xs">Custom</div>
          <div className=" md:font-bold text-lg  md:text-sm py-2">
            {formatPrice(100000)}
          </div>
        </div>
      </Link>
      <Link to="/productshirt">
        <div className=" flex flex-col space-x-2 items-center">
          <div className=" flex justify-center">
            <img
              src={
                "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1734748692/shirt_qarqza.png"
              }
              alt=""
              className="w-[300px] h-[300px]"
            />
          </div>
          <div className=" text-sm text-amber-600">Giảm 20%</div>
          <div className=" pt-2 md:text-sm text-xl md:font-semibold">
            Áo Phông tự custom
          </div>
          <div className=" text-gray-500 text-xs">Custom</div>
          <div className=" md:font-bold text-lg  md:text-sm py-2">
            {formatPrice(200000)}
          </div>
        </div>
      </Link>
    </div>
  );
}
