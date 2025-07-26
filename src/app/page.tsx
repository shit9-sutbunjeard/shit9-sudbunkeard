"use client";

import Image from "next/image";
import BR from "../../public/brainrot.jpg";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleStartGame() {
    if (!name) {
      alert("กรุณาใส่ชื่อก่อนเริ่มเกม");
      return;
    }
    localStorage.setItem("name", name || "Player");
    router.push("/game");
    console.log("Game started with name:", name);
  }

  return (
    <div className="flex items-center justify-center h-[100dvh] w-full relative">
      <Image src={BR} alt={""} className="absolute w-full h-full"></Image>
      <div className="max-w-[450px] grid gap-4 w-full rounded-xl bg-white z-60 p-4">
        <h1 className="text-2xl font-bold text-black">
          ยินดีต้อนรับสู่เกม ใส่ชื่อของท่าน
        </h1>
        <input
          type="text"
          className="border w-full py-2 px-4 rounded-md text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อของท่าน"
        />
        <button
          onClick={handleStartGame}
          className="bg-blue-500 hover:bg-blue-800 text-white rounded-md px-4 py-2 w-full"
        >
          เริ่มเกม
        </button>
      </div>
    </div>
  );
}
