const gameState = {
  cells: [], // マス情報（UI側で埋められる）
  pieces: [
    { id: 0,  pos: 0,  selected: false, color: "rgb(255, 149, 149)", movedAt: Date.now(),    hidden: false },
    { id: 1,  pos: 5,  selected: false, color: "rgb(255, 149, 149)", movedAt: Date.now()+1,  hidden: false },
    { id: 2,  pos: 11, selected: false, color: "rgb(255, 149, 149)", movedAt: Date.now()+2,  hidden: false },
    { id: 3,  pos: 18, selected: false, color: "rgb(255, 149, 149)", movedAt: Date.now()+3,  hidden: false },
    { id: 4,  pos: 26, selected: false, color: "rgb(255, 149, 149)", movedAt: Date.now()+4,  hidden: false },
    { id: 5,  pos: 4,  selected: false, color: "rgb(98, 156, 255)",  movedAt: Date.now()+5,  hidden: false },
    { id: 6,  pos: 10, selected: false, color: "rgb(98, 156, 255)",  movedAt: Date.now()+6,  hidden: false },
    { id: 7,  pos: 17, selected: false, color: "rgb(98, 156, 255)",  movedAt: Date.now()+7,  hidden: false },
    { id: 8,  pos: 25, selected: false, color: "rgb(98, 156, 255)",  movedAt: Date.now()+8,  hidden: false },
    { id: 9,  pos: 34, selected: false, color: "rgb(98, 156, 255)",  movedAt: Date.now()+9,  hidden: false },
    { id: 10, pos: 56, selected: false, color: "rgb(106, 255, 146)", movedAt: Date.now()+10, hidden: false },
    { id: 11, pos: 57, selected: false, color: "rgb(106, 255, 146)", movedAt: Date.now()+11, hidden: false },
    { id: 12, pos: 58, selected: false, color: "rgb(106, 255, 146)", movedAt: Date.now()+12, hidden: false },
    { id: 13, pos: 59, selected: false, color: "rgb(106, 255, 146)", movedAt: Date.now()+13, hidden: false },
    { id: 14, pos: 60, selected: false, color: "rgb(106, 255, 146)", movedAt: Date.now()+14, hidden: false },
  ],
  selectedPieceId: null
};
