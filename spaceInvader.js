let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");
DrawBackground();
function DrawBackground() {
  context.fillStyle = "black";
  context.beginPath();
  context.rect(0, 0, 300, 300);
  context.stroke();
  context.fill();
}

DrawLogo();
function DrawLogo() {
  context.fillStyle = "#84d2cf";

  context.beginPath();
  context.rect(20, 20, 50, 100);
  context.rect(70, 70, 150, 50);
  context.rect(220, 20, 50, 100);
  context.rect(20, 170, 50, 50);
  context.rect(120, 170, 50, 100);
  context.rect(220, 170, 50, 50);
  context.stroke();
  context.fill();
}
