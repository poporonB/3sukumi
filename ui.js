// ボード要素を取得
const board = document.getElementById("board");

// ボード上の円の半径と座標オフセット
const radius = 60;
const xOffset = radius * 1.1;
const yOffset = radius;

// 駒の要素を管理するためのMap（id -> DOM要素）
const pieceElements = new Map();

/**
 * ボードのマス（円）を作成する関数
 * rowPatternに従って中心に対して左右対称な形で円を配置
 */
function createBoard() {
  const rowPattern = [5, 6, 7, 8, 9, 8, 7, 6, 5];  // 各行の円の数
  let cellIndex = 0;

  rowPattern.forEach((count, rowIndex) => {
    for (let i = 0; i < count; i++) {
      const circle = document.createElement("div");
      circle.className = "circle";

      // 左右中央揃えで配置するためのX座標
      const offsetX = (i - (count - 1) / 2) * xOffset;

      // 上下中央揃えで配置するためのY座標
      const offsetY = (rowIndex - (rowPattern.length - 1) / 2) * yOffset;

      circle.style.left = `calc(50% + ${offsetX}px)`;
      circle.style.top = `calc(50% + ${offsetY}px)`;

      // セル番号を表示（デバッグ用）
      circle.textContent = cellIndex;

      board.appendChild(circle);

      // セル情報をgameStateに保存（後の駒配置で使用）
      gameState.cells.push({
        left: circle.style.left,
        top: circle.style.top,
        element: circle
      });

      cellIndex++;
    }
  });
}

/**
 * 駒のDOM要素を作成し、イベントリスナーを設定
 */
function createPieces() {
  gameState.pieces.forEach(piece => {
    const el = document.createElement("div");
    el.className = "piece";
    el.style.backgroundColor = piece.color;

    board.appendChild(el);
    pieceElements.set(piece.id, el);

    // 駒がクリックされたときの処理を登録
    el.addEventListener("click", (e) => handlePieceClick(e, piece));
  });
}

/**
 * 駒がクリックされたときの処理
 * - 未選択なら選択
 * - 同色の別の駒を選択し直し
 * - 異なる色なら駒を上書き移動
 */
//selectedPiece=既に選んでいるコマ
//clickedPiece=この瞬間に選んだコマ
function handlePieceClick(event, clickedPiece) {
  event.stopPropagation();  // イベントのバブリングを防ぐ

  const selectedId = gameState.selectedPieceId;

  if (selectedId === null) {
    selectPiece(clickedPiece.id);
    return;
  }

  const selectedPiece = gameState.pieces.find(p => p.id === selectedId);

  if (selectedPiece.id === clickedPiece.id){
    deselectPiece();
    return;
  }

  if (selectedPiece.color === clickedPiece.color) {
    selectPiece(clickedPiece.id);  // 同色なら選択し直す
  } else {
    // 異なる色なら移動処理（上書き）
    selectedPiece.pos = clickedPiece.pos;
    selectedPiece.movesLife -= 1;
    //selectedPiece.movedAt = Date.now();  // 移動時刻を記録（後で重なり順で使用）
    deselectPiece();  // 選択解除
    updatePieces();   // 表示更新
  }
}

/**
 * 駒の状態を基に見た目を更新
 * - 各マスに駒を配置
 * - 最も新しく動いた駒のみ表示
 */
function updatePieces() {
  const visiblePieces = gameState.pieces.filter(p => !p.hidden);
  const piecesByPos = new Map();

  const strength = {
    red: "green",
    green: "blue",
    blue: "red"
  };

  // 同じマスにいる駒をまとめる
  visiblePieces.forEach(piece => {
    if (!piecesByPos.has(piece.pos)) piecesByPos.set(piece.pos, []);
    piecesByPos.get(piece.pos).push(piece);
  });

  // 各マスごとに1つの駒のみ表示（最新の動作順）
  piecesByPos.forEach(piecesAtPos => {
    //以下は時間で表示するコマを決める。
    /*const topPiece = piecesAtPos.reduce((latest, curr) =>
      (latest.movedAt || 0) > (curr.movedAt || 0) ? latest : curr
    );*/
    // 色の強さ比較で最上位の駒を決める
    const topPiece = piecesAtPos.reduce((strongest, curr) => {
      if (strength[curr.colorName] === strongest.colorName) {
        return curr;
      }
      return strongest;
    });

    piecesAtPos.forEach(piece => {
      const el = pieceElements.get(piece.id);
      const cell = gameState.cells[piece.pos];

      el.style.left = cell.left;
      el.style.top = cell.top;
      el.style.display = piece.id === topPiece.id ? "block" : "none";  // 最上位だけ表示
      el.style.zIndex = piece.id === topPiece.id ? 10 : 1;
      el.style.border = piece.selected ? "3px solid yellow" : "none";
      el.style.backgroundColor = piece.color;
      el.textContent = piece.movesLife; // 残り回数を駒の上に表示

      piece.hidden = piece.id !== topPiece.id;  // 他は非表示としてマーク
    });
  });
}

/**
 * 駒を選択状態にする
 */
function selectPiece(id) {
  const selected = gameState.pieces.find(p => p.id === id);
  if (!selected || selected.movesLife <= 0) return;  // 駒が存在しないか残り歩数が0以下なら何もしない

  gameState.pieces.forEach(p => p.selected = false);
  selected.selected = true;
  gameState.selectedPieceId = id;
  updatePieces();  // 表示更新
}


/**
 * 駒の選択状態を解除
 */
function deselectPiece() {
  gameState.pieces.forEach(p => p.selected = false);
  gameState.selectedPieceId = null;
  updatePieces();  // 表示更新
}
