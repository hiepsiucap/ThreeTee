/** @format */
import { Link } from "react-router-dom";
interface Post {
  title: string;
  link: string;
  img: string;
  Date: string;
  username: string;
  ava: string;
}
export default function PostItems({
  post,
  size,
}: {
  post: Post;
  size: string;
}) {
  return (
    <Link
      to={post.link}
      className=" relative w-full h-full flex flex-col space-x-2"
    >
      <img
        src={post.img}
        alt=""
        className=" w-full"
      />
      <div className=" flex flex-col space-y-2 py-4">
        <div>
          <h5
            className={
              size == "big" ? " font-light text-2xl" : "font-light text-xl"
            }
          >
            {post.title}
          </h5>
        </div>
        <div className=" flex font-light justify-between">
          <div className=" flex items-center space-x-3">
            <img
              src={post.ava}
              alt=""
              className=" w-6 h-6 rounded-full"
            />
            <div className="   text-gray-700">{post.username}</div>
          </div>
          <div>{post.Date}</div>
        </div>
      </div>
    </Link>
  );
}
