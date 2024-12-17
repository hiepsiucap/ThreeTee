/** @format */

import { Star } from "lucide-react";
interface Review {
  order_id: number;
  user_id: number;
  product_id: number;
  score: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
}
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  role: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}
export default function Comment({ review }: { review: Review[] }) {
  return (
    <section className=" text-black px-12 py-12 font-light">
      <h5 className=" font-light text-3xl">
        Bình luận{" "}
        <span className=" text-2xl"> {"(" + review.length + ")"}</span>
      </h5>
      <div className=" flex flex-col py-6 space-y-8">
        {review.map((cm) => {
          return (
            <div
              key={cm.user_id}
              className="  flex flex-col space-y-3"
            >
              <div className=" flex items-center  space-x-3">
                <div>
                  <img
                    src={cm.user.avatar}
                    alt={cm.user.name}
                    className=" w-14 h-14 rounded-full"
                  />
                </div>
                <div className=" text-xl font-light">
                  <p>{cm.user.name}</p>
                  <div className="flex gap-1">
                    {[...Array(cm.score)].map((_, index) => (
                      <Star
                        key={index}
                        className="text-yellow-400 w-4 h-4 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className=" pl-4">{cm.comment}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
