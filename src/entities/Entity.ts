import TimeManager from "../core/TimeManager";
import { wordState } from "../core/State";

export default class Entity {
  // position
  protected readonly id: string;
  public name: string = "unnamed";
  protected x: number;
  protected y: number;

  // movement
  protected baseSpeed: number = 0;
  protected currentSpeed: number = this.baseSpeed;
  protected direction: number = 0;
  protected canSprint: boolean = true;
  protected infiniteSprint: boolean = false;
  protected isMoving: boolean = false;
  protected isSprinting: boolean = false;

  // appearance
  protected color: string = "black";
  protected height: number = 30;
  protected width: number = 30;

  // stats
  protected demage: number = 0;
  public baseEnergy: number = 0;
  public currentEnergy: number = this.baseEnergy;
  public baseHealth: number = 0;
  public currentHealth: number = this.baseHealth;
  protected energyRegen: number = 0;
  protected healthRegen: number = 0;
  protected isEnergyRecovering: boolean = false;
  protected energyRecoveryDelay: number = 2;

  constructor(x: number, y: number) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.x = x;
    this.y = y;
    this.init();
  }

  protected init() {
    this.currentEnergy = this.baseEnergy;
    this.currentHealth = this.baseHealth;
    this.currentSpeed = this.baseSpeed;

    // timers
    TimeManager.setTimer(`energy_${this.id}`, 1, this.updateEnergy.bind(this));
    TimeManager.setTimer(
      `energy_recover_${this.id}`,
      this.energyRecoveryDelay,
      () => {
        this.isEnergyRecovering = false;
      }
    );
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
    this.isSprinting = true;
    if (this.ableToSprint) {
      this.currentSpeed = this.baseSpeed * 2;
    }
  }

  get ableToSprint(): boolean {
    return this.canSprint && this.currentEnergy > 0;
  }

  protected move(deltaTime: number) {
    if (this.isMoving) {
      this.x += this.currentSpeed * this.direction * deltaTime;
    }
  }

  protected updateEnergy() {
    if (this.isSprinting && !this.infiniteSprint) {
      this.decreaseEnergy(10);
    } else if (!this.isEnergyRecovering) {
      this.increaseEnergy(this.energyRegen);
    }
  }

  protected increaseEnergy(amount: number) {
    if (this.currentEnergy < this.baseEnergy) {
      this.currentEnergy += amount;
    }

    if (this.currentEnergy > this.baseEnergy) {
      this.currentEnergy = this.baseEnergy;
    }
  }

  protected decreaseEnergy(amount: number) {
    if (this.currentEnergy >= 0) {
      this.currentEnergy -= amount;
    }

    if (this.currentEnergy <= 0) {
      this.currentEnergy = 0;
      this.isEnergyRecovering = true;
      TimeManager.resetTimer(`energy_recover_${this.id}`);
    }
  }

  protected checkBoundaries() {
    this.x = Math.max(
        wordState.boundaries.left,
      Math.min(this.x, wordState.boundaries.right - this.width)
    );
  }

  public update(deltaTime: number) {
    this.move(deltaTime);
    this.checkBoundaries();
  }

  render(context: CanvasRenderingContext2D) {
    context.strokeStyle = this.color;
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  public destroy(): void {
    TimeManager.removeTimer(`energy_${this.id}`);
    //
  }
}
