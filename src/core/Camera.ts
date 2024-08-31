export default class Camera {
    x: number;
    width: number;

    constructor(width: number) {
        this.x = 0;
        this.width = width;
    }

    centerOn(entity: any) {
        this.x = entity.x - this.width / 2;
    }
}