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

const BASE_URL = import.meta.env.BASE_URL;

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
      `${BASE_URL}assets/nyan/nyan1.svg`,
      `${BASE_URL}assets/nyan/nyan2.svg`,
      `${BASE_URL}assets/nyan/nyan3.svg`,
      `${BASE_URL}assets/nyan/nyan4.svg`,
      `${BASE_URL}assets/nyan/nyan5.svg`,
      `${BASE_URL}assets/nyan/nyan6.svg`,
    ],
  },
};
