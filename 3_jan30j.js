var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
//for cearing the line
var canvas = document.getElementById("myCanvas1");
var ctx = canvas.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

//for creating the arc
var canvas = document.getElementById("myCanvas2");
var ctx = canvas.getContext("2d");

ctx.font = "30px Arial";
ctx.fillText("Satyendr Singh");

//write your name in canvas, translate from one corner to other, rotate it 90 degree clockwise
