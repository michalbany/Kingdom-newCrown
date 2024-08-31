type TimerCallback = () => void;

class TimeManager {
  private static instance: TimeManager;
  private elapsedTime: number = 0;
  private timers: Map<string, { interval: number, lastUpdate: number, callback: TimerCallback }> = new Map();

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

  public setTimer(id: string, interval: number, callback: TimerCallback): void {
    this.timers.set(id, { interval, lastUpdate: this.elapsedTime, callback });
  }

  public removeTimer(id: string): void {
    this.timers.delete(id);
  }

  private updateTimers(): void {
    this.timers.forEach((timer) => {
      if (this.elapsedTime - timer.lastUpdate >= timer.interval) {
        timer.callback();
        timer.lastUpdate = this.elapsedTime;
      }
    });
  }
}

export default TimeManager.getInstance();