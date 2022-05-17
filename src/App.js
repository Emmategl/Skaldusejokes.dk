import logo from './logo.svg';
import './App.css';
import Wheel from './Wheel';
import Circle from './Circle';
import Game2 from './Game2';
import WheelPicture from './WheelPicture';
import tekst from "./test.png"
function App() {
  return (
    <>
        <div id="text">
    <h1>Burde du tage ind og se:</h1>
    <div id="containerIntro">
    <h2>"JOKES - fra en hvid, straight mand" ?</h2>

    </div>
    </div>
    <WheelPicture></WheelPicture>
    </>
  );
}

export default App;

//<h1>Burde du se "JOKES - fra en hvid, straigth mand"?</h1>   <img src={tekst} className="App-logo" alt="logo"/>

/*
    <h1>Burde du opleve Matthesens nye turné? </h1>

<h1>Burde du se </h1>
<div id="containerIntro">
<h2>JOKES - fra en hvid, straigth mand <span>?</span></h2>
</div>
*/
