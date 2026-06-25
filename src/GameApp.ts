import { Application, Assets, Texture } from "pixi.js";
import { APP_CONFIG } from "./appConfig";
import { AnimatedActor } from "./AnimatedActor";

export class GameApp {
  private readonly pixi: Application;
  private readonly actor: AnimatedActor;

  private constructor(
    app: Application,
    root: HTMLElement,
    textures: Texture[],
  ) {
    this.pixi = app;

    const canvas = this.pixi.canvas as HTMLCanvasElement;
    root.appendChild(canvas);

    this.actor = new AnimatedActor(this.pixi, APP_CONFIG, textures);

    this.bindInput(canvas);
    this.pixi.ticker.add(() => {
      this.actor.update(this.pixi.ticker.elapsedMS);
    });
  }

  public static async bootstrap(rootId: string): Promise<GameApp> {
    const root = document.getElementById(rootId);
    if (!root) {
      throw new Error("Root element not found: " + rootId);
    }

    const app = new Application();
    await app.init({
      width: APP_CONFIG.width,
      height: APP_CONFIG.height,
      backgroundColor: APP_CONFIG.backgroundColor,
      antialias: false,
    });

    const textures = await Promise.all(
      APP_CONFIG.actor.frames.map((src) => Assets.load<Texture>(src)),
    );

    return new GameApp(app, root, textures);
  }

  private bindInput(canvas: HTMLCanvasElement): void {
    const handle = (clientX: number, clientY: number): void => {
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * APP_CONFIG.width;
      const y = ((clientY - rect.top) / rect.height) * APP_CONFIG.height;
      this.actor.moveTo(x, y);
    };

    canvas.addEventListener("pointerdown", (event) => {
      handle(event.clientX, event.clientY);
    });

    canvas.addEventListener("touchstart", (event) => {
      const touch = event.changedTouches[0];
      if (touch) {
        handle(touch.clientX, touch.clientY);
      }
    });
  }
}
