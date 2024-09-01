import "./style.css";
import Game from "./core/Game";
import { initializeAssets } from "./utils/AssetManager";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

if (canvas && context) {
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  // load all assets (future: load only necessary assets)
  await initializeAssets();

  // game init
  const game = new Game(canvas, context);
  game.start();
} else {
  console.error("Canvas not found");
}
