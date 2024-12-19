const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseFrameCount = 0;
let currentColors = {
  lines: [],
};

let circles = []; // array to store falling circles

// function to generate random colors
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

// draw lines towards a point
function drawLinesToPoint(xCenter, yCenter) {
  const topBottomLineCount = 25;
  const leftRightLineCount = 16;

  // set background to black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // only change line colors after 25 frames of moving your mouse
  if (mouseFrameCount >= 25) {
    currentColors.lines = [];
    for (let i = 0; i < topBottomLineCount + 1; i++) {
      currentColors.lines.push(getRandomColor());
    }
    mouseFrameCount = 0;
  }

  // top and bottom lines
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

  // left and right lines
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

  // draw the falling circles
  drawFallingCircles();

  // draw the move text
  drawMoveText();
}

// circle stuff
function drawFallingCircles() {
  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    circle.x -= circle.speedX;
    circle.y += circle.speedY;

    // if the circle moves off the screen, remove it
    if (circle.y > canvas.height || circle.x < 0) {
      circles.splice(i, 1);
      i--;
    } else {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle.color;
      ctx.fill();
    }
  }
}

// circle stuff
function spawnCircle() {
  const size = Math.random() * 35 + 15;
  const color =
    currentColors.lines[Math.floor(Math.random() * currentColors.lines.length)];
  // random speed
  const speedX = Math.random() * 2 + 1;
  const speedY = Math.random() * 2 + 1;
  // random place at the top
  const x = Math.random() * canvas.width;
  const y = 0;

  circles.push({
    x: x,
    y: y,
    radius: size,
    color: color,
    speedX: speedX,
    speedY: speedY,
  });
}

setInterval(spawnCircle, 50);

canvas.addEventListener("mousemove", (event) => {
  mouseFrameCount++;
  const xCenter = event.clientX;
  const yCenter = event.clientY;
  drawLinesToPoint(xCenter, yCenter);
});
