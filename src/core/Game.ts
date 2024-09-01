import Player from "../entities/Player";
import InputHandler from "./Input";
import TimeManager from "./TimeManager";
import Camera from "./Camera";
import Ground from "../entities/Ground";
import { wordState } from "./State";
import { renderGameUI } from "../components/gameUI";

class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lastRenderTime: number = 0;
  private player: Player;
  private camera: Camera;
  private ground: Ground;
  private input: InputHandler;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.camera = new Camera(canvas.width);
    this.ground = new Ground(
      wordState.boundaries.left,
      canvas.height - 150,
      wordState.boundaries.right,
      150
    );
    // init entities
    this.input = new InputHandler();
    this.player = new Player(wordState.center, canvas.height - 200, this.input);
  }

  get groundLevel() {
    return this.canvas.height - 150;
  }

  get screenMiddle() {
    return this.canvas.width / 2;
  }

  start() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  private gameLoop(currentTime: number) {
    const deltaTime = (currentTime - this.lastRenderTime) / 1000;
    this.lastRenderTime = currentTime;

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update game state
    this.update(deltaTime);

    // Render game objects
    this.render();
    renderGameUI(this.context, this.player, deltaTime);

    // Request the next frame
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  private update(deltaTime: number) {
    this.camera.centerOn(this.player);
    TimeManager.update(deltaTime);
    this.player.update(deltaTime);
  }

  private render() {
    this.context.imageSmoothingEnabled = false;
    this.context.save();
    this.context.translate(-this.camera.x, 0);

    // render ground
    this.ground.render(this.context);

    // Render game objects
    this.player.render(this.context);

    this.context.restore();
  }
}

export default Game;
