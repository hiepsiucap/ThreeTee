/** @format */

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
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
const ShirtModel = ({
  color = "#ffffff",
  image,
  logo,
}: {
  color: string;
  logo: string | null;
  image: string | null;
}) => {
  const { scene, materials } = useGLTF("/shirt.glb");
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
            const logoWidth = 100;
            const logoHeight = 100;
            const logoX = 300;
            const logoY = 500;

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
            const logoX = 640;
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
export default function Hero() {
  const inputRef = useRef<HTMLInputElement>(null);
  const logorRef = useRef<HTMLInputElement>(null);
  const [currentColor, setCurrentColor] = useState("#ffffff");
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
    <div className="  font-roboto flex justify-center mt-16 items-start w-full ">
      <div className="flex flex-col items-center mt-16 w-1/2">
        <p className="text-4xl leading-loose font-semibold text-center mb-4">
          Trải nghiệm vượt trội với <br />
          <span className="text-6xl">ThreeTee</span>
        </p>
        <button className="font-bold border-2 border-gray-800 rounded-md py-2 px-6">
          Trải nghiệm ngay
        </button>
        <div className=" pt-8 font-light">Chọn màu mà bạn muốn</div>
        <div className="mb-4">
          <ColorPicker
            currentColor={currentColor}
            onColorChange={setCurrentColor}
          />
        </div>
        <div className=" flex space-x-6">
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
          <div className=" flex flex-col  items-center space-y-2">
            <div className="  font-light">Chọn logo</div>
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
        </div>
      </div>

      <div className="w-1/2">
        <Canvas
          style={{
            width: "100%",
            height: "750px",
          }}
          camera={{
            position: [0, 0, 6], // Điều chỉnh vị trí camera
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
      </div>
    </div>
  );
}
