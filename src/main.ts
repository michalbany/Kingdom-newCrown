import "./style.css";
import Game from "./core/Game";
import AssetManager from "./utils/AssetManager";

import playerRunPNG from './assets/playerRun.png';
import playerRunJSON from './assets/playerRun.json';
import playerIdlePNG from './assets/playerStanding.png';
import playerIdleJSON from './assets/playerStanding.json';

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

if (canvas && context) {
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

// load assets
  async function initializeAssets() {
    await AssetManager.loadSpriteSheet(
      "playerRun",
      playerRunPNG,
      playerRunJSON
    );
    await AssetManager.loadSpriteSheet(
      "playerIdle",
      playerIdlePNG,
      playerIdleJSON
    )
  }

  await initializeAssets();

  // game init
  const game = new Game(canvas, context);
  game.start();
} else {
  console.error("Canvas not found");
}
