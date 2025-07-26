"use client";

import Image from "next/image";
import bg from "../../../public/bg.jpg";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import Game1 from "./Game1";
import Game2 from "./Game2";
import Game3 from "./Game3";
import Game4 from "./Game4";
import Game5 from "./Game5";
import Game6 from "./Game6";
import Game7 from "./Game7";
import Win from "./Win";

const database = [
  "kcT-i9xzC-8",
  "IwzUs1IMdyQ",
  "4fndeDfaWCg",
  "dQw4w9WgXcQ",
  "OQlByoPdG6c",
  "DGzhiCJznFw",
  "YQZEoZ4W0ac",
  "W1AX0MdzK3M",
  "z2jibq05FI4",
  "iCiXz9ejudw",
  "aAkMkVFwAoo",
  "DzivgKuhNl4",
  "jK-ThBGt23E",
  "Ai_szXbG9hw",
  "4zyBrkPZkiw",
  "NfuiB52K7X8",
  "j9V78UbdzWI",
  "viMEhOWcxd0",
  "L6ZkEWHoAPA",
  "9MCiixIkzUk",
  "frAhxXbLetk",
  "0m-OAn4LfQU",
  "u8OhrAhKf_c",
  
];

export default function Game() {
  const [name, setName] = useState("");
  const [time, setTime] = useState(0);
  const [isGameDisplay, setGameDisplay] = useState(false);
  const [gameAppear, setGameAppear] = useState(10);
  const [videoId, setVideoId] = useState(
    database[Math.floor(Math.random() * database.length)]
  );
  const [gameIndex, setGameIndex] = useState(0);
  const [showCheatPanel, setShowCheatPanel] = useState(false);
  const [bearerEnabled, setBearerEnabled] = useState(true);
  const [showWinPage, setShowWinPage] = useState(false);
  const playerRef = useRef<any>(null);

  const [vdoList, setVideoList] = useState<string[]>([
    "kcT-i9xzC-",
    "IwzUs1IMdyQ",
    "4fndeDfaWCg",
    "dQw4w9WgXcQ",
    "OQlByoPdG6c",
  ]);

  const [initialVideoCount] = useState(5); // Track initial video count for summary

  useEffect(() => {
    if (gameAppear <= 0 && !showWinPage) {
      // Don't show games when win page is active
      const randomIndex = Math.floor(Math.random() * 7); // 0 = Game1, 1 = Game2, 2 = Game3
      setGameIndex(randomIndex);
      setGameDisplay(true);
      setGameAppear(10); // Reset the timer when game appears
    }
  }, [gameAppear, showWinPage]);

  function addVdoList() {
    const newVideoId = database[Math.floor(Math.random() * database.length)];
    setVideoList((prevList) => [...prevList, newVideoId]);
  }

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    } else {
      setName("Player");
    }
  }, []);

  useEffect(() => {
    if (showWinPage || isGameDisplay) return; // Don't countdown while game is being played OR when win page is shown

    const interval = setInterval(() => {
      setGameAppear((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameDisplay, showWinPage]);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cheat command listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setShowCheatPanel((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleGameTimeChange = (newTime: number) => {
    setGameAppear(newTime);
  };

  const handleSelectGame = (gameNumber: number) => {
    setGameIndex(gameNumber);
    setGameDisplay(true);
  };

  const handleAddVideo = () => {
    addVdoList();
  };

  const handleRemoveVideo = (index: number) => {
    setVideoList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllVideos = () => {
    setVideoList([]);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {showWinPage && <Win setWinDisplay={setShowWinPage} />}

      {isGameDisplay && (
        <>
          {gameIndex === 0 && (
            <Game1 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
          )}
          {gameIndex === 1 && (
            <Game2 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
          )}
          {gameIndex === 2 && (
            <Game3 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
          )}
          {gameIndex === 3 && (
            <Game4 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
          )}
          {gameIndex === 4 && (
            <Game5 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
          )}
          {gameIndex === 5 && (
            <Game6 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
          )}
          {gameIndex === 6 && (
            <Game7 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
          )}
          {gameIndex === 7 && (
            <Game7 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
          )}
        </>
      )}

      <Image src={bg} alt="" className="absolute w-full h-full object-cover" />
      <div className="w-full h-full z-10 p-6 container mx-auto">
        <div className="w-full mb-6 bg-white rounded-md p-4">
          <table className="w-full text-3xl text-black uppercase font-bold border-separate border-spacing-2">
            <tbody>
              <tr>
                <td>You are</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>Your time that you use as stupid</td>
                <td>
                  <span className="bg-red-500 rounded p-2 inline-block text-center text-white">
                    {Math.floor(time)}
                  </span>{" "}
                  seconds
                </td>
              </tr>
              <tr>
                <td>Your Clip</td>
                <td>{vdoList.length}</td>
              </tr>
              <tr>
                <td>Game Appear in</td>
                <td>{gameAppear} Seconds</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="w-full aspect-video bg-white rounded-md p-4 relative">
          {bearerEnabled && (
            <div
              id="bearer"
              className="z-10 absolute w-full h-full bg-transparent"
            />
          )}
          <div className="w-full h-full absolute top-0 left-0 p-4">
            <YouTube
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  disablekb: 1,
                  fs: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              }}
              onReady={(event) => {
                playerRef.current = event.target;
                setTimeout(() => {
                  event.target.playVideo();
                }, 500);
              }}
              onPause={() => {
                if (playerRef.current) {
                  playerRef.current.playVideo();
                }
              }}
              onEnd={() => {
                if (vdoList.length <= 1) {
                  // Store game summary data before showing win screen
                  localStorage.setItem("totalGameTime", time.toString());
                  localStorage.setItem(
                    "videosWatched",
                    initialVideoCount.toString()
                  );

                  // This is the last video, show win screen after it ends
                  setVideoList([]);
                  setShowWinPage(true);
                } else {
                  // Play next video and remove current one from list
                  const nextVideoId =
                    vdoList[Math.floor(Math.random() * vdoList.length)];
                  setVideoId(nextVideoId);
                  setVideoList((prev) =>
                    prev.filter((id) => id !== nextVideoId)
                  );
                }
              }}
              onStateChange={(event) => {
                if ([-1, 2, 5].includes(event.data)) {
                  event.target.playVideo();
                }
                if (event.data === 0) {
                  event.target.seekTo(0);
                  event.target.playVideo();
                }
              }}
              videoId={videoId}
            />
          </div>
        </div>
      </div>

      {/* Cheat Panel */}
      {showCheatPanel && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[100] flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-black mb-4">
              🔧 Admin Cheat Panel
            </h2>

            <div className="space-y-4">
              {/* Game Timer Control */}
              <div>
                <label className="block text-black font-bold mb-2">
                  Game Appear Timer:
                </label>
                <input
                  type="number"
                  value={gameAppear}
                  onChange={(e) =>
                    handleGameTimeChange(parseInt(e.target.value) || 0)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  min="0"
                  max="999"
                />
              </div>

              {/* Game Selection */}
              <div>
                <label className="block text-black font-bold mb-2">
                  Select Game:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((gameNum) => (
                    <button
                      key={gameNum}
                      onClick={() => handleSelectGame(gameNum)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
                    >
                      Game {gameNum + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bearer Toggle */}
              <div>
                <label className="block text-black font-bold mb-2">
                  Bearer Protection:
                </label>
                <button
                  onClick={() => setBearerEnabled(!bearerEnabled)}
                  className={`w-full py-2 px-4 rounded font-bold ${
                    bearerEnabled
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {bearerEnabled ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              {/* Video List Management */}
              <div>
                <label className="block text-black font-bold mb-2">
                  Video List ({vdoList.length} videos):
                </label>

                <div className="mb-2 flex gap-2">
                  <button
                    onClick={handleAddVideo}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Add Random Video
                  </button>
                  <button
                    onClick={handleClearAllVideos}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Clear All
                  </button>
                </div>

                <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2">
                  {vdoList.length === 0 ? (
                    <p className="text-gray-500 text-sm">No videos in list</p>
                  ) : (
                    vdoList.map((videoId, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0"
                      >
                        <span className="text-xs text-black truncate flex-1">
                          {videoId}
                        </span>
                        <button
                          onClick={() => handleRemoveVideo(index)}
                          className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-xs ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowCheatPanel(false)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded font-bold"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
