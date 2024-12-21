/** @format */
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Star } from "lucide-react";
// import Comment from "../component/Comment";
import { useState, useEffect, useCallback } from "react";
const colorGroups = [
  { name: "Trắng", value: "#FFFFFF" },
  { name: "Đen", value: "#000000" },
  { name: "Xám", value: "#808080" },
  { name: "Đỏ", value: "#FF0000" },
  { name: "Đỏ tươi", value: "#FF3333" },
  { name: "Đỏ cam", value: "#FF4D4D" },
  { name: "Cam", value: "#FFA500" },
  { name: "Vàng", value: "#FFD700" },
  { name: "Xanh dương", value: "#0000FF" },
  { name: "Xanh biển", value: "#1E90FF" },
  { name: "Xanh nhạt", value: "#00BFFF" },
  { name: "Xanh lá", value: "#008000" },
  { name: "Xanh ngọc", value: "#008B8B" },
  { name: "Xanh pastel", value: "#87CEEB" },
  { name: "Tím pastel", value: "#DCD0FF" },
  { name: "Xanh lá pastel", value: "#98FB98" },
];
const size = ["3XL", "2XL", "XL", "L", "S", "XS"];
import { formatPrice } from "../utilz/Price";
import { Link } from "react-router-dom";

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  currentColor,
  onColorChange,
}) => {
  return (
    <div className="w-full max-w-md  ">
      {/* Custom color input */}

      {/* Preset colors */}
      <div className="  grid grid-cols-8 gap-2 py-4">
        {colorGroups.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${
              currentColor === color.value
                ? "border-blue-500 scale-110"
                : "border-gray-200"
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};
useGLTF.preload("/model_draco.gltf");
const ShirtModel = ({
  color = "#ffffff",
  image,
  logo,
}: {
  color: string;
  logo: string | null;
  image: string | null;
}) => {
  const { scene, materials } = useGLTF("/hoodie.glb", true);
  const shirtTexture = useTexture(image || "/white.png");
  const logoTexture = useTexture(logo || "/white.png");

  const updateTextures = useCallback(() => {
    if (!materials) return;

    scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 1024;

        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);

          context.fillStyle = color;
          context.fillRect(0, 0, 1024, 1024);

          if (logo && logoTexture && logoTexture.image) {
            const logoWidth = 150;
            const logoHeight = 150;
            const logoX = 130;
            const logoY = 470;

            context.drawImage(
              logoTexture.image,
              logoX,
              logoY,
              logoWidth,
              logoHeight
            );
          }

          if (shirtTexture && shirtTexture.image) {
            const logoWidth = 250;
            const logoHeight = 250;
            const logoX = 450;
            const logoY = 500;

            context.drawImage(
              shirtTexture.image,
              logoX,
              logoY,
              logoWidth,
              logoHeight
            );
          }

          // Tạo texture mới từ canvas
          const combinedTexture = new THREE.CanvasTexture(canvas);
          child.material.map = combinedTexture;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, materials, shirtTexture, logoTexture, logo, color]);

  // Effect để theo dõi các thay đổi và cập nhật texture
  useEffect(() => {
    updateTextures();
  }, [updateTextures]);

  const shirtRef = useRef<THREE.Group>(null);

  return (
    <primitive
      ref={shirtRef}
      object={scene}
      scale={[5, 5, 5]}
      position={[0, -6, 0]}
    />
  );
};
export default function DetailHoodie() {
  const inputRef = useRef<HTMLInputElement>(null);
  const logorRef = useRef<HTMLInputElement>(null);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [selectsize, setSelectsize] = useState("");
  const [selectimage, setselectimage] = useState<string | null>(null);
  const [selectlogo, setselectlogo] = useState<string | null>(null);
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setselectimage(imageURL);
    }
  };
  const HandleChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setselectlogo(imageURL);
    }
  };
  return (
    <section className=" md:container mx-auto py-6">
      <div className="font-roboto pl-6 flex space-x-2 font-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <Link to="/product">Trở về trang sản phẩm</Link>
      </div>
      <div className=" flex flex-col md:flex-row space-x-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/2 relative"
        >
          <Canvas
            style={{
              width: "100%",
              height: "700px",
            }}
            camera={{
              position: [0, 0, 8.5], // Điều chỉnh vị trí camera
              fov: 50,
            }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.5}
            />
            <ShirtModel
              color={currentColor}
              image={selectimage}
              logo={selectlogo}
            />
            <OrbitControls
              enableZoom={false}
              // enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Canvas>
          <div className=" flex absolute bottom-0 left-1/2 -translate-x-1/2 space-x-6">
            <div className=" flex flex-col items-center space-y-2">
              <div className="  font-light">Mặt trước</div>
              <input
                type="file"
                ref={logorRef}
                onChange={HandleChangeLogo}
                className=" hidden"
              ></input>
              {!selectlogo ? (
                <button
                  onClick={() => {
                    if (logorRef.current) logorRef.current?.click();
                  }}
                  className=" p-12 border border-black rounded-xl border-dashed"
                ></button>
              ) : (
                <button
                  onClick={() => {
                    if (logorRef.current) logorRef.current?.click();
                  }}
                  className="  border  rounded-xl "
                >
                  <img
                    src={selectlogo || ""}
                    alt=""
                    className="w-24 h-24 rounded-lg"
                  />
                </button>
              )}
            </div>
            <div className=" flex flex-col items-center space-y-2">
              <div className="  font-light">Mặt sau</div>
              <input
                type="file"
                ref={inputRef}
                onChange={HandleChange}
                className=" hidden"
              ></input>
              {!selectimage ? (
                <button
                  onClick={() => {
                    if (inputRef.current) inputRef.current?.click();
                  }}
                  className=" p-12 border border-black rounded-xl border-dashed"
                ></button>
              ) : (
                <button
                  onClick={() => {
                    if (inputRef.current) inputRef.current?.click();
                  }}
                  className="  border  rounded-xl "
                >
                  <img
                    src={selectimage}
                    alt=""
                    className="w-24 h-24 rounded-lg"
                  />
                </button>
              )}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="  py-6 px-6"
        >
          <div className=" pt-6 font-roboto font-light text-3xl">
            Áo Hoodie tự Custom - Cotton Chất lượng cao
          </div>
          <div className=" font-roboto pb-3 pt-4  font-light text-3xl">
            {formatPrice(300000)}
          </div>
          <div className=" flex  space-x-4 items-center  pb-4">
            <div className=" flex font-light ">45 Đã bán</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="text-yellow-400 w-4 h-4 fill-yellow-400"
                />
              ))}
            </div>
          </div>
          <div className=" font-light pt-2">Chọn size áo</div>
          <div className="mb-4 flex py-3 space-x-2">
            {size &&
              size.map((sz) => {
                return (
                  <button
                    onClick={() => setSelectsize(sz)}
                    key={sz}
                    className={
                      selectsize == sz
                        ? "p-3 w-14 h-14 border-black  transition-transform hover:scale-110 font-roboto border rounded-sm "
                        : " p-3 w-14 h-14 border-gray-200    font-light transition-transform hover:scale-110 font-roboto border rounded-sm"
                    }
                  >
                    {sz}
                  </button>
                );
              })}
          </div>
          <div className="  font-light">Chọn màu mà bạn muốn</div>
          <div className="mb-4">
            <ColorPicker
              currentColor={currentColor}
              onColorChange={setCurrentColor}
            />
          </div>
          <div className=" flex flex-col space-y-2 items-center  py-4">
            <button className=" w-full flex space-x-4 justify-center  font-light text-xl border border-gray-800 rounded-md py-2 px-6">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
              <p>Mua ngay</p>
            </button>
            <p className=" text-gray-700 italic text-sm">Thêm vào giỏ hàng</p>
          </div>
        </motion.div>
      </div>

      {/* <Comment></Comment> */}
    </section>
  );
}
