import './App.css';
import './Wheel.css';


function myfunction() {
    var x = 1000;   // min value
    var y = 1689;   // max value
    
    var deg = Math.floor(Math.random() * (x-y)) + y;
    var color, range;
    if(deg < 1690 && deg > 1331) range = deg - 360;
    else range = deg;

    if(range < 1016) color = 'red';
    else if((range > 1105 && range < 1151)) color = 'green'
    else if((range > 1195 && range < 1241)) color = 'light green'
    else if((range > 1152 && range < 1194)) color = 'dark blue'
    else color = 'blue'
    console.log(deg, color);
    document.getElementById("box").style.transform = "rotate("+deg+"deg)";
    document.getElementById('result').innerHTML = color;   
    
    let audio = new Audio("/ding.mp3")
const start = () => {
    audio.play()
  }
  if(color === "blue"){
    //audio.play()
  }
  let audios = new Audio("/stave.mp3")
var element = document.getElementById('mainbox');
element.classList.remove('animate');
  setTimeout(function(){
    element.classList.add('animate');
    document.getElementsByClassName('span1')[0].style.backgroundImage = "url('/stave.png')";

    audios.play()
    }, 5000);
}




function Wheel() {



  return (
<body>
    <div id="mainbox" className="mainbox">
        <div id="box" className="box">
            <div className="box1">
                <span className="span1"><b>1</b></span>
                <span className="span2"><b>2</b></span>
                <span className="span3"><b>3</b></span>
                <span className="span4"><b>4</b></span>
            </div>
            <div className="box2">
                <span className="span5"><b>5</b></span>
                <span className="span6"><b>6</b></span>
                <span className="span7"><b>7</b></span>
                <span className="span8"><b>8</b></span>
            </div>
        </div>

        <button className="spin" onClick={() => myfunction()}>หมุน</button>
    </div>

    <div id="result" className="result">
        <p></p>
    </div>

    <div className="web-cam">
      <video controls>
    <source src="stave.mp4" type="video/mp4"/>
      </video>
  </div>
</body>
  );
}

export default Wheel;
