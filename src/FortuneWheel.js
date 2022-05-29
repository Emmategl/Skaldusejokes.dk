import "./App.css";
import "./FortuneWheel.css";
import sound from "./Sound/wheel.mp3";

import foot from "./Images/foot.png"
import wheel from "./Images/wheel.png"
import marker from "./Images/marker.png"

import video1 from "./Videos/Video1.mp4";
import video2 from "./Videos/Video2.mp4";
import video3 from "./Videos/Video3.mp4";
import video4 from "./Videos/Video4.mp4";
import video5 from "./Videos/Video5.mp4";
import video6 from "./Videos/Video6.mp4";
import video7 from "./Videos/Video7.mp4";
import video8 from "./Videos/Video8.mp4";
import video9 from "./Videos/Video9.mp4";
import video10 from "./Videos/Video10.mp4";

import video1Web from "./Videos/Video1.webm";
import video2Web from "./Videos/Video2.webm";
import video3Web from "./Videos/Video3.webm";
import video4Web from "./Videos/Video4.webm";
import video5Web from "./Videos/Video5.webm";
import video6Web from "./Videos/Video6.webm";
import video7Web from "./Videos/Video7.webm";
import video8Web from "./Videos/Video8.webm";
import video9Web from "./Videos/Video9.webm";
import video10Web from "./Videos/Video10.webm";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
//import Icons from './Icons.svg'

function FortuneWheel() {
  const [currentVideoMP4, setCurrentVideoMP4] = useState();
  const [currentVideoWebM, setCurrentVideoWebM] = useState();
  const [rotation, setRotation] = useState(0);
  const [transitionEnd, setTransitionEnd] = useState(false);
  const [ignoreFirst, setIgnoreFirst] = useState(true);
  const videoRef = useRef();


  useEffect(() => {
    videoRef.current?.load();
  }, [currentVideoMP4]);

  useEffect(() => {
    if (transitionEnd) {
      doSomething(rotation);
    }
  }, [transitionEnd]);

  useEffect(() => {
    let audio = document.getElementById("sound");
    if (audio) {
      audio.load();
    }
  }, []);

  let deg;

  function start() {
    setIgnoreFirst(false);
    const startButton = document.querySelector(".button");
    const wheel = document.querySelector(".wheel");
    document.getElementById("sound").play();
    startButton.classList.add("disabled");
    //document.getElementById("video").style.display = "block";
    var video = document.getElementById("video");
    video.muted = false;
    // Reset display
    // Disable button during spin
    startButton.style.pointerEvents = "none";
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + Math.random() * 5000);
    setRotation((prevState) => prevState + deg);
    wheel.classList.add("blur");
  }

  function doSomething(deg) {
    const wheel = document.querySelector(".wheel");
    wheel.classList.remove("blur");
    const actualDeg = deg % 360;
    handleWin(actualDeg);
  }

  function handleWin(actualDeg) {
    setTransitionEnd(false);
    if (actualDeg <= 45) {
      setCurrentVideoMP4(video1);
      setCurrentVideoWebM(video1Web);
      playVideo();
    } else if (actualDeg > 45 && actualDeg <= 90) {
      setCurrentVideoMP4(video2);
      setCurrentVideoWebM(video2Web);
      playVideo();
    } else if (actualDeg > 90 && actualDeg <= 135) {
      setCurrentVideoMP4(video3);
      setCurrentVideoWebM(video3Web);
      playVideo();
    } else if (actualDeg > 135 && actualDeg <= 157.5) {
      setCurrentVideoMP4(video4);
       setCurrentVideoWebM(video4Web);
      playVideo();
    } else if (actualDeg > 157.5 && actualDeg <= 180) {
      setCurrentVideoMP4(video5);
      setCurrentVideoWebM(video5Web);
      playVideo();
    } else if (actualDeg > 180 && actualDeg <= 225) {
      setCurrentVideoMP4(video6);
      setCurrentVideoWebM(video6Web);
      playVideo();
    } else if (actualDeg > 225 && actualDeg <= 270) {
      setCurrentVideoMP4(video7);
      setCurrentVideoWebM(video7Web);
      playVideo();
    } else if (actualDeg > 270 && actualDeg <= 292.5) {
      setCurrentVideoMP4(video8);
      setCurrentVideoWebM(video8Web);
      playVideo();
    } else if (actualDeg > 292.5 && actualDeg <= 315) {
      setCurrentVideoMP4(video9);
      setCurrentVideoWebM(video9Web);
      playVideo();
    } else if (actualDeg > 315 && actualDeg <= 360) {
      setCurrentVideoMP4(video10);
      setCurrentVideoWebM(video10Web);
      playVideo();
    }

    function playVideo() {
      setTimeout(() => {
        const sound = document.getElementById("sound")
        sound.pause();
        sound.currentTime = 0;

        document.getElementById("video").classList.add("videoanimation");
        document.getElementById("video").style.visibility = "visible";
        document.getElementById("video").play();
        document
          .getElementById("video")
          .addEventListener("ended", myHandler, false);

        function myHandler(e) {
          setCurrentVideoMP4(null);
          //audios.remove();
          document.getElementById("source").srcObject = null;
          document.getElementById("video").classList.remove("videoanimation");
          document.getElementById("video").style.visibility = "hidden";
          const startButton = document.querySelector(".button");

          // Enable button when spin is over
          startButton.style.pointerEvents = "auto";
          startButton.classList.remove("disabled");
        }
      }, "300");
    }
  }

  const onAnimationEnd = () => {
    if (!ignoreFirst) {
      setTransitionEnd(true);
    }
  };

  return (
    <>
      <audio id="sound" type="audio/mpeg" src={sound} preload="auto">
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div id="outer">
        <div id="app">
          <img
            className="foot"
            style={{ pointerEvents: "none" }}
            src={foot}
          />
          <motion.div
            initial={{ "--rotate": `${rotation}deg` }}
            animate={{ "--rotate": `${rotation}deg` }}
            onAnimationComplete={() => onAnimationEnd()}
            transition={{ ease: "easeInOut", duration: 9 }}
          >
            <img
              className="wheel"
              style={{ transform: "rotate(var(--rotate))" }}
              src={wheel}
            />{" "}
          </motion.div>
          <img
            className="marker"
            style={{ pointerEvents: "none" }}
            src={marker}
          />
          <button
           onClick={() => start()}
           className="button"
          >
            Få svaret
            <img id="icon" src={require('./IconsWhite.svg').default} alt="Start hjulet" />
          </button>
        </div>
        <div id="web-cam">
          <video ref={videoRef} playsInline id="video" muted>
            <source src={currentVideoMP4} id="source" type="video/mp4" />
            <source src={currentVideoWebM} id="source" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="shadow"></div>
        </div>
      </div>
    </>
  );
}

export default FortuneWheel;

