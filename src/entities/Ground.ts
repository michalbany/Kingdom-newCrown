export default class Ground {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = "brown";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}