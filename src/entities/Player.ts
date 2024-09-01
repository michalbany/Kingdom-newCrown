import Entity from "./Entity";
import InputHandler from "../core/Input";
import SpriteSheet from "../utils/SpriteSheet";
import AssetManager from "../utils/AssetManager";

export default class Player extends Entity {
  private input: InputHandler;

  private spriteSheet: SpriteSheet;
  private currentFrame: number = 0;
  private frameNames: string[] = [];
  private animationSpeed: number = 0.15;
  private animationTimer: number = 0;

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
    this.init();

    this.spriteSheet = AssetManager.getSpriteSheet("playerIdle");
    this.frameNames = Object.keys(this.spriteSheet.data.frames);
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

    this.animationTimer += deltaTime;
    if (this.animationTimer >= this.animationSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.frameNames.length;
      this.animationTimer = 0;
    }
  }

  render(context: CanvasRenderingContext2D) {
    super.render(context);

    const frameName = this.frameNames[this.currentFrame];

    if (this.isMoving) {
        this.spriteSheet = AssetManager.getSpriteSheet("playerRun");
        this.frameNames = Object.keys(this.spriteSheet.data.frames);
        
    } else {
        this.spriteSheet = AssetManager.getSpriteSheet("playerIdle");
        this.frameNames = Object.keys(this.spriteSheet.data.frames);
    }



    // flip sprite
    if (this.direction === -1) {
      context.scale(-1, 1);
      if (this.isMoving) {
          this.spriteSheet.drawFrame(context, frameName, -this.x - 40 , this.y + 8);
      } else {
        this.spriteSheet.drawFrame(context, frameName, -this.x - 32, this.y + 1);
      }
    } else {
        if (this.isMoving) {
            this.spriteSheet.drawFrame(context, frameName, this.x - 20, this.y + 8);
        } else {
            this.spriteSheet.drawFrame(context, frameName, this.x - 10, this.y + 1);
        }
    }

    // context.fillStyle = "white";
    // context.font = "15px Arial";
    // context.fillText(`Energy: ${this.currentEnergy}`, 10, 20);
    // context.fillText(`Health: ${this.currentHealth}`, 10, 40);
    // context.fillText(`Speed: ${this.currentSpeed}`, 10, 60);
    // context.fillText(`Sprinting: ${this.isSprinting}`, 10, 80);
    // context.fillText(`Moving: ${this.isMoving}`, 10, 100);
    // context.fillText(`Can Sprint: ${this.ableToSprint}`, 10, 120);
    // context.fillText(`ID: ${this.id}`, 10, 140);
    // context.fillText(`Name: ${this.name}`, 10, 160);
  }
}
