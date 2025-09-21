import { gameState } from './state.js';
import { handlePieceClick, handleCellClick } from './game-logic.js';

// ボード要素を取得
const board = document.getElementById("board");

// ボード上の円の半径と座標オフセット
const styles = getComputedStyle(document.documentElement);
const radius = parseFloat(styles.getPropertyValue('--circle-size')); //cssのrootのマスの大きさ取得
const xOffset = radius * 1.1;
const yOffset = radius * 1;

// 駒の要素を管理するためのMap（id -> DOM要素）
const pieceElements = new Map();

//ゲームの開始
export function initializeGame() {
    createBoard();
    createPieces();
    updatePieces();
    initializeBoardEvents();
}

// ゲームの片付け
// コマの配置とかについては触れていないため、リセットしたいなら初期配置に戻すべし
export function destroyGame() {
    destroyBoardEvents();
    const board = document.getElementById("board");
    board.innerHTML = '';
    pieceElements.clear();
}

//handleBoardClickを呼び出すための関数
export function initializeBoardEvents() {
    document.getElementById('board').addEventListener('click', handleBoardClick);
}

//handleBoardClickを消すための関数
export function destroyBoardEvents() {
    document.getElementById('board').removeEventListener('click', handleBoardClick);
}

/**
 * ボードのマス（円）を作成する関数
 * rowPatternに従って中心に対して左右対称な形で円を配置
 */
export function createBoard() {
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

      circle.style.left = `calc(50% + ${offsetX}%)`;
      circle.style.top = `calc(50% + ${offsetY}%)`;

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
export function createPieces() {
  gameState.pieces.forEach(piece => {
    const el = document.createElement("div");
    el.className = "piece";
    el.style.backgroundColor = piece.color;

    board.appendChild(el);
    pieceElements.set(piece.id, el);
  });
}

/**
 * 駒の状態を基に見た目を更新
 * - 各マスに駒を配置
 * - 最も新しく動いた駒のみ表示
 */
export function updatePieces() {
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

    // 非表示の駒の movesLife を加算してリセット
    piecesAtPos.forEach(piece => {
      if (piece.id !== topPiece.id) {
        topPiece.movesLife += piece.movesLife;
        piece.movesLife = 0;
      }
    });

    piecesAtPos.forEach(piece => {
      const el = pieceElements.get(piece.id);
      const cell = gameState.cells[piece.pos];

      el.style.left = cell.left;
      el.style.top = cell.top;
      el.style.display = piece.id === topPiece.id ? "flex" : "none";  // 最上位だけ表示
      el.style.zIndex = piece.id === topPiece.id ? 10 : 1;
      el.style.border = piece.selected ? "3px solid yellow" : "none";
      el.style.backgroundColor = piece.color;
      el.textContent = piece.movesLife; // 残り回数を駒の上に表示

      piece.hidden = piece.id !== topPiece.id;  // 他は非表示としてマーク
    });
  });
}

// 全てのクリック処理
function handleBoardClick(event) {
    const clickedElement = event.target; // 実際にクリックされた要素を取得

    if (clickedElement.classList.contains('circle')) {
        // もしクリックされたのが「マス」なら
        const index = parseInt(clickedElement.textContent);
        handleCellClick(index); // 以前のマス担当を呼び出す
    }
    else if (clickedElement.classList.contains('piece')) {
        // もしクリックされたのが「駒」なら
        const piece = findPieceByElement(clickedElement);
        if (piece) handlePieceClick(event, piece); // 以前の駒担当を呼び出す
    }
}

// DOM要素からgameState内のpieceオブジェクトを見つけるヘルパー関数
function findPieceByElement(element) {
    for (let [id, el] of pieceElements.entries()) {
        if (el === element) {
            return gameState.pieces.find(p => p.id === id);
        }
    }
    return null;
}