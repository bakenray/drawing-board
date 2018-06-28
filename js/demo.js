
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

resize()
window.onresize = function(){
  resize()
}

var painting = false
var lastPoint = {'x':undefined,'y':undefined}
canvas.onmousedown = function(a){
  painting = true
  var x =a.clientX
  var y =a.clientY
  lastPoint = {'x':x,'y':y}
  // drawPoint(x,y,1)
}

canvas.onmousemove =function(a){
  if(painting){
    var x =a.clientX
    var y =a.clientY
    var newPoint ={'x':x,'y':y}
    // drawPoint(x,y,1)
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
    lastPoint = newPoint
  }
  else{}
}

canvas.onmouseup =function(){
  painting = false
}

function drawPoint(x,y,radius){
  ctx.beginPath()
  ctx.fillStyle = "red"
  ctx.arc(x,y,radius,0,Math.PI*2)
  ctx.fill()
}

function drawLine(x1,y1,x2,y2){
  ctx.beginPath()
  ctx.strokeStyle = 'red'

  ctx.moveTo(x1,y1)
  ctx.lineWidth = 6
  ctx.lineTo(x2,y2)
  ctx.stroke()
  ctx.closePath() 
}

function resize(){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  
  canvas.width = pageWidth
  canvas.height = pageHeight
}