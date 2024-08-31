import "./style.css";
import Game from "./core/Game";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

if (canvas && context) {
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  // game init
  const game = new Game(canvas, context);
  game.start();
} else {
  console.error("Canvas not found");
}
