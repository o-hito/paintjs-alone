const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const refresh = document.getElementById("jsRefresh");
const resizeForm = document.querySelector(".resizeForm");
const inputWidth = document.getElementById("inputWidth");
const inputHeight = document.getElementById("inputHeight");
const myColor = document.querySelector(".myColor");
const pickColor = document.getElementById("pickColor");

const PICKED = "picked";
let painting = false;
let filling = false;
let CANVAS_WIDTH = 500;
let CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white"; // 배경을 흰색으로 지정해서 채우고
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.fillStyle = "black"; // 다시 채우기 초기값을 검은색으로
ctx.lineWidth = 2.5;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  Array.from(colors).forEach(hello => hello.classList.remove(PICKED));
  myColor.classList.remove(PICKED);
  event.target.classList.add(PICKED);
}

function handleRange(event) {
  const value = event.target.value;
  ctx.lineWidth = value;
}

function handleMode() {
  if (filling) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PICTURE🐱‍🐉";
  link.click();
  console.log(link);
}

function handleRefresh() {
  const preStyle = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = preStyle;
}

function handleResizeForm(event) {
  event.preventDefault();
  const width = inputWidth.value;
  const height = inputHeight.value;
  inputWidth.value = "";
  inputHeight.value = "";
  canvas.width = width;
  canvas.height = height;
  CANVAS_WIDTH = width;
  CANVAS_HEIGHT = height;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

function handleChange(event) {
  const color = event.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  myColor.style.backgroundColor = color;
}

function handleMyClick() {
  Array.from(colors).forEach(hello => hello.classList.remove(PICKED));
  pickColor.click();
  myColor.classList.add(PICKED);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", handleMode);
}

if (save) {
  save.addEventListener("click", handleSave);
}

if (refresh) {
  refresh.addEventListener("click", handleRefresh);
}
if (resizeForm) {
  resizeForm.addEventListener("submit", handleResizeForm);
}

if (pickColor) {
  pickColor.addEventListener("change", handleChange);
}

if (myColor) {
  myColor.addEventListener("click", handleMyClick);
}
