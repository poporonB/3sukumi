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

  // 残り移動回数が0なら何もしない
  if (piece.movesLife <= 0) {
    deselectPiece();
    return;
  }
  piece.pos = index;
  piece.movesLife -= 1;
  //piece.movedAt = Date.now();
  deselectPiece();
  updatePieces();
}
