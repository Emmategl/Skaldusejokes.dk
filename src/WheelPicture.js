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

function WheelPicture() {
  const [currentVideo, setCurrentVideo] = useState();
  const [winningVideo, setWinningVideo] = useState("1");

  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [currentVideo]);

  useEffect(() => {
    let audios = document.getElementById("sound");
    if (audios) {
      audios.load();
    }
  }, []);

  let deg = 0;

  const handleWin = (actualDeg) => {
    if (actualDeg <= 45) {
      setCurrentVideo(video1);
      win();
    } else if (actualDeg > 45 && actualDeg <= 90) {
      setCurrentVideo(video2);
      win();
    } else if (actualDeg > 90 && actualDeg <= 135) {
      setCurrentVideo(video3);
      win();
    } else if (actualDeg > 135 && actualDeg <= 157.5) {
      setCurrentVideo(video4);
      win();
    } else if (actualDeg > 157.5 && actualDeg <= 180) {
      setCurrentVideo(video5);
      win();
    } else if (actualDeg > 180 && actualDeg <= 225) {
      setCurrentVideo(video6);
      win();
    } else if (actualDeg > 225 && actualDeg <= 270) {
      setCurrentVideo(video7);
      win();
    } else if (actualDeg > 270 && actualDeg <= 292.5) {
      setCurrentVideo(video8);
      win();
    } else if (actualDeg > 292.5 && actualDeg <= 315) {
      setCurrentVideo(video9);
      win();
    } else if (actualDeg > 315 && actualDeg <= 360) {
      setCurrentVideo(video10);
      win();
    }

    function win() {
      console.log("hi");
      setTimeout(() => {
        console.log("Delayed for 1 second.");
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
          const wheel = document.querySelector(".wheel");
          wheel.removeEventListener("transitionend", doSomething);
          wheel.removeEventListener("webkitTransitionEnd", doSomething);
          wheel.removeEventListener("mozTransitionEnd", doSomething);
          wheel.removeEventListener("oTransitionEnd", doSomething);
        }
      }, "500");
    }
  };

  document.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      const startButton = document.querySelector(".button");
      if (!startButton.classList.contains("disabled")) {
        // Trigger the button element with a click
        start();
      }
    }
  });

  function start() {
    console.log("there");
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

    // Set the transition on the wheel
    wheel.style.transition = "all 9s ease-in-out";
    wheel.style.webkitTransitionProperty = "transform";
    wheel.style.webkitTransitionDuration = "9s";
    wheel.style.webkitTransitionDelay = "0s";
    wheel.style.webkitTransitionTimingFunction = "ease-in-out";
    wheel.style.MozTransition = "all 9s ease-in-out";
    wheel.style.msTransition = "all 9s ease-in-out";
    wheel.style.OTransition = "all 9s ease-in-out";
    // Rotate the wheel

    wheel.style.webkitTransformDelay = "-0.1s";
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.style.webkitTransform = `rotate(${deg}deg)`;
    wheel.style.MozTransform = `rotate(${deg}deg)`;
    wheel.style.msTransform = `rotate(${deg}deg)`;
    wheel.style.OTransform = `rotate(${deg}deg)`;
    // Apply the blur
    wheel.classList.add("blur");

    wheel.addEventListener("transitionend", doSomething);
    wheel.addEventListener("webkitTransitionEnd", doSomething);
    wheel.addEventListener("mozTransitionEnd", doSomething);
    wheel.addEventListener("oTransitionEnd", doSomething);
  }

  function doSomething() {
    console.log("finished");
    const wheel = document.querySelector(".wheel");

    // Remove blur
    wheel.classList.remove("blur");

    // Need to set transition to none as we want to rotate instantly
    wheel.style.transition = "none";
    wheel.style.webkitTransition = "none";
    wheel.style.mozTransition = "none";
    wheel.style.oTransition = "none";

    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we wan/wheel.pngt to start the next spin from that one
    // Use modulus to get the rest value
    const actualDeg = deg % 360;
    console.log(actualDeg);
    // Set the real rotation instantly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    wheel.style.webkitTransform = `rotate(${actualDeg}deg)`;
    wheel.style.MozTransform = `rotate(${actualDeg}deg)`;
    wheel.style.msTransform = `rotate(${actualDeg}deg)`;
    wheel.style.OTransform = `rotate(${actualDeg}deg)`;
    // Calculate and display the winning symbol
    handleWin(actualDeg);
  }

  return (
    <>
      <audio id="sound" src="/wheel.mp3" preload="auto">
        Your browser does not support the <code>audio</code> element.
      </audio>

      <div id="outer">
        <div id="app">
          <img className="foot" style={{ pointerEvents: "none" }} src="fodgrøn2.png" />
          <img className="wheel" style={{ pointerEvents: "none" }} src="HjulGrøntivideoer.png" />
          <img className="marker" style={{ pointerEvents: "none" }} src="markerlilla.png" />
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
