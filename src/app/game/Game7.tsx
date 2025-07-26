import Image from "next/image";
import { use, useEffect, useState } from "react";

import fw1 from "../../../public/fl21.jpg";
import fw2 from "../../../public/fl22.jpg";
import fw3 from "../../../public/fll23.jpg";
import fw4 from "../../../public/fl24.jpg";

export default function Game({
  setGameDisplay,
  addVdoList,
}: {
  setGameDisplay: (display: boolean) => void;
  addVdoList: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [fw1, fw2, fw3, fw4];

  const handleImageClick = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      // Force lose when reaching the last image
      alert("You lose! 😢 This game is rigged!");
      addVdoList();
      setGameDisplay(false);
    }
  };
  return (
    <div className="bg-gray-500/20 backdrop-blur-2xl z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center shadow">
      <div className="bg-white p-6 max-w-[500px] w-full rounded-2xl">
        <p className="text-black text-center mb-4">Click the image</p>
        <div className="text-center">
          <Image
            src={images[currentImageIndex]}
            alt={`Game Image ${currentImageIndex + 1}`}
            className="object-cover cursor-pointer hover:opacity-80 transition-opacity rounded-lg w-full h-auto"
            onClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  );
}
