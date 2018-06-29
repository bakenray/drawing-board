
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

autoSetCanvasSize(canvas)
listenToMouse(canvas)

function listenToMouse(canvas){
  var usingMouse = false //鼠标触发时间默认设置false
  var lastPoint = {'x':undefined,'y':undefined} //鼠标最后点击的点坐标初始化
  
if(document.body.ontouchstart !== undefined){  //判断设备是否支持touch事件

  canvas.ontouchstart = function(a){ //touch开始
    console.log(a)
    var x =a.touches[0].clientX
    var y =a.touches[0].clientY
    usingMouse = true
    if(eraserEnable){
      ctx.clearRect(x-10,y-10,20,20);
    }
    else{
      lastPoint = {'x':x,'y':y}
    }
  }
  canvas.ontouchmove =function(a){  //touch移动
    var x =a.touches[0].clientX
    var y =a.touches[0].clientY
    if(!usingMouse){ return }

    if(eraserEnable){
      ctx.clearRect(x-10,y-10,20,20);
    }
    else{
        var newPoint ={'x':x,'y':y}
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
    }
  }
  canvas.ontouchend =function(){  //touch结束
    usingMouse = false
  }
}
else{                                 //如果不支持touch事件，则执行鼠标事件
   canvas.onmousedown = function(a){ //鼠标按下事件
     var x =a.clientX
     var y =a.clientY
     usingMouse = true
     if(eraserEnable){
       ctx.clearRect(x-10,y-10,20,20);
     }
     else{
       lastPoint = {'x':x,'y':y}
       // drawPoint(x,y,1)
     }
   }
   canvas.onmousemove =function(a){  //鼠标移动事件
     var x =a.clientX
     var y =a.clientY
     if(!usingMouse){ return }

     if(eraserEnable){
       ctx.clearRect(x-10,y-10,20,20);
     }
     else{
         var newPoint ={'x':x,'y':y}
         // drawPoint(x,y,1)
         drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
         lastPoint = newPoint
     }
   }
   canvas.onmouseup =function(){  //鼠标松开事件
     usingMouse = false
   }
  }
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

function autoSetCanvasSize(canvas){ //全屏函数
  resize()
  window.onresize = function(){  
    resize()
  }
  function resize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
var eraserEnable = false   //橡皮擦画笔切换
  eraser.onclick=function (){ 
    eraserEnable = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}
  brush.onclick=function (){
    eraserEnable = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}
