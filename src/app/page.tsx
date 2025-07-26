import Image from "next/image";
import BR from "../../public/brainrot.jpg"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-[100dvh] w-full relative">
      <Image src={BR} alt={""} className="absolute w-full h-full"></Image>
      <div className="max-w-[450px] grid gap-4 w-full rounded-2xl bg-white z-60 p-4">
        <h1 className="text-2xl font-bold">ยินดีต้อนรับสู่เกม ใส่ชื่อของท่าน</h1>
        <input type="text" className="border w-full py-2 px-4 rounded-md" placeholder="ชื่อของท่าน" />
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 w-full">เริ่มเกม</button>
      </div>
    </div>
  );
}
  