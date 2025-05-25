const board = document.getElementById("board");

const radius = 60;
const xOffset = radius * 1.1;
const yOffset = radius;

const rowPattern = [5, 6, 7, 8, 9, 8, 7, 6, 5];

rowPattern.forEach((count, rowIndex) => {
  for (let i = 0; i < count; i++) {
    const circle = document.createElement("div");
    circle.className = "circle";

    const offsetX = (i - (count - 1) / 2) * xOffset;
    const offsetY = (rowIndex - (rowPattern.length - 1) / 2) * yOffset;

    circle.style.left = `calc(50% + ${offsetX}px)`;
    circle.style.top = `calc(50% + ${offsetY}px)`;

    board.appendChild(circle);
  }
});

// すべての.circleにタッチまたはクリックイベントを追加
function addTouchSupport() {
  const circles = document.querySelectorAll(".circle");

  circles.forEach(circle => {
    // もとの色
    const originalColor = "#66ccff";
    const touchedColor = "#3399ff";

    // タッチ・クリック時に色を変える
    function handleTouch() {
      circle.style.backgroundColor = touchedColor;
      setTimeout(() => {
        circle.style.backgroundColor = originalColor;
      }, 300); // 0.3秒後に元に戻す（任意）
    }

    circle.addEventListener("touchstart", handleTouch);
    circle.addEventListener("click", handleTouch); // PCでも反応
  });
}

// 六角形を作ったあとにタッチ対応を追加
addTouchSupport();
