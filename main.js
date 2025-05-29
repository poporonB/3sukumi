createBoard();
createPieces();
updatePieces();
bindCellEvents();

// 盤面クリック処理
function bindCellEvents() {
  gameState.cells.forEach((cell, index) => {
    cell.element.addEventListener("click", () => {
      handleCellClick(index);
    });
  });
}

// 駒の移動処理
function handleCellClick(index) {
  const id = gameState.selectedPieceId;
  if (id === null) return;

  const piece = gameState.pieces.find(p => p.id === id);
  piece.pos = index;
  piece.movedAt = Date.now();
  deselectPiece();
  updatePieces();
}
