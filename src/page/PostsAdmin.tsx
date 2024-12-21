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
import BasicLine from "../component/LineChart";
import Basic from "../component/ApexChart";
import BasicPie from "../component/PieChart";

interface Column {
  id: "title" | "author" | "category" | "views" | "comments";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

// Dữ liệu cho biểu đồ
const postMetrics = [45, 52, 48, 70, 65, 58];
const categories = ["T1", "T2", "T3", "T4", "T5", "T6"];

// Dữ liệu phân bố danh mục
const categoryData = [35, 25, 20, 15, 5];
const categoryLabels = [
  "Thời trang nữ",
  "Thời trang nam",
  "Phụ kiện",
  "Giày dép",
  "Khác",
];

const columns: readonly Column[] = [
  { id: "title", label: "Tiêu đề", minWidth: 200 },
  { id: "author", label: "Tác giả", minWidth: 130 },
  { id: "category", label: "Danh mục", minWidth: 130 },
  {
    id: "views",
    label: "Lượt xem",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("vi-VN"),
  },
  {
    id: "comments",
    label: "Bình luận",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("vi-VN"),
  },
];

interface PostData {
  id: string;
  title: string;
  author: string;
  category: string;
  views: number;
  comments: number;
}

function createData(
  id: string,
  title: string,
  author: string,
  category: string,
  views: number,
  comments: number
): PostData {
  return { id, title, author, category, views, comments };
}

const rows = [
  createData(
    "1",
    "Xu hướng thời trang Thu Đông 2024",
    "Nguyễn Văn A",
    "Thời trang nữ",
    3500,
    125
  ),
  createData(
    "2",
    "Cách phối đồ nam công sở",
    "Trần Thị B",
    "Thời trang nam",
    2800,
    95
  ),
  createData(
    "3",
    "Top 10 túi xách hot nhất 2024",
    "Lê Văn C",
    "Phụ kiện",
    1900,
    62
  ),
  createData(
    "4",
    "Giày sneaker nam trending",
    "Phạm Thị D",
    "Giày dép",
    2200,
    78
  ),
  createData(
    "5",
    "Váy đầm dự tiệc cuối năm",
    "Hoàng Văn E",
    "Thời trang nữ",
    4100,
    145
  ),
  createData(
    "6",
    "Mix & Match với áo blazer nam",
    "Ngô Văn F",
    "Thời trang nam",
    3200,
    112
  ),
  createData(
    "7",
    "Cách chọn đồng hồ phù hợp",
    "Vũ Thị G",
    "Phụ kiện",
    1800,
    54
  ),
  createData(
    "8",
    "Xu hướng váy cưới 2024",
    "Đặng Văn H",
    "Thời trang nữ",
    2900,
    88
  ),
  createData(
    "9",
    "Style công sở nam thu đông",
    "Bùi Thị I",
    "Thời trang nam",
    2600,
    82
  ),
  createData("10", "Cách phối phụ kiện nam", "Lý Văn K", "Phụ kiện", 1500, 45),
  createData(
    "11",
    "Thời trang dạ tiệc nữ",
    "Mai Thị L",
    "Thời trang nữ",
    3800,
    135
  ),
  createData(
    "12",
    "Áo khoác nam must-have 2024",
    "Trương Văn M",
    "Thời trang nam",
    2400,
    72
  ),
  createData(
    "13",
    "Xu hướng giày cao gót 2024",
    "Phan Thị N",
    "Giày dép",
    1600,
    48
  ),
  createData(
    "14",
    "Trang phục dự tiệc cưới",
    "Đỗ Văn P",
    "Thời trang nữ",
    2100,
    65
  ),
  createData(
    "15",
    "Cách chọn size quần áo nam",
    "Hồ Thị Q",
    "Thời trang nam",
    3300,
    98
  ),
];

export default function OrdersAdmin() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
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
      <p className="text-2xl py-6">Thống kê bài viết thời trang</p>

      <div className="grid grid-cols-2 gap-10 w-full">
        <div className="w-full h-fit bg-gray-50 p-6 rounded-3xl shadow-md">
          <p className="text-xl font-semibold mb-4">
            Thống kê lượt xem theo tháng
          </p>
          <BasicLine
            categories={categories}
            data={postMetrics}
            data1={postMetrics.map((v) => v * 1.2)}
          />
        </div>
        <div className="w-full h-fit bg-gray-50 p-6 rounded-3xl shadow-md">
          <p className="text-xl font-semibold mb-4">
            Số lượng bài viết mới theo tháng
          </p>
          <Basic
            categories={categories}
            data={postMetrics}
          />
        </div>
        <div className="w-full bg-gray-50 p-6 rounded-3xl shadow-md">
          <p className="text-xl font-semibold mb-4">
            Tương tác người đọc theo tháng
          </p>
          <BasicLine
            categories={categories}
            data={postMetrics}
            data1={postMetrics.map((v) => v * 0.8)}
          />
        </div>
        <div className="w-full bg-gray-50 p-6 rounded-3xl shadow-md">
          <p className="text-xl font-semibold mb-4">
            Phân bố bài viết theo danh mục
          </p>
          <BasicPie
            categories={categoryLabels}
            data={categoryData}
          />
        </div>
      </div>

      <h1 className="font-light py-6 text-center text-2xl">
        Danh sách bài viết thời trang
      </h1>

      <div className="overflow-hidden rounded-2xl py-6">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
