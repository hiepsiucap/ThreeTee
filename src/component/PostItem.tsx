/** @format */

interface Post {
  title: string;
  description: string;
  img: string;
}
export default function PostItem({
  post,
  main,
}: {
  post: Post;
  main: boolean;
}) {
  return (
    <div className=" relative w-full h-full">
      <img
        src={post.img}
        alt=""
        className=" w-full h-full"
      />
      <div
        className={
          main
            ? "  absolute bottom-7 left-6 font-light text-white text-2xl font-roboto"
            : "  absolute bottom-0 bg-black w-full bg-opacity-10 font-light px-2 py-1 left-0 text-white  font-roboto"
        }
      >
        <h5>{post.title}</h5>
        <button className=" bg-white text-black text-sm px-4 py-2 rounded-lg my-1">
          Đọc ngay
        </button>
      </div>
    </div>
  );
}
