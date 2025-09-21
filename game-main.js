import { gameState } from './state.js';
import { initializeGame, destroyGame } from './ui.js';

export function startGame() {
  const mode = gameState.gameMode;

  initializeGame();

  if(mode === "PVP"){
  }
  else if(mode === "PVC"){
  }
}

export function endGame() {
  destroyGame();
}
