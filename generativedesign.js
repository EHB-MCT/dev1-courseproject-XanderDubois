const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseFrameCount = 0;
let currentColors = {
  lines: [],
};

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(0);
  const b = Math.floor(Math.random() * 128 + 128);
  return `rgb(${r},${g},${b})`;
}

// move mouse text
function drawMoveText() {
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Move your mouse!", 10, 10, 400);
}

// lines to a point
function drawLinesToPoint(xCenter, yCenter) {
  const topBottomLineCount = 25;
  const leftRightLineCount = 16;

  // background color black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // only change lines colors after 25 frames of moving your mouse
  if (mouseFrameCount >= 25) {
    currentColors.lines = [];
    for (let i = 0; i < topBottomLineCount + 1; i++) {
      currentColors.lines.push(getRandomColor());
    }
    mouseFrameCount = 0;
  }

  // lines top and bottom
  for (let i = 0; i < topBottomLineCount + 1; i++) {
    const x = (canvas.width / topBottomLineCount) * i;

    // top edge
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(xCenter, yCenter);
    ctx.strokeStyle = currentColors.lines[i];
    ctx.lineWidth = 2;
    ctx.stroke();

    // bottom edge
    ctx.beginPath();
    ctx.moveTo(x, canvas.height);
    ctx.lineTo(xCenter, yCenter);
    ctx.stroke();
  }

  // lines left and right
  for (let i = 0; i < leftRightLineCount + 1; i++) {
    const y = (canvas.height / leftRightLineCount) * i;

    // left edge
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(xCenter, yCenter);
    ctx.strokeStyle = currentColors.lines[i];
    ctx.stroke();

    // right edge
    ctx.beginPath();
    ctx.moveTo(canvas.width, y);
    ctx.lineTo(xCenter, yCenter);
    ctx.stroke();
  }

  // draw the text
  drawMoveText();
}

const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;

canvas.addEventListener("mousemove", (event) => {
  mouseFrameCount++;
  const xCenter = event.clientX;
  const yCenter = event.clientY;
  drawLinesToPoint(xCenter, yCenter);
});
