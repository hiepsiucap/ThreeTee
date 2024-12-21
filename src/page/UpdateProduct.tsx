/** @format */
import { motion } from "framer-motion";
import { useState, ChangeEvent, useEffect } from "react";
import add from "../assets/icon/add.png";
import Loading from "../component/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { useStateUserContext } from "../contexts/UserContextProvider";
import {
  GetPostRequestWithCre,
  GetPostRequestFormDataWithCre,
} from "../utilz/Request/postRequest";
import { GetRequestWithCre } from "../utilz/Request/getRequest";
import Swal from "sweetalert2";

interface Size {
  size: string;
  quantity: string;
  price: string;
}

interface ProductData {
  name: string;
  description: string;
  category: string;
  sizes: Size[];
  images: (File | { id: number; image_link: string })[];
  existingImages: { id: number; image_link: string }[];
}

interface ProductDetail {
  id: number;
  product_id: number;
  stock: number;
  price: number;
  size: string;
}

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  category: string;
  product_details: ProductDetail[];
  images: Array<{
    id: number;
    image_link: string;
  }>;
}

const initialData = {
  name: "",
  description: "",
  category: "",
  sizes: [{ size: "", quantity: "", price: "" }],
  images: [],
  existingImages: [],
};

export default function UpdateProduct() {
  const { token } = useStateUserContext();
  const { id } = useParams();

  const [loading, changeloading] = useState(false);
  const [isLoading, changeisLoading] = useState(false);
  const [data, setData] = useState<ProductData>(initialData);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        changeisLoading(true);
        const response = await GetRequestWithCre({
          route: `api/products/${id}`,
          token,
        });

        if (!response.success) {
          changeisLoading(false);
          throw new Error(response.msg);
        }

        const productData: ProductResponse = response.data.data;

        setData({
          name: productData.name,
          description: productData.description,
          category: productData.category,
          sizes: productData.product_details.map((detail) => ({
            size: detail.size,
            quantity: detail.stock.toString(),
            price: detail.price.toString(),
          })),
          images: [],
          existingImages: productData.images,
        });
        changeisLoading(false);
      } catch (error) {
        changeisLoading(false);
        if (error instanceof Error)
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonText: "Trở lại",
          });
      }
    };
    if (id && Number(id) !== -1) fetchProduct();
  }, [id, token]);

  const addSizeRow = () => {
    setData({
      ...data,
      sizes: [...data.sizes, { size: "", quantity: "", price: "" }],
    });
  };

  const updateSizeRow = (index: number, field: keyof Size, value: string) => {
    const updatedSizes = [...data.sizes];
    updatedSizes[index][field] = value;
    setData({ ...data, sizes: updatedSizes });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setData({ ...data, images: [...data.images, ...uploadedFiles] });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = data.images.filter((_, i) => i !== index);
    setData({ ...data, images: updatedImages });
  };

  const removeExistingImage = (imageId: number) => {
    const updatedExistingImages = data.existingImages.filter(
      (img) => img.id !== imageId
    );
    setData({ ...data, existingImages: updatedExistingImages });
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    changeloading(true);
    e.preventDefault();

    if (
      !data.name ||
      !data.description ||
      !data.category ||
      data.sizes.length < 1
    ) {
      changeloading(false);
      return Swal.fire({
        title: "Error!",
        text: "Vui lòng điền đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Trở lại",
      });
    }

    try {
      // Update main product info
      const response = await GetPostRequestWithCre({
        route: `api/staff/products/${17}`,
        body: {
          name: data.name,
          description: data.description,
          category: data.category,
        },
        token: token,
      });

      if (!response.success) {
        throw new Error(response.msg);
      }

      // Update product details (sizes)
      const promises = data.sizes.map((detail) =>
        GetPostRequestWithCre({
          route: "api/staff/product-details",
          body: {
            product_id: 17,
            stock: detail.quantity,
            price: detail.price,
            size: detail.size,
          },
          token,
        })
      );

      await Promise.all(promises);

      // Upload new images if any
      if (data.images.length > 0) {
        const formdata = new FormData();
        formdata.set("product_id", "17");
        data.images.forEach((file) => {
          if (file instanceof File) {
            formdata.append("images[]", file);
          }
        });

        const imageResponse = await GetPostRequestFormDataWithCre({
          route: "api/images",
          formdata,
          token,
        });

        if (!imageResponse.success) throw new Error("Failed to upload images");
      }

      // Delete removed images
      const removedImages = data.existingImages.filter(
        (img) =>
          !data.existingImages.some((existingImg) => existingImg.id === img.id)
      );

      for (const img of removedImages) {
        await GetPostRequestWithCre({
          route: `api/images/${img.id}`,
          body: {},
          token,
        });
      }

      changeloading(false);
      return Swal.fire({
        title: "Thành công",
        text: "Cập nhật sản phẩm thành công",
        icon: "success",
        confirmButtonText: "Trở lại",
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        changeloading(false);
        return Swal.fire({
          title: "Error!",
          text: e.message,
          icon: "error",
          confirmButtonText: "Trở lại",
        });
      }
    }
  };
  if (Number(id) === -1)
    return (
      <section className=" md:pl-72  flex items-center justify-center flex-col py-16 ">
        <p className=" text-2xl font-light py-12">
          Vui lòng chọn đơn hàng muốn update
        </p>
        <Link
          to="/admin/product/allproduct"
          className="  border border-gray-400  flex justify-center py-2 px-4 rounded-md"
        >
          Thống kê đơn hàng
        </Link>
      </section>
    );
  return (
    <section>
      {isLoading === true ? (
        <div className=" pt-36 md:pl-72 flex w-full justify-center items-center">
          <InfinitySpin
            width="200"
            color="#000000"
          />
        </div>
      ) : (
        <div className="md:pl-72">
          <Loading modalIsOpen={loading}></Loading>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl py-4 pt-6"
          >
            Cập nhật sản phẩm
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl py-2"
          >
            <form
              className="text-base"
              onSubmit={onSubmitHandler}
            >
              <div className="flex justify-start space-x-12">
                <div className="flex flex-col space-y-4 w-1/2">
                  <p className="text-lg">Thông tin sản phẩm</p>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm">Tên sản phẩm:</p>
                    <input
                      className="border border-gray-400 rounded-md py-2 px-4"
                      type="text"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm">Mô tả sản phẩm:</p>
                    <input
                      className="border border-gray-400 rounded-md py-2 px-4"
                      type="text"
                      value={data.description}
                      onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm">Danh mục sản phẩm:</p>
                    <select
                      className="border border-gray-400 rounded-md py-2 px-4"
                      value={data.category}
                      onChange={(e) =>
                        setData({ ...data, category: e.target.value })
                      }
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="nam">Nam</option>
                      <option value="nu">Nữ</option>
                      <option value="phu_kien">Phụ kiện</option>
                    </select>
                  </div>
                  <p className="text-lg">Size và giá sản phẩm</p>
                  {data.sizes.map((sizeRow, index) => (
                    <div
                      key={index}
                      className="flex space-x-2 flex-row"
                    >
                      <div className="flex flex-col space-y-1 w-1/3">
                        <p className="text-sm">Kích cỡ:</p>
                        <input
                          className="border border-gray-400 rounded-md py-2 px-4"
                          type="text"
                          value={sizeRow.size}
                          onChange={(e) =>
                            updateSizeRow(index, "size", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col space-y-1 w-1/3">
                        <p className="text-sm">Số lượng:</p>
                        <input
                          className="border border-gray-400 rounded-md py-2 px-4"
                          type="text"
                          value={sizeRow.quantity}
                          onChange={(e) =>
                            updateSizeRow(index, "quantity", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col space-y-1 w-1/3">
                        <p className="text-sm">Giá:</p>
                        <input
                          className="border border-gray-400 rounded-md py-2 px-4"
                          type="text"
                          value={sizeRow.price}
                          onChange={(e) =>
                            updateSizeRow(index, "price", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div className="w-full flex items-center justify-center">
                    <button
                      type="button"
                      onClick={addSizeRow}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={add}
                        alt="Add"
                        className="w-8 h-8"
                      />
                      <span className="text-sm">Thêm</span>
                    </button>
                  </div>
                </div>
                <div className="w-5/12">
                  <p className="text-lg">Thêm ảnh</p>
                  <div className="flex flex-col space-y-4">
                    <div className="relative border-dashed border-2 border-gray-400 rounded-lg p-4 py-12 flex flex-col items-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="opacity-0 absolute w-full h-full"
                        style={{ zIndex: 10 }}
                      />
                      <p className="text-gray-500 text-base">
                        Kéo và thả ảnh vào đây hoặc nhấn để tải lên
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {data.existingImages.map((image) => (
                        <div
                          key={image.id}
                          className="relative"
                        >
                          <img
                            src={image.image_link}
                            alt="Product"
                            className="w-full h-32 object-cover rounded-md cursor-pointer"
                            onClick={() => openModal(image.image_link)}
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(image.id)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:opacity-100 transition"
                          >
                            X
                          </button>
                        </div>
                      ))}
                      {data.images.map((image, index) => (
                        <div
                          key={`new-${index}`}
                          className="relative"
                        >
                          <img
                            src={
                              image instanceof File
                                ? URL.createObjectURL(image)
                                : image.image_link
                            }
                            alt={`Uploaded ${index}`}
                            className="w-full h-32 object-cover rounded-md cursor-pointer"
                            onClick={() =>
                              openModal(
                                image instanceof File
                                  ? URL.createObjectURL(image)
                                  : image.image_link
                              )
                            }
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:opacity-100 transition"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex pt-16 items-center justify-center text-lg">
                <button className="border border-gray-400 hover:scale-110 py-3 px-6 rounded-md">
                  Cập nhật sản phẩm
                </button>
              </div>
            </form>
          </motion.div>
          {selectedImage && (
            <div
              onClick={closeModal}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            >
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="rounded-md"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white bg-gray-700 rounded-full p-2 hover:bg-gray-800"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
