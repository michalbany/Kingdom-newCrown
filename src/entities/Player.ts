import Entity from "./Entity";
import InputHandler from "../core/Input";

export default class Player extends Entity {
  private input: InputHandler;

  constructor(x: number, y: number, input: InputHandler) {
    super(x, y);
    this.input = input;
    this.baseSpeed = 100;
    this.color = "red";
    this.height = 50;
    this.energyRegen = 50;
    this.energy = 100;
    this.health = 100;
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

    context.fillStyle = "white";
    context.font = "15px Arial";
    context.fillText(`Energy: ${this.energy}`, 10, 20);
    context.fillText(`Health: ${this.health}`, 10, 40);
    context.fillText(`Speed: ${this.currentSpeed}`, 10, 60);
    context.fillText(`Sprinting: ${this.isSprinting}`, 10, 80);
    context.fillText(`Moving: ${this.isMoving}`, 10, 100);
    context.fillText(`Can Sprint: ${this.ableToSprint}`, 10, 120);
    context.fillText(`ID: ${this.id}`, 10, 140);
  }
}
