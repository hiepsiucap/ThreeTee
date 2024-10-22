/** @format */

import PostItem from "./PostItem";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
export default function HomePost() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ kích hoạt một lần khi phần tử vào view
    threshold: 0.1, // Tỉ lệ phần tử phải có trong viewport để kích hoạt
  });
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
      <div className=" flex-col hidden md:flex md:flex-row px-12 md:px-24 py-4 md:py-8 space-x-3">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/2"
        >
          <PostItem
            post={posts[0]}
            main={true}
          ></PostItem>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          ref={ref}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className=" md:w-1/2 md:grid md:gap-3 md:grid-cols-2 "
        >
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
        </motion.div>
      </div>
      <div className=" flex md:hidden mx-6 space-y-4 py-4 flex-col">
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
  );
}
