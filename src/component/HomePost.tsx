/** @format */

import PostItem from "./PostItem";

export default function HomePost() {
  const posts = [
    {
      title: "Tự Tin Thể Hiện Phong Cách Cá Nhân",
      description: "",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728527013/NB2188_Comp_E_Image2_ikwrcf.jpg",
    },
    {
      title: "Tuần lễ thiết kế thời trang",
      description: "",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526999/dd917974923cee1512063f480d690b7f_lie8tq.jpg",
    },
    {
      title: "Tuần lễ thời trang sale sốc",
      description: "",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526991/images_9_t49rpf.jpg",
    },
    {
      title: "Phong cách lịch lãm",
      description: "",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728526995/download_1_m8qwsr.jpg",
    },
    {
      title: "Tự Tin Thể Hiện Phong Cách ",
      description: "",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728527013/NB2188_Comp_E_Image2_ikwrcf.jpg",
    },
  ];
  return (
    <div className=" flex flex-col mx-auto py-16 items-center md:container">
      <h1 className=" font-light text-3xl">Bài đăng nổi bật </h1>
      <div className="flex px-24 py-8 space-x-3">
        <div className=" w-1/2">
          <PostItem
            post={posts[0]}
            main={true}
          ></PostItem>
        </div>
        <div className=" w-1/2 grid gap-3 grid-cols-2 ">
          {posts.map((post, index) => {
            if (index > 0) {
              return (
                <PostItem
                  post={post}
                  main={false}
                ></PostItem>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
