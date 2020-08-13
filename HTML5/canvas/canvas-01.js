'use strict'
const canvas = document.getElementById('canvas')
if (!canvas.getContext) 
  alert('浏览器不支持canvas')

/* ================================================================ */
/*                        DRAWING RECTANGLES                        */
/* ================================================================ */

function drawRect() {
  const ctx = canvas.getContext('2d')
  // Draws a filled rectangle.
  ctx.fillRect(25, 25, 100, 100);
  // Clears the specified rectangular area, making it fully transparent.
  ctx.clearRect(45, 45, 60, 60);
  // draws a rectangular outline
  ctx.strokeRect(50, 50, 50, 50);
}

// drawRect()

/* ================================================================ */
/*                           DRAWING PATHS                          */
/* ================================================================ */

function drawLine() {
  const ctx = canvas.getContext('2d')
  // Creates a new path
  ctx.beginPath()
  // moving the pen
  ctx.moveTo(50, 50)
  ctx.lineTo(100, 50)
  ctx.lineTo(100, 100)

  ctx.moveTo(150, 150)
  ctx.lineTo(200, 150)
  ctx.lineTo(200, 200)
  ctx.stroke()
}

// drawLine()


function drawSmile() {
  const ctx = canvas.getContext('2d')

  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle

  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)

  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye

  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
  ctx.stroke();
}

// drawSmile()

/* ============================= Arcs ============================= */
/* 
  arc(x, y, radius, startAngle, endAngle, anticlockwise)
    Draws an arc which is centered at (x, y) position with radius r starting 
    at startAngle and ending at endAngle going in the given direction indicated
    by anticlockwise (defaulting to clockwise).

  arcTo(x1, y1, x2, y2, radius)
    Draws an arc with the given control points and radius, connected to 
    the previous point by a straight line
*/

function drawArcs() {
  const ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.moveTo(240, 200)
  ctx.arc(200, 200, 40, 0, Math.PI * 2)
  // ctx.stroke()

  ctx.moveTo(220, 200)
  ctx.arcTo(220, 200, 180, 200, 10)
  ctx.stroke()
}

// drawArcs()

/* ================================================================ */
/*                          PATH2D OBJECTS                          */
/* ================================================================ */
function path2D() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}

path2D()
