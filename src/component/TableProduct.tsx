/** @format */

import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Types definition
interface ProductDetail {
  id: number;
  product_id: number;
  stock: number;
  price: number;
  size: string;
  created_at: string;
  updated_at: string;
}

interface ProductImage {
  id: number;
  product_id: number;
  image_link: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  sold: number;
  rate: number;
  category: string;
  created_at: string;
  updated_at: string;
  product_details?: ProductDetail[];
  images?: ProductImage[];
}

interface ProductTableProps {
  products: Product[];
}

// Custom styled TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", marginY: 2 }}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="product table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Tên sản phẩm</StyledTableCell>
            <StyledTableCell>Mô tả</StyledTableCell>
            <StyledTableCell>Danh mục</StyledTableCell>
            <StyledTableCell align="right">Đã bán</StyledTableCell>
            <StyledTableCell align="right">Đánh giá</StyledTableCell>
            <StyledTableCell align="center">Ngày tạo</StyledTableCell>
            <StyledTableCell align="center">Cập nhật lần cuối</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
              >
                {product.id}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell
                sx={{
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.description}
              </TableCell>
              <TableCell>
                <Chip
                  label={product.category}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell align="right">{product.sold}</TableCell>
              <TableCell align="right">{product.rate}/5</TableCell>
              <TableCell align="center">
                {formatDate(product.created_at)}
              </TableCell>
              <TableCell align="center">
                {formatDate(product.updated_at)}
              </TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  to={`/admin/product/update/${product.id}`}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Cập nhật
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
