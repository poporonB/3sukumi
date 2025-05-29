createBoard();
createPieces();
updatePieces();

gameState.cells.forEach((cell, index) => {
  cell.element.addEventListener("click", () => {
    const id = gameState.selectedPieceId;
    if (id !== null) {
      const piece = gameState.pieces.find(p => p.id === id);
      piece.pos = index;
      deselectPiece();
      updatePieces();
    }
  });
});
