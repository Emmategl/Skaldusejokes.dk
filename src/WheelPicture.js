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
  let audios = new Audio("/wheel.mp3")

  useEffect(() => {    
    videoRef.current?.load();
    audios.load()
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

  var prefix = (function () {
    var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('') 
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1],
      dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  })();


  

  const handleWin = (actualDeg) => {
    console.log(actualDeg)
    console.log(zoneSize)
    
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
   // if(actualDeg <= 45){
   //   alert("bringer ud")
   // }
   // if(actualDeg > 45 && actualDeg <= 90){
   //   alert("anders")
   // }
   // if(actualDeg > 90 && actualDeg <= 112.5){
   //   alert("bytte")
   // }
   // if(actualDeg > 112.5 && actualDeg <= 135){
   //   alert("lilla")
   // }
   // if(actualDeg > 135 && actualDeg <= 180){
   //   alert("anden25")
   // }
   // if(actualDeg > 180 && actualDeg <= 225){
   //   alert("vender")
   // }
   // if(actualDeg > 225 && actualDeg <= 270){
   //   alert("tal for dig")
   // }
   // if(actualDeg > 270 && actualDeg <= 315){
   //   alert("shh")
   // }
   // if(actualDeg > 315 && actualDeg <= 360){
   //   alert("coke")
   // }


    console.log(winningSymbolNr)
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
        document.getElementById("video").classList.add("videoanimation");
        document.getElementById("video").style.visibility = "visible"
        //document.querySelector(".wheel").style.zIndex = "0";
        document.getElementById("video").play();
        document.getElementById("video").addEventListener("ended", myHandler, false);
        function myHandler(e) {
          document.getElementById("video").classList.remove("videoanimation");
          //document.getElementById("video").style.display = "none";
          document.getElementById("video").style.visibility = "hidden"
          const startButton = document.querySelector(".button");
           // Enable button when spin is over
          startButton.style.pointerEvents = "auto";
          startButton.classList.remove("disabled");
        }
      }, "500")
    }
  };

  document.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      const startButton = document.querySelector(".button");
      if(!startButton.classList.contains("disabled")){
      // Trigger the button element with a click
      start()
      }
    }
  });

  function start() {
    const startButton = document.querySelector(".button");
    const wheel = document.querySelector(".wheel");
    audios.play()
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
    //wheel.style.webkitTransition="all 9s ease-in-out";
    wheel.style.webkitTransitionProperty = "transform";
    wheel.style.webkitTransitionDuration = "9s";
    wheel.style.webkitTransitionDelay = "0s";
    wheel.style.webkitTransitionTimingFunction = "ease-in-out";
    wheel.style.MozTransition="all 9s ease-in-out";
    wheel.style.msTransition="all 9s ease-in-out";
    wheel.style.OTransition="all 9s ease-in-out";
    // Rotate the wheel
    //wheel.style.webkitAnimationDelay='-0.2s';
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


    //wheel.addEventListener("webkitTransitionEnd", () => {
    //  //alert("finished")
    //  // Remove blur
    //  wheel.classList.remove("blur");
    // 
    // 
    //  // Need to set transition to none as we want to rotate instantly
    //  wheel.style.transition = "none";
    //  wheel.style.webkitTransition="none";
    //  // Calculate degree on a 360 degree basis to get the "natural" real rotation
    //  // Important because we wan/wheel.pngt to start the next spin from that one
    //  // Use modulus to get the rest value
    //  const actualDeg = deg % 360;
    //  console.log(actualDeg)
    //  // Set the real rotation instantly without animation
    //  wheel.style.transform = `rotate(${actualDeg}deg)`;
    //  wheel.style.webkitTransform = `rotate(${actualDeg}deg)`;
    //  // Calculate and display the winning symbol
    //  handleWin(actualDeg);
    //});

  function doSomething(){
    console.log("finished")
  //alert("finished")
  // Remove blur
  wheel.classList.remove("blur");
 
 
  // Need to set transition to none as we want to rotate instantly
  wheel.style.transition = "none";
  wheel.style.webkitTransition="none";
  wheel.style.mozTransition="none";
  wheel.style.oTransition="none";

  //wheel.style.transitionProperty = "none";
  //wheel.style.WebkitTransitionProperty="none";
  //wheel.style.mozTransitionProperty="none";
  //wheel.style.oTransitionProperty="none";
  
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
  // Important because we wan/wheel.pngt to start the next spin from that one
  // Use modulus to get the rest value
  const actualDeg = deg % 360;
  console.log(actualDeg)
  // Set the real rotation instantly without animation
  wheel.style.transform = `rotate(${actualDeg}deg)`;
  wheel.style.webkitTransform = `rotate(${actualDeg}deg)`;
  wheel.style.MozTransform = `rotate(${actualDeg}deg)`;
  wheel.style.msTransform = `rotate(${actualDeg}deg)`;
  wheel.style.OTransform = `rotate(${actualDeg}deg)`;

  // Calculate and display the winning symbol
  handleWin(actualDeg);
    }
}

  return (
    <>
    <audio id="sound" src="/wheel.mp3" preload="auto">
      Your browser does not support the <code>audio</code> element.
    </audio>

      <div id="outer">
        <div id="app">
          <img className="foot" src="fodgrøn2.png" />
          <img className="wheel" src="hjulgrøn.png" />
          <img className="marker" src="markerlilla.png" />
          <img onClick={() => start()} className="button" src="buttongrøn.png" />
        </div>
        <div id="web-cam">
          <video ref={videoRef} playsInline id="video" muted>
            <source src={currentVideo} type="video/mp4" />
          </video>
          <div className="shadow"></div>
        </div>
      </div>
    </>
  );
}

export default WheelPicture;
