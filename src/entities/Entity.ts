import TimeManager from "../core/TimeManager";

export default class Entity {
  // position
  protected x: number;
  protected y: number;
  protected id: string;

  // movement
  protected baseSpeed: number;
  protected currentSpeed: number;
  protected direction: number;
  protected canSprint: boolean;
  protected infiniteSprint: boolean;
  protected isMoving: boolean;
  protected isSprinting: boolean;

  // appearance
  protected color: string;
  protected height: number;
  protected width: number;

  // stats
  protected demage: number;
  protected health: number;
  protected energy: number;
  protected energyRegen: number;
  protected healthRegen: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.id = Math.random().toString(36).substr(2, 9);
    this.color = "black";
    this.height = 30;
    this.width = 30;

    this.baseSpeed = 0;
    this.currentSpeed = this.baseSpeed;
    this.direction = 0;
    this.canSprint = true;
    this.isMoving = false;
    this.isSprinting = false;
    this.infiniteSprint = false;

    this.demage = 0;
    this.health = 0;
    this.energy = 0;
    this.energyRegen = 0;
    this.healthRegen = 0;

    // timers
    TimeManager.setTimer(`energy_${this.id}`, 1, this.updateEnergy.bind(this));
  }

  public walk(direction: number) {
    this.direction = direction;
    this.currentSpeed = this.baseSpeed;
    this.isMoving = true;
    this.isSprinting = false;
  }

  public stop() {
    this.isMoving = false;
    this.isSprinting = false;
  }

  public sprint() {
    if (this.ableToSprint) {
      this.isSprinting = true;
      this.currentSpeed = this.baseSpeed * 4;
    } else {
      this.isSprinting = false;
    }
  }

  get ableToSprint(): boolean {
    return this.canSprint && this.energy > 0;
  }

  protected move(deltaTime: number) {
    if (this.isMoving) {
      this.x += this.currentSpeed * this.direction * deltaTime;
    }
  }

  protected updateEnergy() {
    if (this.isSprinting && !this.infiniteSprint) {
      this.decreaseEnergy(20);
    }
  }

  protected decreaseEnergy(amount: number) {
    if (this.energy >= 0) {
      this.energy -= amount;
    }
  }

  public update(deltaTime: number) {
    this.move(deltaTime);
  }

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  public destroy(): void {
    TimeManager.removeTimer(`energy_${this.id}`);
    //
  }
}
