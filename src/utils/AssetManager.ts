import SpriteSheet from './SpriteSheet';

// assets
import playerRunPNG from '../assets/playerRun.png';
import playerRunJSON from '../assets/playerRun.json';
import playerIdlePNG from '../assets/playerStanding.png';
import playerIdleJSON from '../assets/playerStanding.json';

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

export function initializeAssets() {
    return Promise.all([
        AssetManager.loadSpriteSheet("playerRun", playerRunPNG,  playerRunJSON),
        AssetManager.loadSpriteSheet("playerIdle", playerIdlePNG, playerIdleJSON),
    ])
}

