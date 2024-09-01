import SpriteSheet from './SpriteSheet';

export default class AssetManager {
    private static spriteSheets: { [key: string]: SpriteSheet } = {};

    static async loadSpriteSheet(key: string, imageSrc: string, jsonData: any): Promise<void> {
        try {
          const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = imageSrc;
          });
    
          const image = await imagePromise;
          this.spriteSheets[key] = new SpriteSheet(image, jsonData);
        } catch (error) {
          console.error(`Failed to load sprite sheet ${key}:`, error);
        }
      }

    static getSpriteSheet(key: string): SpriteSheet {
        return this.spriteSheets[key];
    }
}