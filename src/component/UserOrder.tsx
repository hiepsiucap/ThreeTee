/** @format */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, ArrowLeft } from "lucide-react";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { InfinitySpin } from "react-loader-spinner";

// Updated interfaces to match API response
interface Product {
  id: number;
  name: string;
  description: string;
  sold: number;
  rate: number;
  category: string;
  created_at: string;
  updated_at: string;
}

interface ProductDetail {
  id: number;
  product_id: number;
  stock: number;
  price: number;
  size: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

interface OrderDetail {
  order_id: number;
  product_detail_id: number;
  amount: number;
  design_id: number | null;
  product_detail: ProductDetail;
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
  post_code: string | null;
  phone_number: string | null;
  city: string | null;
  address: string | null;
  country: string | null;
}

interface Order {
  id: number;
  user_id: number;
  phonenumber: string;
  address: string;
  order_date: string;
  totalprice: number;
  status: string;
  payment_date: string | null;
  payment_status: string;
  payment_link: string;
  payment_link_id: string;
  user?: User;
  order_details?: OrderDetail[];
}

// Status Badge Component
const StatusBadge = ({
  status,
  type,
}: {
  status: string;
  type: "order" | "payment";
}) => {
  const getStyle = () => {
    if (type === "order") {
      switch (status) {
        case "completed":
          return "bg-green-100 text-green-600";
        case "pending":
          return "bg-yellow-100 text-yellow-600";
        default:
          return "bg-red-100 text-red-600";
      }
    } else {
      switch (status) {
        case "paid":
          return "bg-green-100 text-green-600";
        case "unpaid":
          return "bg-red-100 text-red-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    }
  };

  const getText = () => {
    if (type === "order") {
      switch (status) {
        case "completed":
          return "Hoàn thành";
        case "pending":
          return "Đang xử lý";
        default:
          return "Hủy";
      }
    } else {
      switch (status) {
        case "paid":
          return "Đã thanh toán";
        case "unpaid":
          return "Chưa thanh toán";
        default:
          return "Không xác định";
      }
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStyle()}`}
    >
      {getText()}
    </span>
  );
};

const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    if (e instanceof Error) return e.message;
    return "Invalid date";
  }
};

const OrderCard = ({
  order,
  onViewDetails,
}: {
  order: Order;
  onViewDetails: (orderId: number) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-lg font-medium text-gray-800">
            Mã đơn hàng: #{order.id}
          </h3>
          <StatusBadge
            status={order.status}
            type="order"
          />
          <StatusBadge
            status={order.payment_status}
            type="payment"
          />
        </div>
        <div className="text-gray-600 space-y-1">
          <p className="text-sm">Ngày đặt: {formatDate(order.order_date)}</p>
          <p className="text-sm">SĐT: {order.phonenumber}</p>
          <p className="text-sm font-medium">
            Tổng tiền:{" "}
            <span className="text-gray-800">
              {formatCurrency(order.totalprice)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {order.payment_status === "unpaid" && (
          <a
            href={order.payment_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            Thanh toán
          </a>
        )}
        <button
          onClick={() => onViewDetails(order.id)}
          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <Eye className="w-4 h-4 mr-2" />
          Xem chi tiết
        </button>
      </div>
    </div>
  </div>
);

export default function UserOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading] = useState(false);
  const { token } = useStateUserContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await GetRequestWithCre({
          route: "api/orders",
          token,
        });
        if (response.success) {
          setOrders(response.data.data);
        } else {
          console.error("Failed to fetch orders:", response);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleViewDetails = async (orderId: number) => {
    try {
      setLoading(true);
      const response = await GetRequestWithCre({
        route: `api/orderanddetail/${orderId}`,
        token,
      });
      if (response.success) {
        setSelectedOrder(response.data);
      } else {
        console.error("Failed to fetch order details:", response);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-36 flex w-full justify-center items-center">
        <InfinitySpin
          width="200"
          color="#000000"
        />
      </div>
    );
  }

  const renderOrderList = () => (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Danh sách đơn hàng
      </h2>
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </>
  );

  const renderOrderDetails = () => {
    if (detailLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <button
          onClick={() => setSelectedOrder(null)}
          className="mb-6 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách
        </button>
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Chi tiết đơn hàng: #{selectedOrder!.id}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-600">
                  Ngày đặt:{" "}
                  <span className="text-gray-800">
                    {formatDate(selectedOrder!.order_date)}
                  </span>
                </p>
                <p className="text-gray-600">
                  Số điện thoại:{" "}
                  <span className="text-gray-800">
                    {selectedOrder!.phonenumber}
                  </span>
                </p>
                <p className="text-gray-600">
                  Địa chỉ:{" "}
                  <span className="text-gray-800">
                    {selectedOrder!.address}
                  </span>
                </p>
                {selectedOrder!.user && (
                  <p className="text-gray-600">
                    Khách hàng:{" "}
                    <span className="text-gray-800">
                      {selectedOrder!.user.name}
                    </span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Trạng thái đơn hàng:{" "}
                  <StatusBadge
                    status={selectedOrder!.status}
                    type="order"
                  />
                </p>
                <p className="text-gray-600">
                  Trạng thái thanh toán:{" "}
                  <StatusBadge
                    status={selectedOrder!.payment_status}
                    type="payment"
                  />
                </p>
                {selectedOrder!.payment_date && (
                  <p className="text-gray-600">
                    Ngày thanh toán:{" "}
                    <span className="text-gray-800">
                      {formatDate(selectedOrder!.payment_date)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Danh sách sản phẩm</h3>
            <div className="space-y-3">
              {selectedOrder!.order_details?.map((detail) => (
                <div
                  key={`${detail.order_id}-${detail.product_detail_id}`}
                  className="flex justify-between items-center py-3 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {detail.product_detail.product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Size: {detail.product_detail.size} | Số lượng:{" "}
                      {detail.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {formatCurrency(
                        detail.product_detail.price * detail.amount
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      ({formatCurrency(detail.product_detail.price)} / sản phẩm)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-800">Tổng cộng</p>
              <p className="text-xl font-semibold text-gray-800">
                {formatCurrency(selectedOrder!.totalprice)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="container mx-auto px-4"
    >
      <div className="w-full max-w-4xl mx-auto">
        {selectedOrder ? renderOrderDetails() : renderOrderList()}
      </div>
    </motion.div>
  );
}
