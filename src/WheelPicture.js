import "./App.css";
import "./WheelPicture.css";
import { useEffect, useState } from "react";

function WheelPicture() {
  const [wheel, setWheel] = useState();

  const startButton = document.querySelector(".button");
  const display = document.querySelector(".display");

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
  };

  function start() {
    const display = document.querySelector(".display");
    const startButton = document.querySelector(".button");
    const wheel = document.querySelector(".wheel");
    setWheel(wheel);
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
    <div id="app">
      <img className="marker" src="marker.png" />
      <img className="wheel" src="wheel.png" />

      <img onClick={() => start()} className="button" src="button.png" />

      <div className="display">-</div>
    </div>
  );
}

export default WheelPicture;
