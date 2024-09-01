import Entity from "./Entity";
import InputHandler from "../core/Input";
import AssetManager from "../utils/AssetManager";

export default class Player extends Entity {
  private input: InputHandler;


  constructor(x: number, y: number, input: InputHandler) {
    super(x, y);
    this.input = input;
    this.name = "Monarch";
    this.baseSpeed = 200;
    this.color = "red";
    this.height = 50;
    this.width = 20;
    this.energyRegen = 20;
    this.baseEnergy = 100;
    this.baseHealth = 100;
    this.sheets = {
        "default": AssetManager.getSpriteSheet("playerIdle"),
        "idle": AssetManager.getSpriteSheet("playerIdle"),
        "run": AssetManager.getSpriteSheet("playerRun"),
        "walk": AssetManager.getSpriteSheet("playerRun"),
    }
    this.init();
  }

  update(deltaTime: number) {
    if (this.input.isKeyPressed("ArrowLeft")) {
      this.walk(-1);
      if (this.input.isKeyPressed("Shift")) {
        this.sprint();
      }
    }

    if (this.input.isKeyPressed("ArrowRight")) {
      this.walk(1);
      if (this.input.isKeyPressed("Shift")) {
        this.sprint();
      }
    }

    if (
      !this.input.isKeyPressed("ArrowRight") &&
      !this.input.isKeyPressed("ArrowLeft")
    ) {
      this.stop();
    }

    super.update(deltaTime);
  }

  render(context: CanvasRenderingContext2D) {
    super.render(context);

    if (this.isMoving) {
        this.changeSheet("run");
    } else {
        this.changeSheet("default");
    }
  }
}
