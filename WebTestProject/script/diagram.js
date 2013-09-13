
var DIAGRAM_PADDING = 4.0;

function doDraw(ctx, off) {

  var shift = 1.0;
  shift = shift - 1.0;
  shift += off;

  // layer1/Path
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  ctx.strokeStyle = "rgb(10, 120, 58)";
  ctx.fillStyle = "rgb(0, 210, 255)";
  ctx.lineWidth = 5.0;
  ctx.font = "36.0px 'Verdana'";

  var debugShift = LINE_HEIGHT * (ctx.countLines("Tatar Tatramatka has seen to be incorporated", 150) - 1);

  ctx.roundedRect(DIAGRAM_PADDING+shift, DIAGRAM_PADDING+shift, 200, 30+debugShift+60.0, 18);

/*
  ctx.beginPath();
  ctx.moveTo(shift+425.5, debugShift+ shift+220.5);
  ctx.bezierCurveTo(shift+425.5, debugShift+ shift+227.1, shift+420.1, debugShift+ shift+232.5, shift+413.5, debugShift+ shift+232.5);
  
  ctx.lineTo(shift+14.5, debugShift+ shift+232.5);
  ctx.bezierCurveTo(shift+7.9, debugShift+ shift+232.5, shift+2.5, debugShift+ shift+227.1, shift+2.5, debugShift+ shift+220.5);
  ctx.lineTo(shift+2.5, shift+14.5);
  ctx.bezierCurveTo(shift+2.5, shift+7.9, shift+7.9, shift+2.5, shift+14.5, shift+2.5);
  ctx.lineTo(shift+413.5, shift+2.5);
  ctx.bezierCurveTo(shift+420.1, shift+2.5, shift+425.5, shift+7.9, shift+425.5, shift+14.5);
  ctx.lineTo(shift+425.5, shift+220.5);
  ctx.closePath();  
  ctx.fill();  
  ctx.stroke();      
*/
  // layer1/Tatar Tatramatka has seen to be incorporated
  ctx.fillStyle = "rgb(255, 255, 0)";
/*      ctx.fillText("Tatar Tatra-matka ", shift+25.4, shift+60.0);
  ctx.fillText("has seen to be in-", shift+25.4, shift+103.2);
  ctx.fillText("corporated", shift+25.4, shift+146.4);*/
  ctx.label("Tatar Tatramatka has seen to be incorporated "+debugShift, shift+25.4, shift+60.0, 150, LINE_HEIGHT);
  ctx.restore();

  ctx.moveTo(0, 0);
  drawCompanyIcon(ctx, 30, 20);
}


//TODO: move to appropriate (name)space
CanvasRenderingContext2D.prototype.roundedRect = function(x,y,width,height,radius){  
  this.beginPath();
  this.moveTo(x,y+radius);
  this.lineTo(x,y+height-radius);
  this.quadraticCurveTo(x,y+height,x+radius,y+height);
  this.lineTo(x+width-radius,y+height);
  this.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  this.lineTo(x+width,y+radius);
  this.quadraticCurveTo(x+width,y,x+width-radius,y);
  this.lineTo(x+radius,y);
  this.quadraticCurveTo(x,y,x,y+radius);
  this.fill();
  this.stroke();
}
