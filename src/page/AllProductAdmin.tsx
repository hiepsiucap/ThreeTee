/** @format */

import { useEffect, useState } from "react";
import { GetRequest } from "../utilz/Request/getRequest";
import Swal from "sweetalert2";
import ProductTable from "../component/TableProduct";
import { InfinitySpin } from "react-loader-spinner";
// Chi tiết của một sản phẩm (size, giá, số lượng)
interface ProductDetail {
  id: number;
  product_id: number;
  stock: number; // số lượng tồn kho
  price: number; // giá
  size: string; // kích thước
  created_at: string;
  updated_at: string;
}

// Thông tin hình ảnh sản phẩm
interface ProductImage {
  id: number;
  product_id: number;
  image_link: string; // đường dẫn hình ảnh
  created_at: string;
  updated_at: string;
}

// Interface chính cho sản phẩm
interface Product {
  id: number; // id sản phẩm
  name: string; // tên sản phẩm
  description: string; // mô tả
  sold: number; // số lượng đã bán
  rate: number; // đánh giá
  category: string; // danh mục
  created_at: string; // ngày tạo
  updated_at: string; // ngày cập nhật
  product_details?: ProductDetail[]; // chi tiết sản phẩm (optional)
  images?: ProductImage[]; // hình ảnh (optional)
}
export default function AllProductAdmin() {
  const [product, changeProduct] = useState<Product[]>([]);
  const [isLoading, changeIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getData = async () => {
      const response = await GetRequest({ route: "api/products?page=1" });
      if (!response.success) {
        Swal.fire("Thất bại ", "Lấy thông tin không thành công", "error");
        changeIsLoading(false);
      }
      changeProduct(response.data.data);
      changeIsLoading(false);
    };
    getData();
  }, []);
  return (
    <section>
      {isLoading === true ? (
        <div className=" pt-36 pl-72 flex w-full justify-center items-center">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <section className=" pl-72 pr-12">
          <p className=" font-light text-xl pt-9">Danh sách sản phẩm</p>
          <ProductTable products={product}></ProductTable>
        </section>
      )}
    </section>
  );
}
