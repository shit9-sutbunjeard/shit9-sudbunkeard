import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import End1 from "../../../public/end.jpg";
import End2 from "../../../public/end2.jpg";

export default function Win({
  setWinDisplay,
}: {
  setWinDisplay: (display: boolean) => void;
}) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasSeenAllImages, setHasSeenAllImages] = useState(false);

  const images = [End1, End2];

  const handleImageClick = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      // Mark that user has seen all images
      setHasSeenAllImages(true);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  // Get summary data from localStorage
  const getGameSummary = () => {
    const name = localStorage.getItem("name") || "Player";
    const totalTime = localStorage.getItem("totalGameTime") || "Unknown";
    const videosWatched = localStorage.getItem("videosWatched") || "Unknown";

    return { name, totalTime, videosWatched };
  };

  const { name, totalTime, videosWatched } = getGameSummary();

  return (
    <div className="bg-gray-500/20 backdrop-blur-2xl z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center shadow">
      <div className="bg-white p-6 max-w-[600px] w-full rounded-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black mb-2">
            🎉 Congratulations! You Win! 🎉
          </h1>
          <p className="text-gray-600">
            You have successfully completed all the brain rot challenges!
          </p>
        </div>

        {/* Game Summary */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-black mb-3 text-center">
            📊 Game Summary
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-black font-semibold">Player:</span>
              <span className="text-gray-700">{name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black font-semibold">
                Total Time Played:
              </span>
              <span className="text-gray-700">{totalTime} seconds</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black font-semibold">Videos Watched:</span>
              <span className="text-gray-700">{videosWatched}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black font-semibold">Status:</span>
              <span className="text-green-600 font-bold">
                BRAIN ROT MASTER! 🧠
              </span>
            </div>
          </div>
        </div>

        <p className="text-black text-center mb-4">
          {hasSeenAllImages
            ? "🎊 Amazing! Now you can choose what to do next!"
            : "Click the image to continue"}
        </p>
        <div className="text-center mb-4">
          <Image
            src={images[currentImageIndex]}
            alt={`Win Image ${currentImageIndex + 1}`}
            className={`object-cover transition-opacity rounded-lg w-full h-auto ${
              hasSeenAllImages ? "" : "cursor-pointer hover:opacity-80"
            }`}
            onClick={hasSeenAllImages ? undefined : handleImageClick}
          />
        </div>

        {/* Navigation Buttons - Only show after seeing all images */}
        {hasSeenAllImages && (
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleGoHome}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              🏠 Go Home
            </button>
            <button
              onClick={() => setWinDisplay(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
