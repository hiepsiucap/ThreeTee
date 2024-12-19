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
// import BasicLine from "../component/LineChart";
import { InfinitySpin } from "react-loader-spinner";
import { useStateUserContext } from "../contexts/UserContextProvider";
import { motion } from "framer-motion";
import { GetRequestWithCre } from "../utilz/Request/getRequest";

// const categoriess = [
//   "Áo thun",
//   "Áo Hoddies",
//   "Ly sứ",
//   "Bình giữ nhiệt",
//   "Áo Polo",
// ];
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
  order_details: OrderDetail[];
}

interface OrderDetail {
  name: string;
}

const columns = [
  { id: "id", label: "Mã đơn hàng", minWidth: 170 },
  { id: "phonenumber", label: "Số điện thoại", minWidth: 170 },
  { id: "totalprice", label: "Tổng tiền", minWidth: 100 },
  { id: "order_date", label: "Ngày đặt", minWidth: 170 },
  { id: "status", label: "Trạng thái", minWidth: 170 },
];

export default function OrdersAdmin() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const { token } = useStateUserContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, changeLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const fetchOrders = async () => {
      const response = await GetRequestWithCre({
        route: "api/admin/orders/all?status=pending",
        token,
      });
      if (response.success) {
        setOrders(response.data.data.data || []);
      }
      changeLoading(false);
    };
    fetchOrders();
  }, [token]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="pl-72">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl py-6"
      >
        Đơn hàng
      </motion.div>
      {loading === true ? (
        <div className=" pt-36 flex w-full justify-center items-center">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <div className="flex  px-6 h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="overflow-hidden rounded-2xl shadow-lg w-full "
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
                            {column.id === "totalprice"
                              ? `${(order.totalprice ?? 0).toLocaleString()} ₫`
                              : column.id === "order_date"
                              ? new Date(order.order_date).toLocaleDateString(
                                  "vi-VN"
                                )
                              : column.id === "id"
                              ? order.id.toString()
                              : column.id === "phonenumber"
                              ? order.phonenumber ?? "-"
                              : column.id === "order_details"
                              ? order.order_details
                                  .map((detail) => detail.name)
                                  .join(", ")
                              : (
                                  order[column.id as keyof Order] ?? "-"
                                ).toString()}
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
    </div>
  );
}
