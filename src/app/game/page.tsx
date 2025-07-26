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
  const playerRef = useRef<any>(null);

  const [vdoList, setVideoList] = useState<string[]>([
    "kcT-i9xzC-",
    "IwzUs1IMdyQ",
    "4fndeDfaWCg",
    "dQw4w9WgXcQ",
    "OQlByoPdG6c",
  ]);

  useEffect(() => {
    if (gameAppear <= 0) {
      const randomIndex = Math.floor(Math.random() * 3); // 0 = Game1, 1 = Game2, 2 = Game3
      setGameIndex(randomIndex);
      setGameDisplay(true);
      setGameAppear(10); // Reset the timer when game appears
    }
  }, [gameAppear]);

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
    if (isGameDisplay) return; // Don't countdown while game is being played

    const interval = setInterval(() => {
      setGameAppear((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameDisplay]);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (vdoList.length <= 0) {
      alert("No more videos available. You win!");
    }
  }, [vdoList]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {isGameDisplay && (
        <>
          {/* {gameIndex === 0 && <Game1 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />}
          {gameIndex === 1 && <Game2 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />}
          {gameIndex === 2 && <Game3 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />} */}
          {gameIndex && (
            <Game6 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />
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
                const nextVideoId =
                  vdoList[Math.floor(Math.random() * vdoList.length)];
                setVideoId(nextVideoId);
                setVideoList((prev) => prev.filter((id) => id !== nextVideoId));
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
    </div>
  );
}
