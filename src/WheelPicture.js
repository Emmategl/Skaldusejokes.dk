import "./App.css";
import "./WheelPicture.css";
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
import { useRef, useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { motion, useAnimation } from "framer-motion";

function WheelPicture() {
  const [currentVideo, setCurrentVideo] = useState();
  const [rotation, setRotation] = useState(0);
  const [transitionEnd, setTransitionEnd] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [currentVideo]);

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

  let deg = 0;


  function start() {
    const startButton = document.querySelector(".button");
    const wheel = document.querySelector(".wheel");
    let audios = document.getElementById("sound");
    audios.play();
    startButton.classList.add("disabled");
    //document.getElementById("video").style.display = "block";
    var video = document.getElementById("video");
    video.muted = false;
    // Reset display
    // Disable button during spin
    startButton.style.pointerEvents = "none";
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + Math.random() * 5000);
    setRotation(deg);
    wheel.classList.add("blur");
  }

  function doSomething(deg) {
    const wheel = document.querySelector(".wheel");
    // Remove blur
    wheel.classList.remove("blur");

    const actualDeg = deg % 360;

    handleWin(actualDeg);
  }

  const handleWin = (actualDeg) => {
    setTransitionEnd(false);

    if (actualDeg <= 45) {
      setCurrentVideo(video1);
      playVideo();
    } else if (actualDeg > 45 && actualDeg <= 90) {
      setCurrentVideo(video2);
      playVideo();
    } else if (actualDeg > 90 && actualDeg <= 135) {
      setCurrentVideo(video3);
      playVideo();
    } else if (actualDeg > 135 && actualDeg <= 157.5) {
      setCurrentVideo(video4);
      playVideo();
    } else if (actualDeg > 157.5 && actualDeg <= 180) {
      setCurrentVideo(video5);
      playVideo();
    } else if (actualDeg > 180 && actualDeg <= 225) {
      setCurrentVideo(video6);
      playVideo();
    } else if (actualDeg > 225 && actualDeg <= 270) {
      setCurrentVideo(video7);
      playVideo();
    } else if (actualDeg > 270 && actualDeg <= 292.5) {
      setCurrentVideo(video8);
      playVideo();
    } else if (actualDeg > 292.5 && actualDeg <= 315) {
      setCurrentVideo(video9);
      playVideo();
    } else if (actualDeg > 315 && actualDeg <= 360) {
      setCurrentVideo(video10);
      playVideo();
    }

    function playVideo() {
      setTimeout(() => {
        document.getElementById("video").classList.add("videoanimation");
        document.getElementById("video").style.visibility = "visible";
        document.getElementById("video").play();
        document
          .getElementById("video")
          .addEventListener("ended", myHandler, false);

        function myHandler(e) {
          setCurrentVideo(null);
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
  };

  const onAnimationEnd = () => {
    setTransitionEnd(true);
  };

  return (
    <>
      <audio id="sound" src="/wheel.mp3" preload="auto">
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div id="outer">
        <div id="app">
          <img
            className="foot"
            style={{ pointerEvents: "none" }}
            src="fodgrøn2.png"
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
              src="HjulGrøntivideoer.png"
            />{" "}
          </motion.div>
          <img
            className="marker"
            style={{ pointerEvents: "none" }}
            src="markerlilla.png"
          />
          <img
            onClick={() => start()}
            className="button"
            src="buttongrønlyd.png"
          />
        </div>
        <div id="web-cam">
          <video ref={videoRef} playsInline id="video" muted>
            <source src={currentVideo} id="source" type="video/mp4" />
          </video>
          <div className="shadow"></div>
        </div>
      </div>
    </>
  );
}

export default WheelPicture;

//<animated.div className="test-box" style={spring}>{<h1>hi there</h1>}</animated.div>
//<animated.div style={styles}>{<h1>hi there</h1>}</animated.div>
//<motion.div animate={{ opacity: isVisible ? 1 : 0 }} />//

//<div>dhfdff</div>
//<div>ddffdh</div>
