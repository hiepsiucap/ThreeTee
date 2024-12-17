import { useState } from "react";
import { motion } from "framer-motion";
// import { GetRequestWithCre } from "../utilz/Request/getRequest";
// import { useStateUserContext } from "../contexts/UserContextProvider";
import Loading from "./Loading";

const fakeOrders = [
  {
    id: "ORD001",
    createdAt: "2024-12-01T14:30:00Z",
    status: "completed",
    total: 150000,
    items: [
      { name: "Sản phẩm A", quantity: 2, price: 50000 },
      { name: "Sản phẩm B", quantity: 1, price: 50000 },
    ],
  },
  {
    id: "ORD002",
    createdAt: "2024-11-29T10:15:00Z",
    status: "pending",
    total: 200000,
    items: [
      { name: "Sản phẩm C", quantity: 3, price: 60000 },
      { name: "Sản phẩm D", quantity: 2, price: 40000 },
    ],
  },
];

export default function UserOrder() {
  const [orders, setOrders] = useState(fakeOrders);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | typeof fakeOrders[0]>(null);

  if (loading) {
    return <Loading modalIsOpen={loading} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="w-full">
        {!selectedOrder ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Danh sách đơn hàng</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">Mã đơn hàng: {order.id}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status === "completed"
                          ? "Hoàn thành"
                          : order.status === "pending"
                          ? "Đang xử lý"
                          : "Hủy"}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      <p>Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p>Tổng tiền: {order.total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mb-4 text-blue-500 hover:underline"
            >
              &larr; Quay lại danh sách đơn hàng
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Chi tiết đơn hàng: {selectedOrder.id}
            </h2>
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 mb-4">
                Ngày tạo: {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">
                Tổng tiền: {selectedOrder.total.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <div>
                <h3 className="font-medium mb-2">Danh sách sản phẩm:</h3>
                <ul className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-sm border-b pb-2"
                    >
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} x{" "}
                        {item.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
