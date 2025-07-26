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
    setComputer(Math.floor(Math.random() * 3));
  }, []);

  function handleSubmit(playerSelect: number) {
    const choices = ["Rock", "Paper", "Scissors"];
    console.log("Player selected:", choices[playerSelect]);
    console.log("Computer selected:", choices[computer]);

  const isComputerWin =
    (computer === 0 && playerSelect === 2) ||
    (computer === 1 && playerSelect === 0) ||
    (computer === 2 && playerSelect === 1);

  if (isComputerWin) {
      alert(`You lose! 😢 computer selected : ${choices[computer]}`);
  } else if (computer === playerSelect) {
      alert(`Draw! 🤝 Try again!, You both selected : ${choices[computer]}`);
  } else {
      alert(`You win! 🏆 Computer selected : ${choices[computer]}`);
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
        <h1 className="text-2xl text-black font-bold mb-4 text-center">lock pepper SeeSawSeen</h1>
        <p className="text-black text-center">ชะตาแห่งนิ้ว จงสำแดงฤทธา ณ บัดนี้!</p>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => handleSubmit(0)}
            className="bg-red-500 w-30 h-30 rounded-full hover:scale-105"
          >
            <Image className="object-cover " src={head} alt="Game Image" />
          </button>
          <button
            onClick={() => handleSubmit(1)}
            className="bg-[#D9D9D9] w-30 h-30 rounded-full p-10 hover:scale-105"
          >
            <Image className=" object-cover" src={fingerTail} alt="Game Image" />
          </button>
          <button
            onClick={() => handleSubmit(2)}
            className="bg-[#D9D9D9] w-30 h-30 rounded-full p-10 hover:scale-105"
          >
            <Image className=" object-cover" src={fingerTail} alt="Game Image" />
          </button>
        </div>
      </div>
    </div>
  );
}
