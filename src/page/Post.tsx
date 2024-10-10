/** @format */

import React from "react";
import { PostItems } from "../component";
import { motion } from "framer-motion";
export default function Post() {
  const posts = [
    {
      title: "Xu hướng thời trang Thu Đông 2024",
      link: "https://example.com/xu-huong-thoi-trang-thu-dong-2024",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728584791/post2_lm4cau.jpg",
      Date: "2024-10-11",
      username: "nguyenAnh",
      ava: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1703314565/UserAvatar/imkun72e2m11al7iwfwz.jpg",
    },
    {
      title: "Bí quyết phối đồ đi làm sang trọng",
      link: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728584790/hq720_ve1h9e.jpg",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728585979/1721288354-191-thumbnail-width2032height1524_prjhug.jpg",
      Date: "2024-10-10",
      username: "hoangMinh",
      ava: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1703314565/UserAvatar/imkun72e2m11al7iwfwz.jpg",
    },
    {
      title: "Những mẫu váy mùa hè không thể bỏ qua",
      link: "https://example.com/mau-vay-mua-he",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728585887/phoi-do-voi-quan-ong-rong-3_vnexy4.png",
      Date: "2024-09-30",
      username: "leThao",
      ava: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1703314565/UserAvatar/imkun72e2m11al7iwfwz.jpg",
    },
    {
      title: "Top 10 phụ kiện thời trang ấn tượng năm 2024",
      link: "https://example.com/phu-kien-thoi-trang-2024",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728527013/NB2188_Comp_E_Image2_ikwrcf.jpg",
      Date: "2024-09-28",
      username: "trangLe",
      ava: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1703314565/UserAvatar/imkun72e2m11al7iwfwz.jpg",
    },
    {
      title: "Phong cách thời trang công sở tối giản",
      link: "https://example.com/thoi-trang-cong-so",
      img: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1728527013/NB2188_Comp_E_Image2_ikwrcf.jpg",
      Date: "2024-09-15",
      username: "quyenHa",
      ava: "https://res.cloudinary.com/dhhuv7n0h/image/upload/v1703314565/UserAvatar/imkun72e2m11al7iwfwz.jpg",
    },
  ];

  return (
    <section className=" md:container mx-auto">
      <h1 className=" text-3xl font-light px-12 py-6">Nổi bật</h1>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className=" flex space-x-5 px-12"
      >
        <div className=" w-3/4 h-full">
          <PostItems
            post={posts[0]}
            size="big"
          ></PostItems>
        </div>
        <div className=" w-1/4 flex flex-col space-y-5">
          <PostItems
            post={posts[1]}
            size="small"
          ></PostItems>
          <PostItems
            post={posts[2]}
            size="small"
          ></PostItems>
        </div>
      </motion.div>
      <p className=" text-xl font-light py-12 px-12">Các bài đăng khác</p>
      <div className="px-12 grid grid-cols-3 gap-5">
        <PostItems
          post={posts[0]}
          size="small"
        ></PostItems>
        <PostItems
          post={posts[0]}
          size="small"
        ></PostItems>
        <PostItems
          post={posts[0]}
          size="small"
        ></PostItems>
        <PostItems
          post={posts[0]}
          size="small"
        ></PostItems>
        <PostItems
          post={posts[0]}
          size="small"
        ></PostItems>
        <PostItems
          post={posts[0]}
          size="small"
        ></PostItems>
      </div>
    </section>
  );
}
