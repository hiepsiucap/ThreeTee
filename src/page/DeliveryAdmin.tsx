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
import LinearProgress from "@mui/material/LinearProgress";

interface Column {
  id: "orderId" | "customerName" | "status" | "deliveryDate";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "orderId", label: "Mã đơn hàng", minWidth: 100 },
  { id: "customerName", label: "Tên khách hàng", minWidth: 170 },
  { id: "status", label: "Trạng thái", minWidth: 100 },
  { id: "deliveryDate", label: "Ngày dự kiến giao", minWidth: 170 },
];

const rows = [
  {
    orderId: "1001",
    customerName: "Duc Minh",
    status: "Shipping",
    deliveryDate: "2024-11-15",
    progress: 75,
  },
  {
    orderId: "1002",
    customerName: "Ba Vinh",
    status: "Shipping",
    deliveryDate: "2024-11-18",
    progress: 100,
  },
  {
    orderId: "1003",
    customerName: "Duc Minh",
    status: "Shipping",
    deliveryDate: "2024-11-19",
    progress: 50,
  },
  {
    orderId: "1004",
    customerName: "Le Viet Quang",
    status: "Shipping",
    deliveryDate: "2024-11-20",
    progress: 30,
  },
];

export default function OrderShipping() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="px-6 md:px-0 md:pl-72">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl py-6"
      >
        Đơn Hàng đang giao
      </motion.div>
      <div className="flex space-x-6 h-full mr-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
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
                aria-label="shipping orders table"
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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <React.Fragment key={row.orderId}>
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * index }}
                          className="hover:bg-indigo-100 transition duration-200"
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ paddingBottom: 2 }}
                              >
                                {column.id === "status" ? (
                                  <span
                                    className={`font-semibold ${
                                      row.progress === 100
                                        ? "text-green-600"
                                        : "text-blue-600"
                                    }`}
                                  >
                                    {row.progress === 100 ? "Delivered" : value}
                                  </span>
                                ) : column.id === "deliveryDate" ? (
                                  <div className="flex items-center space-x-6">
                                    <span>{value}</span>
                                    <LinearProgress
                                      variant="determinate"
                                      value={row.progress}
                                      sx={{
                                        width: "60%",
                                        height: 8,
                                        borderRadius: 5,
                                        "& .MuiLinearProgress-bar": {
                                          backgroundColor:
                                            row.progress === 100
                                              ? "green"
                                              : undefined,
                                        },
                                      }}
                                    />
                                  </div>
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </motion.tr>
                        {/* Add spacing row */}
                        <TableRow sx={{ height: 10 }} />
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ backgroundColor: "#f3f4f6" }}
            />
          </Paper>
        </motion.div>
      </div>
    </div>
  );
}
