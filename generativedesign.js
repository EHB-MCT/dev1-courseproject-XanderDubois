const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

drawLinesToPoint();

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(0);
  const b = Math.floor(Math.random() * 128 + 128);
  return `rgb(${r},${g},${b})`;
}

// warning text lmao
function drawWarningText() {
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("WARNING: Flashing Lights", 10, 10, 400);
}

// random color circles
function drawRandomCircles(count) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 10 + 20;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
  }
}

// lines to a point
function drawLinesToPoint(xCenter, yCenter) {
  const topBottomLineCount = 25;
  const leftRightLineCount = 16;

  // background color black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // lines top and bottom
  for (let i = 0; i < topBottomLineCount + 1; i++) {
    const x = (canvas.width / topBottomLineCount) * i;

    // top edge
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(xCenter, yCenter);
    ctx.strokeStyle = getRandomColor();
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
    ctx.strokeStyle = getRandomColor();
    ctx.stroke();

    // right edge
    ctx.beginPath();
    ctx.moveTo(canvas.width, y);
    ctx.lineTo(xCenter, yCenter);
    ctx.stroke();
  }

  // draw everything in the right order
  drawRandomCircles(100);
  drawWarningText();
}

const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;
drawLinesToPoint(xCenter, yCenter);

canvas.addEventListener("mousemove", (event) => {
  const xCenter = event.clientX;
  const yCenter = event.clientY;
  drawLinesToPoint(xCenter, yCenter);
});
