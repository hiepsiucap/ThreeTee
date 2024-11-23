/** @format */

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { motion } from "framer-motion";

interface Column {
  id: "orderId" | "customerName" | "quantity" | "orderDate" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "orderId", label: "Mã Đơn Hàng", minWidth: 120 },
  { id: "customerName", label: "Tên Khách Hàng", minWidth: 150 },
  { id: "quantity", label: "Số Lượng Sản Phẩm", minWidth: 100, align: "right" },
  { id: "orderDate", label: "Ngày Đặt Hàng", minWidth: 150, align: "right" },
  { id: "status", label: "Trạng Thái", minWidth: 120 },
];

interface OrderData {
  orderId: string;
  customerName: string;
  quantity: number;
  orderDate: string;
  status: string;
}

function createOrderData(
  orderId: string,
  customerName: string,
  quantity: number,
  orderDate: string,
  status: string
): OrderData {
  return { orderId, customerName, quantity, orderDate, status };
}

const orders = [
  createOrderData("ORD001", "Nguyen Van A", 3, "2024-11-01", "Chờ Xác Nhận"),
  createOrderData("ORD002", "Tran Thi B", 1, "2024-11-02", "Chờ Xác Nhận"),
  createOrderData("ORD003", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD004", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD005", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD006", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD007", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD008", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD009", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00a", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00z", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00x", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00c", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00v", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00b", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00n", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00m", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00l", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00p", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00o", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00i", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  createOrderData("ORD00u", "Le Van C", 5, "2024-11-03", "Chờ Xác Nhận"),
  // Thêm các đơn hàng khác nếu cần
];

export default function PendingOrdersAdmin() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="pl-72">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl py-6"
      >
        Đơn Hàng Chờ Xác Nhận
      </motion.div>
      <div className="flex space-x-6 h-full mr-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="overflow-hidden rounded-2xl shadow-lg w-full"
        >
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              background: "transparent",
            }}
          >
            <TableContainer sx={{ maxHeight: 700 }}>
              <Table
                stickyHeader
                aria-label="pending orders table"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          color: "#6b7280",
                          fontWeight: "bold",
                          backgroundColor: "#f3f4f6",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order.orderId}
                      >
                        {columns.map((column) => {
                          const value = order[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10]}
            />
          </Paper>
        </motion.div>
      </div>
    </div>
  );
}
