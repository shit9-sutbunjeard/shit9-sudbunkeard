"use client";

import Image from "next/image";
import bg from "../../../public/bg.jpg";
import { use, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import Game1 from "./Game1";

export default function Game() {
  const [name, setName] = useState("");
  const [time, setTime] = useState(0);
  const [isGameDisplay, setGameDisplay] = useState(false);
  const [gameAppear, setGameAppear] = useState(10);
  const [videoId, setVideoId] = useState("paCPYrstBi8");
  const playerRef = useRef<any>(null);
  const [vdoList, setVideoList] = useState<string[]>([
    "kcT-i9xzC-",
    "IwzUs1IMdyQ",
    "4fndeDfaWCg",
    "dQw4w9WgXcQ",
    "OQlByoPdG6c",
  ]);

  const database = [
    "kcT-i9xzC-",
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

  useEffect(() => {
    if (gameAppear <= 0) {
      setGameDisplay(true);
      setGameAppear(10);
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
    const interval = setInterval(() => {
      setGameAppear((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (vdoList.length <= 0) {
      alert("No more videos available.You win");
    }
  }, [vdoList]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      iCiXz9ejudw
      {isGameDisplay && <Game1 setGameDisplay={setGameDisplay} addVdoList={addVdoList} />}
      <Image src={bg} alt="" className="absolute w-full h-full" />
      <div className="w-full h-full z-10 p-6 container mx-auto">
        <div className="flex w-full justify-between mb-6">
          <div className="bg-white p-4 text-4xl uppercase font-bold rounded-md h-fit">
            <p>You are {name}</p>
            <p>Your time that you use as stupid: {Math.floor(time)} seconds</p>
          </div>
          <div className="bg-white p-4 text-4xl uppercase font-bold rounded-md h-fit">
            <p>Your Clip {vdoList.length}</p>
            <p>Game Appear in {gameAppear}</p>
          </div>
        </div>
        <div className="w-full aspect-video bg-white rounded-md p-4 relative">
          {/* <div className="w-full h-full absolute top-0 left-0"></div> */}
          <div className="w-full h-full absolute top-0 left-0 p-4">
            <YouTube
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  // controls: 0,
                  // mute: 1, // Mute helps with autoplay
                  // loop: 1,
                  playlist: "paCPYrstBi8", // Required for loop
                  disablekb: 1,
                  fs: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              }}
              onReady={(event) => {
                playerRef.current = event.target;
                console.log("YouTube player ready:", event.target);
                // Force play when ready
                setTimeout(() => {
                  event.target.playVideo();
                }, 500);
              }}
              onPause={() => {
                // Auto resume if paused
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
                console.log("State changed:", event.data);

                if (event.data === -1 || event.data === 2 || event.data === 5) {
                  console.log("Attempting to play video...");
                  event.target.playVideo();
                  // window.location.reload()
                }

                if (event.data === 0) {
                  // Video ended, restart
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
