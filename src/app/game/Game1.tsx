import Image from "next/image";
import head from "../../../public/ht/head.png";
import fingerTail from "../../../public/ht/fingertail.jpg";
import { useEffect, useState } from "react";

export default function Game() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) return; // Don't start interval if count is already 0

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="bg-white/20 backdrop-blur-2xl z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center shadow">
      <div className="bg-white p-4 max-w-[500px] w-full">
        <h2>{count}</h2>
        <h1 className="text-2xl font-bold mb-4">Head Shower Seal & Tail</h1>
        <p>ชะตาแห่งแมวน้ำก้อยอาบน้ำฝักบัว 🐈🚿จะลงทัณฑ์แกเอ๊ง </p>
        <div className="flex justify-center items-center gap-4">
          <button className="bg-[#F7E247] w-50 h-50 rounded-full hover:scale-105">
            <Image className="object-cover " src={head} alt="Game Image" />
          </button>
          <button className="bg-[#D9D9D9] w-50 h-50 rounded-full p-10 hover:scale-105">
            <Image
              className=" object-cover"
              src={fingerTail}
              alt="Game Image"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
