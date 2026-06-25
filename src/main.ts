import "./global.css";
import { GameApp } from "./GameApp";

GameApp.bootstrap("app-root").catch((error) => {
  console.error(error);
});
