import Player from "../entities/Player";
import InputHandler from "./Input";

class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private lastRenderTime: number = 0;
    private player: Player;
    private input: InputHandler;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;

        // init entities
        this.input = new InputHandler();
        this.player = new Player(50, 50, this.input);
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

        // Request the next frame
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    private update(deltaTime: number) {
        this.player.update(deltaTime);
    }

    private render() {
        // Render game objects
        this.player.render(this.context);
    }
}

export default Game;