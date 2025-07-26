import Image from "next/image";
import head from "../../../public/ht/head.png";
import fingerTail from "../../../public/ht/fingertail.jpg";
import { use, useEffect, useState } from "react";

export default function Game({
  setGameDisplay,
  addVdoList,
}: {
  setGameDisplay: (display: boolean) => void;
  addVdoList: () => void;
}) {
  const [count, setCount] = useState(5);
  const [computer, setComputer] = useState(0);

  useEffect(() => {
    setComputer(Math.floor(Math.random() * 2));
  }, []);

  function handleSubmit(playerSelect: number) {
    console.log("Player selected:", playerSelect === 0 ? "Head" : "Tail");
    console.log("Computer selected:", computer === 0 ? "Head" : "Tail");

    if (playerSelect === computer) {
      alert("You win! 🏆 You guessed correctly!");
    } else {
      alert("You lose! 😢 Wrong guess!");
      addVdoList();
    }
    setCount(5);
    setGameDisplay(false);
  }

  useEffect(() => {
    if (count <= 0) return;

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
    <div className="bg-gray-500/20 backdrop-blur-2xl z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center shadow">
      <div className="bg-white p-6 max-w-[500px] w-full rounded-2xl">
        <div className="inline-block bg-gray-200 rounded px-2 py-1">
  			<h2 className="text-black">count : {count}</h2>
		</div>
        <h1 className="text-2xl text-black font-bold mb-4 text-center">Head Shower Seal & Tail</h1>
        <p className="text-black text-center">ชะตาแห่งแมวน้ำก้อยอาบน้ำฝักบัว 🐈🚿จะลงทัณฑ์แกเอ๊ง </p>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => handleSubmit(0)}
            className="bg-[#F7E247] w-50 h-50 rounded-full hover:scale-105"
          >
            <Image className="object-cover " src={head} alt="Game Image" />
          </button>
          <button
            onClick={() => handleSubmit(1)}
            className="bg-[#D9D9D9] w-50 h-50 rounded-full p-10 hover:scale-105"
          >
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