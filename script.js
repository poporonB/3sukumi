const board = document.getElementById("board");

const radius = 60;
const xOffset = radius * 1.1;
const yOffset = radius;

const rowPattern = [5, 6, 7, 8, 9, 8, 7, 6, 5];

const cells = [];

rowPattern.forEach((count, rowIndex) => {
  for (let i = 0; i < count; i++) {
    const circle = document.createElement("div");
    circle.className = "circle";

    const offsetX = (i - (count - 1) / 2) * xOffset;
    const offsetY = (rowIndex - (rowPattern.length - 1) / 2) * yOffset;

    circle.style.left = `calc(50% + ${offsetX}px)`;
    circle.style.top = `calc(50% + ${offsetY}px)`;

    board.appendChild(circle);

    cells.push({ left: `calc(50% + ${offsetX}px)`, top: `calc(50% + ${offsetY}px)`, element: circle });
  }
});

const piece = document.createElement("div");
piece.className = "piece";
board.appendChild(piece);

let currentPos = Math.floor(cells.length / 2);

function updatePiecePosition() {
  piece.style.left = cells[currentPos].left;
  piece.style.top = cells[currentPos].top;
}

// 初期位置に配置
updatePiecePosition();

// 選択状態を管理するフラグ
let pieceSelected = false;

// コマをクリックしたときの処理（選択・解除）
piece.addEventListener("click", (e) => {
  e.stopPropagation(); // 親のクリックイベントを防ぐ
  pieceSelected = !pieceSelected;
  if (pieceSelected) {
    piece.style.border = "3px solid yellow";  // 選択中は枠を付けるなど
  } else {
    piece.style.border = "none";
  }
});

// マスをクリックしたときの処理
cells.forEach((cell, index) => {
  cell.element.addEventListener("click", () => {
    if (pieceSelected) {
      currentPos = index;
      updatePiecePosition();

      // 選択状態解除
      pieceSelected = false;
      piece.style.border = "none";
    }
  });
});
