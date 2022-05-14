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

import { useRef, useEffect, useState } from "react";

function WheelPicture() {
const[currentVideo, setCurrentVideo] = useState()

  const videoRef = useRef();

  useEffect(() => {    
    videoRef.current?.load();
  }, [currentVideo]);

  let deg = 0;
  let zoneSize = 45; // deg

  // Counter clockwise
  const symbolSegments = {
    1: "Frog",
    2: "Snail",
    3: "Dolphin",
    4: "Ladybug",
    5: "Koala",
    6: "Unicorn",
    7: "Dragon",
    8: "Snowman",
  };


  const handleWin = (actualDeg) => {
    const display = document.querySelector(".display");
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    display.innerHTML = symbolSegments[winningSymbolNr];
    //currentVideo = JSON.stringify(videos[winningSymbolNr]);
    alert(winningSymbolNr)
    if(winningSymbolNr===1){
      setCurrentVideo(video1)
    }
    if(winningSymbolNr===2){
      setCurrentVideo(video2)
    }
    if(winningSymbolNr===3){
      setCurrentVideo(video3)
    }
    if(winningSymbolNr===4){
      setCurrentVideo(video4)
    }
    if(winningSymbolNr===5){
      setCurrentVideo(video5)
    }
    if(winningSymbolNr===6){
      setCurrentVideo(video6)
    }
    if(winningSymbolNr===7){
      setCurrentVideo(video7)
    }
    if(winningSymbolNr===8){
      setCurrentVideo(video8)
    }
    
    if (winningSymbolNr) {
      setTimeout(() => {
        console.log("Delayed for 1 second.");
        let hi = window.innerHeight

        setTimeout(() => {
          console.log("Delayed for 1 second.");
        document.getElementById("video").classList.add("videoanimation");
        document.getElementById("video").style.visibility = "visible"
        document.getElementById("video").play();
        document.getElementById("video").addEventListener("ended", myHandler, false);
        function myHandler(e) {
          document.getElementById("video").style.display = "none";
        }
      }, "1000")
      }, "1000");
    }
  };

  function start() {
    //document.getElementById("video").style.display = "block";
    var video = document.getElementById("video");
    video.muted = false;
    const display = document.querySelector(".display");
    const startButton = document.querySelector(".button");
    const wheel = document.querySelector(".wheel");
    // Reset display
    display.innerHTML = "-";
    // Disable button during spin
    startButton.style.pointerEvents = "none";
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + Math.random() * 5000);
    // Set the transition on the wheel
    wheel.style.transition = "all 10s ease-out";
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    wheel.classList.add("blur");

    wheel.addEventListener("transitionend", () => {
      // Remove blur
      wheel.classList.remove("blur");
      // Enable button when spin is over
      startButton.style.pointerEvents = "auto";
      // Need to set transition to none as we want to rotate instantly
      wheel.style.transition = "none";
      // Calculate degree on a 360 degree basis to get the "natural" real rotation
      // Important because we wan/wheel.pngt to start the next spin from that one
      // Use modulus to get the rest value
      const actualDeg = deg % 360;
      // Set the real rotation instantly without animation
      wheel.style.transform = `rotate(${actualDeg}deg)`;
      // Calculate and display the winning symbol
      handleWin(actualDeg);
    });
  }

  return (
    <>
      <div id="outer">
        <div id="app">
          <img className="foot" src="fod2.png" />
          <img className="wheel" src="WheelsThis.png" />
          <img className="marker" src="marker.png" />
          <img onClick={() => start()} className="button" src="button.png" />
          <div className="display">-</div>
        </div>
        <div id="web-cam">
          <video ref={videoRef} playsInline id="video" muted>
            <source src={currentVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}

export default WheelPicture;
