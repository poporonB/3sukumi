const board = document.getElementById("board");
const radius = 60;
const xOffset = radius * 1.1;
const yOffset = radius;
const pieceElements = new Map(); // id → DOM要素

function createBoard() {
  const rowPattern = [5, 6, 7, 8, 9, 8, 7, 6, 5];
  let cellIndex = 0; // マスの番号カウンター
  rowPattern.forEach((count, rowIndex) => {
    for (let i = 0; i < count; i++) {
      const circle = document.createElement("div");
      circle.className = "circle";

      const offsetX = (i - (count - 1) / 2) * xOffset;
      const offsetY = (rowIndex - (rowPattern.length - 1) / 2) * yOffset;

      circle.style.left = `calc(50% + ${offsetX}px)`;
      circle.style.top = `calc(50% + ${offsetY}px)`;

      // マス番号をテキストで表示
      circle.textContent = cellIndex;

      board.appendChild(circle);
      gameState.cells.push({ left: circle.style.left, top: circle.style.top, element: circle });

      cellIndex++; // 番号を次に進める
    }
  });
}

function createPieces() {
  gameState.pieces.forEach(piece => {
    const el = document.createElement("div");
    el.className = "piece";
    el.style.backgroundColor = piece.color; // ← ここで色を設定
    board.appendChild(el);
    pieceElements.set(piece.id, el);

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      selectPiece(piece.id);
    });
  });
}

function updatePieces() {
  gameState.pieces.forEach(piece => {
    const el = pieceElements.get(piece.id);
    const cell = gameState.cells[piece.pos];
    el.style.left = cell.left;
    el.style.top = cell.top;
    el.style.border = piece.selected ? "3px solid yellow" : "none";
  });
}

function selectPiece(id) {
  gameState.pieces.forEach(p => p.selected = false);
  const selected = gameState.pieces.find(p => p.id === id);
  selected.selected = true;
  gameState.selectedPieceId = id;
  updatePieces();
}

function deselectPiece() {
  gameState.pieces.forEach(p => p.selected = false);
  gameState.selectedPieceId = null;
  updatePieces();
}
