import Image from "next/image";
import head from "../../../public/ht/head.png";
import duck1 from "../../../public/dcuk1.png"
import duck2 from "../../../public/duck2.png"
import { use, useEffect, useState } from "react";
import spb from "../../../public/spb.png"; // Assuming you have a Spongebob image
export default function Game({
  setGameDisplay,
  addVdoList,
}: {
  setGameDisplay: (display: boolean) => void;
  addVdoList: () => void;
}) {
  const [count, setCount] = useState(30); // 30 seconds for typing
  const [userInput, setUserInput] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const targetText =
    "เสียงไหน ครือ ดักกี้โฮเต้ตัวจริง!เสียงไหน ครือ ดักกี้โฮเต้ตัวจริง! บุ๋งๆ มอๆ แกร่กๆ ก๊าบๆ โฮ่งๆ กั๊กกั๊ก แปะๆ เป็ดเป็ด เป็ดเป็ด กั๊บๆ โบยบิน ปั้กปั้ก ก๊าบก๊าบ โฮ่งโฮ่ง บุ๋งๆ ป๋อมแป๋ม แกร่กแกร่ก ตุ้บๆ กั๊บๆ กั๊บๆ ก๊าบก๊าบ เป็ดบุ๋งบุ๋ง ออกมาเล่นน้ำกลางทุ่งกั๊บ! กุ๊กกุ๊ก ก๊าบก๊าบ บุ๋งๆ แป๊ะๆ แป๊ะๆ บึ้มๆ แกร่กแกร่ก กั๊กกั๊ก ป๋อมแป๋ม ก๊าบโฮ่ง บุ๋งๆ ตุ้บๆ เป็ดแอ้กๆ มอๆ วิ่งป่วนป่าก๊าบๆ โฮ่งๆ ติ๊กต๊อก กั๊กกั๊ก บวบๆ ก๊าบๆ บุ๋งๆ เป็ดร้องเพลงเสียงดัง โฮ่งโฮ่ง ก๊าบๆ กั๊กกั๊กๆ มอมอม บุ๋งๆ ละลายใจแป๋มเป็ดแกร่กๆ กั๊บๆ ไปตามสายลมโฮ่งๆ ก๊าบๆ มอๆ บุ๋งๆ!";

  const startGame = () => {
    setGameStarted(true);
    setUserInput("");
    setCount(30);
    setGameFinished(false);
  };

  const calculateAccuracy = () => {
    let correct = 0;
    const minLength = Math.min(userInput.length, targetText.length);

    for (let i = 0; i < minLength; i++) {
      if (userInput[i] === targetText[i]) {
        correct++;
      }
    }

    return minLength > 0 ? (correct / minLength) * 100 : 0;
  };

  const handleGameEnd = () => {
    setGameFinished(true);
    setGameStarted(false);

    const accuracy = calculateAccuracy();
    const isComplete = userInput.length >= targetText.length;
    const isAccurate = accuracy >= 80;

    if (isComplete && isAccurate) {
      alert(
        `You win! 🏆\nAccuracy: ${accuracy.toFixed(1)}%\nCompleted: ${
          userInput.length
        }/${targetText.length} characters`
      );
      setGameDisplay(false);
    } else {
      alert(
        `You lose! 😢\nAccuracy: ${accuracy.toFixed(1)}%\nCompleted: ${
          userInput.length
        }/${targetText.length} characters`
      );
      addVdoList();
      setGameDisplay(false);
    }
  };

  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    if (count <= 0) {
      handleGameEnd();
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, gameStarted, gameFinished]);

  // Check if user completed the text
  useEffect(() => {
    if (gameStarted && userInput.length >= targetText.length) {
      handleGameEnd();
    }
  }, [userInput, gameStarted]);

  const renderText = () => {
    return targetText.split("").map((char, index) => {
      let className = "text-gray-400";

      if (index < userInput.length) {
        className =
          userInput[index] === char
            ? "text-green-600 bg-green-100"
            : "text-red-600 bg-red-100";
      } else if (index === userInput.length) {
        className = "text-gray-800 bg-yellow-200"; // Current character
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="bg-gray-500/20 backdrop-blur-2xl z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center shadow">
      <div className="bg-white p-6 max-w-[800px] w-full max-h-[90vh] overflow-y-auto rounded-2xl relative">
          <Image src={duck1} alt="Duck 1" className="absolute top-4 right-4 w-40 h-auto" />
        <div className="flex justify-between items-center mb-4">
          <div className="inline-block bg-gray-200 rounded px-2 py-1">
            <h2 className="text-black">Time: {count}s</h2>
          </div>
          <div className="inline-block bg-blue-200 rounded px-2 py-1">
            <h2 className="text-black">
              Progress: {userInput.length}/{targetText.length}
            </h2>
          </div>
          <div className="inline-block bg-green-200 rounded px-2 py-1">
            <h2 className="text-black">
              Accuracy: {calculateAccuracy().toFixed(1)}%
            </h2>
          </div>
        </div>

        <h1 className="text-2xl text-black font-bold mb-4 text-center">
          DuxcyHote in Bangkok 🦆
        </h1>

        {!gameStarted && !gameFinished ? (
          <div className="text-center">
            <p className="text-black mb-4">
              เสียงไหน ครือ ดักกี้โฮเต้ตัวจริง! 🦆✨
            </p>
            <button
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold"
            >
              Start Typing Challenge
            </button>
          </div>
        ) : (
          <div>
            <div className="text-black mb-4 p-4 border-2 border-gray-300 rounded-lg leading-relaxed text-lg">
              {renderText()}
            </div>

            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Start typing here..."
              className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-black text-lg resize-none"
              autoFocus
              disabled={gameFinished}
            />
          </div>
        )}
        <Image src={duck2} alt="Duck 2" className=" w-full h-auto" />
      </div>
    </div>
  );
}
