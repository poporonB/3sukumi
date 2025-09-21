import { gameState } from './state.js';
import { updatePieces } from './ui.js';

/**
 * 駒がクリックされたときの処理
 * - 未選択なら選択
 * - 同色の別の駒を選択し直し
 * - 異なる色なら駒を上書き移動
 */
//selectedPiece=既に選んでいるコマ
//clickedPiece=この瞬間に選んだコマ
export function handlePieceClick(event, clickedPiece) {
  event.stopPropagation();  // イベントのバブリングを防ぐ

  const selectedId = gameState.selectedPieceId;

  //選択中のコマが無ければ
  if (selectedId === null) {
    selectPiece(clickedPiece.id);
    return;
  }

  const selectedPiece = gameState.pieces.find(p => p.id === selectedId);

  //選択したコマと同じコマをクリックで選択解除
  if (selectedPiece.id === clickedPiece.id){
    deselectPiece();
    return;
  }

  //選択したコマの色と
  if (selectedPiece.color === clickedPiece.color) {
    selectPiece(clickedPiece.id);  // 同色なら選択し直す
  } else {
    // 異なる色なら移動処理（上書き）
    movePieceTo(selectedPiece, clickedPiece.pos)
  }
}


// マスがクリックされたときの判断
export function handleCellClick(index) {
    const id = gameState.selectedPieceId;
    if (id === null) return;
    const piece = gameState.pieces.find(p => p.id === id);
    if (piece) movePieceTo(piece, index);
}

//コマのライフとマスの管理
function movePieceTo(piece, index) {
  // 移動不可なら何もしない
  if (piece.movesLife <= 0) {
    deselectPiece();
    return;
  }
  piece.pos = index;
  piece.movesLife -= 1;
  deselectPiece();
}

/**
 * 駒を選択状態にする
 */
export function selectPiece(id) {
  const selected = gameState.pieces.find(p => p.id === id);
  if (!selected /*|| selected.movesLife <= 0*/) return;  // 駒が存在しないか残り歩数が0以下なら何もしない

  gameState.pieces.forEach(p => p.selected = false);
  selected.selected = true;
  gameState.selectedPieceId = id;
  updatePieces();  // 表示更新
}

/**
 * 駒の選択状態を解除
 */
export function deselectPiece() {
  gameState.pieces.forEach(p => p.selected = false);
  gameState.selectedPieceId = null;
  updatePieces();  // 表示更新
}