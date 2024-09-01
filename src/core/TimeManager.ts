type TimerCallback = () => void;

class TimeManager {
  private static instance: TimeManager;
  private elapsedTime: number = 0;
  private timers: Map<string, { interval: number, lastUpdate: number, callback: TimerCallback, oneTime: boolean }> = new Map();

  private constructor() {}

  public static getInstance(): TimeManager {
    if (!TimeManager.instance) {
      TimeManager.instance = new TimeManager();
    }
    return TimeManager.instance;
  }

  public update(deltaTime: number): void {
    this.elapsedTime += deltaTime;
    this.updateTimers();
  }

  public getElapsedTime(): number {
    return this.elapsedTime;
  }

  public isTimerRunning(id: string): boolean {
    return this.timers.has(id);
  }

  public setTimer(id: string, interval: number, callback: TimerCallback, oneTime: boolean = false): void {
    this.timers.set(id, { interval, lastUpdate: this.elapsedTime, callback, oneTime });
  }

  public resetTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      timer.lastUpdate = this.elapsedTime;
    }
  }

  public removeTimer(id: string): void {
    this.timers.delete(id);
  }

  private updateTimers(): void {
    this.timers.forEach((timer, id) => {
      if (this.elapsedTime - timer.lastUpdate >= timer.interval) {
        timer.callback();
        if (timer.oneTime) {
          this.timers.delete(id);
        } else {
          timer.lastUpdate = this.elapsedTime;
        }
      }
    });
  }
}

export default TimeManager.getInstance();