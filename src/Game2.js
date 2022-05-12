import './Game2.css';

function Game2() {

    const sectors = [
        {color:"#f82", label:"Stack"},
        {color:"#0bf", label:"10"},
        {color:"#fb0", label:"200"},
        {color:"#0fb", label:"50"},
        {color:"#b0f", label:"100"},
        {color:"#f0b", label:"5"},
        {color:"#bf0", label:"500"},
      ];
      
      const rand = (m, M) => Math.random() * (M - m) + m;
      const tot = sectors.length;
      let ctx
      if(document.querySelector("#wheel") && document.querySelector("#spin")){
      const EL_spin = document.querySelector("#spin");
      ctx = document.querySelector("#wheel").getContext('2d');
 
      const dia = ctx.canvas.width;
      const rad = dia / 2;
      const PI = Math.PI;
      const TAU = 2 * PI;
      const arc = TAU / sectors.length;
      
      const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
      let angVel = 0; // Angular velocity
      let ang = 0; // Angle in radians
      
      const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;
      
      function drawSector(sector, i) {
        const ang = arc * i;
        ctx.save();
        // COLOR
        ctx.beginPath();
        ctx.fillStyle = sector.color;
        ctx.moveTo(rad, rad);
        ctx.arc(rad, rad, rad, ang, ang + arc);
        ctx.lineTo(rad, rad);
        ctx.fill();
        // TEXT
        ctx.translate(rad, rad);
        ctx.rotate(ang + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 30px sans-serif";
        ctx.fillText(sector.label, rad - 10, 10);
        //
        ctx.restore();
      };
      
      function rotate() {
        const sector = sectors[getIndex()];
        ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
        EL_spin.textContent = !angVel ? "SPIN" : sector.label;
        EL_spin.style.background = sector.color;
      }
      
      function frame() {
        if (!angVel) return;
        angVel *= friction; // Decrement velocity by friction
        if (angVel < 0.002) angVel = 0; // Bring to stop
        ang += angVel; // Update angle
        ang %= TAU; // Normalize angle
        rotate();
      }
      
      function engine() {
        frame();
        requestAnimationFrame(engine)
      }
      
      // INIT
      sectors.forEach(drawSector);
      rotate(); // Initial rotation
      engine(); // Start engine
      EL_spin.addEventListener("click", () => {
        if (!angVel) angVel = rand(0.25, 0.35);
      });
    }
    return (
        <div id="wheelOfFortune">
        <canvas id="wheel" width="300" height="300"></canvas>
        <div id="spin">SPIN</div>
      </div>
    );
  }
  
  
  //<div className="web-cam">
  //<video id="video">
  //<source src="stave.mp4" type="video/mp4"/>
  //</video>
  //</div>
  export default Game2;
