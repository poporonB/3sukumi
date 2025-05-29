// ボードと駒を初期化
createBoard();
createPiece();

gameState.piecePos = Math.floor(gameState.cells.length / 2);
updatePiecePosition();

piece.addEventListener("click", (e) => {
  e.stopPropagation();
  gameState.pieceSelected = !gameState.pieceSelected;
  highlightPiece(gameState.pieceSelected);
});

gameState.cells.forEach((cell, index) => {
  cell.element.addEventListener("click", () => {
    if (gameState.pieceSelected) {
      gameState.piecePos = index;
      updatePiecePosition();
      gameState.pieceSelected = false;
      highlightPiece(false);
    }
  });
});
