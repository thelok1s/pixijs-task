export interface AppConfig {
  width: number;
  height: number;
  backgroundColor: number;
  actor: {
    width: number;
    height: number;
    frameDurationMs: number;
    moveSpeed: number;
    frames: string[];
  };
}

export const APP_CONFIG: AppConfig = {
  width: 1000,
  height: 600,
  backgroundColor: 0xa0c1ca,
  actor: {
    width: 272 / 2,
    height: 168 / 2,
    frameDurationMs: 90,
    moveSpeed: 800,
    frames: [
      "/assets/nyan1.svg",
      "/assets/nyan2.svg",
      "/assets/nyan3.svg",
      "/assets/nyan4.svg",
      "/assets/nyan5.svg",
      "/assets/nyan6.svg",
    ],
  },
};
