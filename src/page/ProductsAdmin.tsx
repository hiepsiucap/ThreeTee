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
  id: "productID" | "name" | "category" | "price" | "stock" | "sold" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

// Dữ liệu bán hàng theo tháng
const monthlySales = [150, 180, 165, 220, 195, 210];
const monthLabels = ["T1", "T2", "T3", "T4", "T5", "T6"];

// Dữ liệu phân loại sản phẩm
const categoryData = [40, 25, 15, 12, 8];
const categoryLabels = ["Áo", "Quần", "Váy", "Phụ kiện", "Khác"];

// Trạng thái sản phẩm
type ProductStatus = "Còn hàng" | "Sắp hết" | "Hết hàng" | "Ngừng kinh doanh";

const columns: readonly Column[] = [
  { id: "productID", label: "Mã SP", minWidth: 100 },
  { id: "name", label: "Tên sản phẩm", minWidth: 200 },
  { id: "category", label: "Danh mục", minWidth: 120 },
  {
    id: "price",
    label: "Giá bán",
    minWidth: 120,
    align: "right",
    format: (value: number) => value.toLocaleString("vi-VN") + "đ",
  },
  {
    id: "stock",
    label: "Tồn kho",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toString(),
  },
  {
    id: "sold",
    label: "Đã bán",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toString(),
  },
  { id: "status", label: "Trạng thái", minWidth: 150 },
];

interface ProductData {
  id: string;
  productID: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  status: ProductStatus;
}

function createData(
  id: string,
  productID: string,
  name: string,
  category: string,
  price: number,
  stock: number,
  sold: number,
  status: ProductStatus
): ProductData {
  return { id, productID, name, category, price, stock, sold, status };
}

const rows = [
  createData("1", "SP001", "Áo thun basic", "Áo", 299000, 50, 150, "Còn hàng"),
  createData(
    "2",
    "SP002",
    "Quần jean slim fit",
    "Quần",
    599000,
    30,
    85,
    "Còn hàng"
  ),
  createData("3", "SP003", "Váy hoa dáng xòe", "Váy", 449000, 5, 95, "Sắp hết"),
  createData("4", "SP004", "Áo sơ mi trắng", "Áo", 399000, 0, 120, "Hết hàng"),
  createData(
    "5",
    "SP005",
    "Túi xách da",
    "Phụ kiện",
    899000,
    15,
    45,
    "Còn hàng"
  ),
  createData("6", "SP006", "Áo khoác denim", "Áo", 799000, 25, 78, "Còn hàng"),
  createData("7", "SP007", "Quần tây âu", "Quần", 499000, 3, 92, "Sắp hết"),
  createData("8", "SP008", "Váy công sở", "Váy", 599000, 20, 65, "Còn hàng"),
  createData(
    "9",
    "SP009",
    "Thắt lưng da",
    "Phụ kiện",
    299000,
    40,
    30,
    "Còn hàng"
  ),
  createData("10", "SP010", "Áo len cổ lọ", "Áo", 449000, 0, 88, "Hết hàng"),
  createData(
    "11",
    "SP011",
    "Quần short jean",
    "Quần",
    399000,
    35,
    110,
    "Còn hàng"
  ),
  createData("12", "SP012", "Váy dạ hội", "Váy", 1299000, 8, 25, "Còn hàng"),
  createData(
    "13",
    "SP013",
    "Ví cầm tay",
    "Phụ kiện",
    499000,
    12,
    55,
    "Còn hàng"
  ),
  createData(
    "14",
    "SP014",
    "Áo polo",
    "Áo",
    349000,
    0,
    135,
    "Ngừng kinh doanh"
  ),
  createData("15", "SP015", "Quần kaki", "Quần", 459000, 28, 72, "Còn hàng"),
];

export default function ProductsAdmin() {
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
    <div className="pl-72">
      <p className="text-2xl py-6">Quản lý sản phẩm</p>

      <div className="grid grid-cols-2 gap-10 w-full">
        <div className="w-full h-fit bg-gray-50 p-6 rounded-3xl shadow-md">
          <h3 className="text-lg font-medium mb-4">
            Số lượng bán ra theo tháng
          </h3>
          <BasicLine
            categories={monthLabels}
            data={monthlySales}
            data1={monthlySales.map((v) => v * 0.8)} // Dự báo tháng tới
          />
        </div>
        <div className="w-full h-fit bg-gray-50 p-6 rounded-3xl shadow-md">
          <h3 className="text-lg font-medium mb-4">
            Tỷ lệ tồn kho theo danh mục
          </h3>
          <Basic
            categories={categoryLabels}
            data={categoryData}
          />
        </div>
        <div className="w-full bg-gray-50 p-6 rounded-3xl shadow-md">
          <h3 className="text-lg font-medium mb-4">
            Phân bố trạng thái sản phẩm
          </h3>
          <BasicPie
            categories={["Còn hàng", "Sắp hết", "Hết hàng", "Ngừng kinh doanh"]}
            data={[60, 20, 15, 5]}
          />
        </div>
        <div className="w-full bg-gray-50 p-6 rounded-3xl shadow-md">
          <h3 className="text-lg font-medium mb-4">Top danh mục bán chạy</h3>
          <BasicPie
            categories={categoryLabels}
            data={[45, 25, 15, 10, 5]}
          />
        </div>
      </div>

      <h1 className="font-light py-6 text-center text-2xl">
        Danh sách sản phẩm
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
