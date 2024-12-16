import { writable } from "svelte/store";

export const score = writable(0);
export const user = writable("Vital");
export const globalTopEasy = writable([]);
export const globalTopMid = writable([]);

export const gameState = writable({
  currentView: "welcome", // 'playing', 'lost', 'won'
  currentMode: "Easy",
  status: "",
});

export const restartGame = writable(false);
export const deleteCollection = writable(false);
export const resetGame = writable(false);
export const addCollection = writable(false);
