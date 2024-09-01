import SpriteSheet from "./SpriteSheet";

class Animate {
  private currentFrame: number = 0;
  private frameNames: string[] = [];
  private animationSpeed: number = 0.15;
  private animationTimer: number = 0;

  constructor(private spriteSheet: SpriteSheet | undefined) {
    this.updateFrameNames();
  }

  update(deltaTime: number) {
    this.animationTimer += deltaTime;
    if (this.animationTimer >= this.animationSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.frameNames.length;
      this.animationTimer = 0;
    }
  }

  updateSpriteSheet(newSpriteSheet: SpriteSheet) {
    this.spriteSheet = newSpriteSheet;
    this.updateFrameNames();
    this.currentFrame = 0;
    this.animationTimer = 0;
  }

  private updateFrameNames() {
    if (this.spriteSheet) {
      this.frameNames = Object.keys(this.spriteSheet.data.frames);
    } else {
      this.frameNames = [];
    }
  }

  get currentFrameName() {
    return this.frameNames[this.currentFrame];
  }
}

export { Animate };
