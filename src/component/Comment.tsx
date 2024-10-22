/** @format */

import { Star } from "lucide-react";
export default function Comment() {
  const listcomment = [
    {
      ava: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg",
      name: "Nguyễn Hồng Hiệp",
      text: "Chất vải rất sướng, nịnh da",
      start: 5,
    },
    {
      ava: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg",
      name: "Nguyễn Hồng Hiệp",
      text: "Chất vải rất sướng, nịnh da",
      start: 5,
    },
    {
      ava: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1721986324/default_ava.jpg",
      name: "Nguyễn Hồng Hiệp",
      text: "Chất vải rất sướng, nịnh da",
      start: 5,
    },
  ];
  return (
    <section className=" text-black px-12 py-12 font-light">
      <h5 className=" font-light text-3xl">
        Bình luận{" "}
        <span className=" text-2xl"> {"(" + listcomment.length + ")"}</span>
      </h5>
      <div className=" flex flex-col py-6 space-y-8">
        {listcomment.map((cm) => {
          return (
            <div className="  flex flex-col space-y-3">
              <div className=" flex items-center  space-x-3">
                <div>
                  <img
                    src={cm.ava}
                    alt={cm.name}
                    className=" w-14 h-14 rounded-full"
                  />
                </div>
                <div className=" text-xl font-light">
                  <p>{cm.name}</p>
                  <div className="flex gap-1">
                    {[...Array(cm.start)].map((_, index) => (
                      <Star
                        key={index}
                        className="text-yellow-400 w-4 h-4 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className=" pl-4">{cm.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
