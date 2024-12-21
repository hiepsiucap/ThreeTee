/** @format */

import React, { useState, useEffect, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { InfinitySpin } from "react-loader-spinner";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { motion } from "framer-motion";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Loading from "./Loading";
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
  payment_status: string | null;
  payment_link: string | null;
  payment_link_id: string | null;
  user: User;
  order_details: OrderDetail[];
}

interface Column {
  id: keyof Order | "details";
  label: string;
  minWidth: number;
}

const columns: Column[] = [
  { id: "id", label: "Mã đơn hàng", minWidth: 170 },
  { id: "phonenumber", label: "Số điện thoại", minWidth: 170 },
  { id: "totalprice", label: "Tổng tiền", minWidth: 100 },
  { id: "order_date", label: "Ngày đặt", minWidth: 170 },
  { id: "status", label: "Trạng thái", minWidth: 170 },
  { id: "details", label: "Chi tiết", minWidth: 170 },
];

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  orderDetails: Order | null;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  open,
  onClose,
  orderDetails,
}) => {
  if (!orderDetails) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Chi tiết đơn hàng #{orderDetails.id}</DialogTitle>
      <DialogContent>
        <div className="space-y-4 p-4">
          {/* Thông tin khách hàng */}
          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">Thông tin khách hàng</h3>
            <p>Tên: {orderDetails.user?.name || "N/A"}</p>
            <p>Số điện thoại: {orderDetails.phonenumber}</p>
            <p>Địa chỉ: {orderDetails.address}</p>
          </div>

          {/* Chi tiết đơn hàng */}
          <div>
            <h3 className="font-bold text-lg mb-2">Sản phẩm</h3>
            <div className="space-y-2">
              {orderDetails.order_details.map((detail, index) => (
                <div
                  key={index}
                  className="border-b pb-2"
                >
                  <p className="font-medium">
                    {detail.product_detail.product.name}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>Kích thước: {detail.product_detail.size}</p>
                    <p>Số lượng: {detail.amount}</p>
                    <p>
                      Đơn giá: {detail.product_detail.price.toLocaleString()}₫
                    </p>
                    <p>
                      Thành tiền:{" "}
                      {(
                        detail.amount * detail.product_detail.price
                      ).toLocaleString()}
                      ₫
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="border-t pt-4">
            <p className="text-lg font-bold">
              Tổng tiền: {orderDetails.totalprice.toLocaleString()}₫
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useStateUserContext();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, changeIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await GetRequestWithCre({
        route: "api/admin/orders/all?status=pending&sort=-order_date",
        token,
      });
      if (response.success) {
        setOrders(response.data.data.data || []);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const displayedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="md:pl-72">
      {isLoading && <Loading modalIsOpen={isLoading}></Loading>}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl py-6"
      >
        Đơn hàng
      </motion.div>
      {loading ? (
        <div className="pt-36 flex w-full justify-center items-center">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <div className="flex px-6 h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="overflow-hidden rounded-2xl shadow-lg w-full"
          >
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 1000 }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedOrders.map((order) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order.id}
                      >
                        {columns.map((column) => (
                          <TableCell key={column.id}>
                            {column.id === "details" ? (
                              <button
                                onClick={async () => {
                                  changeIsLoading(true);
                                  const response = await GetRequestWithCre({
                                    route: `api/staff/order/${order.id}/allinfo`,
                                    token,
                                  });
                                  changeIsLoading(false);
                                  if (response.data) {
                                    console.log(response.data);
                                    handleOpenDetails(response.data);
                                  }
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                Xem
                              </button>
                            ) : column.id === "totalprice" ? (
                              `${(order.totalprice ?? 0).toLocaleString()} ₫`
                            ) : column.id === "order_date" ? (
                              new Date(order.order_date).toLocaleDateString(
                                "vi-VN"
                              )
                            ) : column.id === "id" ? (
                              order.id.toString()
                            ) : column.id === "phonenumber" ? (
                              order.phonenumber ?? "-"
                            ) : column.id === "status" ? (
                              "Đang xác nhận"
                            ) : null}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </motion.div>
        </div>
      )}

      <OrderDetailsModal
        open={!!selectedOrder}
        onClose={handleCloseDetails}
        orderDetails={selectedOrder}
      />
    </div>
  );
};

export default OrdersAdmin;
