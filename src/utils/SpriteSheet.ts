export default class SpriteSheet {
  public image: HTMLImageElement;
  public data: any;

  constructor(image: HTMLImageElement, data: any) {
    this.image = image;
    this.data = data;
  }

  drawFrame(context: CanvasRenderingContext2D, frameName: string, entity_x: number, entity_y: number, entity_width: number, entity_height: number, direction: number = 1, scale: number = 1) {
      const frame = this.data.frames[frameName];
      if (!frame) return;

      const frameWidth = frame.frame.w;
      const frameHeight = frame.frame.h;

      let x_position = entity_x - (frameWidth - entity_width) / 2;
      let y_position = entity_y - (frameHeight - entity_height);
      
      context.save();
      if (direction === -1) {
        context.scale(-1, 1);
        x_position = -x_position - frame.frame.w * scale;
      }

      if (frame) {
          context.drawImage(
              this.image,
              frame.frame.x,
              frame.frame.y,
              frame.frame.w,
              frame.frame.h,
              x_position,
              y_position,
              frame.frame.w * scale,
              frame.frame.h * scale
          );
      }

      context.restore();
  }
}
