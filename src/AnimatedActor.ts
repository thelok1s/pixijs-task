import { AnimatedSprite, Application, Texture } from "pixi.js";
import { AppConfig } from "./appConfig";

export class AnimatedActor {
  private readonly sprite: AnimatedSprite;
  private readonly config: AppConfig;
  private targetX: number;
  private targetY: number;
  private readonly halfW: number;
  private readonly halfH: number;
  private readonly baseScaleX: number;
  private readonly baseScaleY: number;

  constructor(app: Application, config: AppConfig, textures: Texture[]) {
    this.config = config;

    this.sprite = new AnimatedSprite(textures);
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 1000 / config.actor.frameDurationMs / 60;
    this.sprite.loop = true;

    const texW = textures[0]?.width || 34;
    const texH = textures[0]?.height || 21;
    const scale = Math.min(
      config.actor.width / texW,
      config.actor.height / texH,
    );

    this.baseScaleX = scale;
    this.baseScaleY = scale;
    this.sprite.scale.set(this.baseScaleX, this.baseScaleY);

    this.halfW = (texW * scale) / 2;
    this.halfH = (texH * scale) / 2;

    this.sprite.x = config.width / 2;
    this.sprite.y = config.height / 2;
    this.targetX = this.sprite.x;
    this.targetY = this.sprite.y;

    this.sprite.play();
    app.stage.addChild(this.sprite);
  }

  public moveTo(x: number, y: number): void {
    this.targetX = this.clampX(x);
    this.targetY = this.clampY(y);
  }

  public update(deltaMs: number): void {
    const dx = this.targetX - this.sprite.x;
    const dy = this.targetY - this.sprite.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 0.5) {
      this.sprite.x = this.targetX;
      this.sprite.y = this.targetY;
      return;
    }

    const step = (this.config.actor.moveSpeed * deltaMs) / 1000;
    const t = Math.min(1, step / distance);

    this.sprite.x += dx * t;
    this.sprite.y += dy * t;

    if (Math.abs(dx) > 0.1) {
      this.sprite.scale.x = dx < 0 ? -this.baseScaleX : this.baseScaleX;
      this.sprite.scale.y = this.baseScaleY;
    }
  }

  private clampX(x: number): number {
    return Math.max(this.halfW, Math.min(this.config.width - this.halfW, x));
  }

  private clampY(y: number): number {
    return Math.max(this.halfH, Math.min(this.config.height - this.halfH, y));
  }
}
