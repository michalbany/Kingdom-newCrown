export default class SpriteSheet {
    public image: HTMLImageElement;
    public data: any;

    constructor(image: HTMLImageElement, data: any) {
        this.image = image;
        this.data = data;
    }

    drawFrame(context: CanvasRenderingContext2D, frameName: string, x: number, y: number, scale: number = 1) {
        const frame = this.data.frames[frameName];
        if (frame) {
            context.drawImage(
                this.image,
                frame.frame.x,
                frame.frame.y,
                frame.frame.w,
                frame.frame.h,
                x,
                y,
                frame.frame.w * scale,
                frame.frame.h * scale
            );
        }
    }
}