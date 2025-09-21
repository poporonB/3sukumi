export const gameState = {
  cells: [], // マス情報（UI側で埋められる）
  pieces: [
    { id: 0,  pos: 0,  selected: false, color: "rgb(255, 149, 149)", movesLife: 7, Numverhidden: false, colorName: "red"   /*, movedAt: Date.now()*/   },
    { id: 1,  pos: 5,  selected: false, color: "rgb(255, 149, 149)", movesLife: 7, Numverhidden: false, colorName: "red"   /*, movedAt: Date.now()+1 */},
    { id: 2,  pos: 11, selected: false, color: "rgb(255, 149, 149)", movesLife: 7, Numverhidden: false, colorName: "red"   /*, movedAt: Date.now()+2 */},
    { id: 3,  pos: 18, selected: false, color: "rgb(255, 149, 149)", movesLife: 7, Numverhidden: false, colorName: "red"   /*, movedAt: Date.now()+3 */},
    { id: 4,  pos: 26, selected: false, color: "rgb(255, 149, 149)", movesLife: 7, Numverhidden: false, colorName: "red"   /*, movedAt: Date.now()+4 */},
    { id: 5,  pos: 4,  selected: false, color: "rgb(98, 156, 255)" , movesLife: 7, Numverhidden: false, colorName: "blue"  /*, movedAt: Date.now()+5 */},
    { id: 6,  pos: 10, selected: false, color: "rgb(98, 156, 255)" , movesLife: 7, Numverhidden: false, colorName: "blue"  /*, movedAt: Date.now()+6 */},
    { id: 7,  pos: 17, selected: false, color: "rgb(98, 156, 255)" , movesLife: 7, Numverhidden: false, colorName: "blue"  /*, movedAt: Date.now()+7 */},
    { id: 8,  pos: 25, selected: false, color: "rgb(98, 156, 255)" , movesLife: 7, Numverhidden: false, colorName: "blue"  /*, movedAt: Date.now()+8 */},
    { id: 9,  pos: 34, selected: false, color: "rgb(98, 156, 255)" , movesLife: 7, Numverhidden: false, colorName: "blue"  /*, movedAt: Date.now()+9 */},
    { id: 10, pos: 56, selected: false, color: "rgb(106, 255, 146)", movesLife: 7, Numverhidden: false, colorName: "green" /*, movedAt: Date.now()+10*/},
    { id: 11, pos: 57, selected: false, color: "rgb(106, 255, 146)", movesLife: 7, Numverhidden: false, colorName: "green" /*, movedAt: Date.now()+11*/},
    { id: 12, pos: 58, selected: false, color: "rgb(106, 255, 146)", movesLife: 7, Numverhidden: false, colorName: "green" /*, movedAt: Date.now()+12*/},
    { id: 13, pos: 59, selected: false, color: "rgb(106, 255, 146)", movesLife: 7, Numverhidden: false, colorName: "green" /*, movedAt: Date.now()+13*/},
    { id: 14, pos: 60, selected: false, color: "rgb(106, 255, 146)", movesLife: 7, Numverhidden: false, colorName: "green" /*, movedAt: Date.now()+14*/},
  ],
  selectedPieceId: null,
  gameMode: null
};

export function setGameMode(mode) {
    gameState.gameMode = mode;
}