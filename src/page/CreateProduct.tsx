/** @format */
import { motion } from "framer-motion";
import { useState, ChangeEvent } from "react";
import add from "../assets/icon/add.png";

interface Size {
  size: string;
  quantity: string;
  price: string;
}

interface ProductData {
  name: string;
  description: string;
  sizes: Size[];
  images: File[];
}

export default function CreateProduct() {
  const [data, setData] = useState<ProductData>({
    name: "",
    description: "",
    sizes: [{ size: "", quantity: "", price: "" }],
    images: [],
  });

  // Handler to add a new size entry
  const addSizeRow = () => {
    setData({
      ...data,
      sizes: [...data.sizes, { size: "", quantity: "", price: "" }],
    });
  };

  // Handler to update a specific size row
  const updateSizeRow = (index: number, field: keyof Size, value: string) => {
    const updatedSizes = [...data.sizes];
    updatedSizes[index][field] = value;
    setData({ ...data, sizes: updatedSizes });
  };

  // Handler to handle image upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setData({ ...data, images: [...data.images, ...uploadedFiles] });
    }
  };

  // Handler to remove an image
  const removeImage = (index: number) => {
    const updatedImages = data.images.filter((_, i) => i !== index);
    setData({ ...data, images: updatedImages });
  };
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handler để mở modal
  const openModal = (image: File) => {
    setSelectedImage(URL.createObjectURL(image));
  };

  // Handler để đóng modal
  const closeModal = () => {
    setSelectedImage(null);
  };
  const onSumbitHanlder = async () => {
    if (data.name || data.description) {
    }
  };
  return (
    <div className="pl-72">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl py-4 pt-6"
      >
        Tạo sản phẩm
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl py-2"
      >
        <form>
          <div className=" flex justify-start space-x-12">
            <div className="flex flex-col space-y-4 w-1/2 ">
              <p className="text-lg">Thông tin sản phẩm</p>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">Tên sản phẩm:</p>
                <input
                  className="border border-gray-400 rounded-md py-2 px-4"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
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
            <div className=" w-5/12">
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
                  {data.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative "
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index}`}
                        className="w-full h-32 object-cover rounded-md cursor-pointer"
                        onClick={() => openModal(image)}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 z-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex  pt-16 items-center justify-center text-lg">
            <button className="  border border-gray-400  hover:scale-110 py-3 px-6 rounded-md">
              Tạo sản phẩm
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
              className=" rounded-md"
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
  );
}
