function drawReportButton(ctx, offsetX, offsetY) {
  var TRADESMAN_BORDER_BRUSH = "#cdc4b5";
  
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0)';
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 4;

  ctx.save();
  var g=ctx.createLinearGradient(0,0,0,25);
  g.addColorStop(0,"rgba(255, 255, 255, 1)");
  g.addColorStop(1,"rgba(255, 255, 255, 0.1)");
  ctx.fillStyle = g;
  ctx.strokeStyle = TRADESMAN_BORDER_BRUSH;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offsetX+5,offsetY+0);
  ctx.lineTo(offsetX+20,offsetY+0);
  ctx.quadraticCurveTo(offsetX+25,offsetY+0,offsetX+25,offsetY+5);
  ctx.lineTo(offsetX+25,offsetY+20);
  ctx.quadraticCurveTo(offsetX+25,offsetY+25,offsetX+20,offsetY+25);
  ctx.lineTo(offsetX+5,offsetY+25);
  ctx.quadraticCurveTo(offsetX+0,offsetY+25,offsetX+0,offsetY+20);
  ctx.lineTo(offsetX+0,offsetY+5);
  ctx.quadraticCurveTo(offsetX+0,offsetY+0,offsetX+5,offsetY+0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offsetX+4.166656,offsetY+6.1669998);
  ctx.lineTo(offsetX+21,offsetY+6.1669998);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offsetX+4.166656,offsetY+9.5018998);
  ctx.lineTo(offsetX+21,offsetY+9.5018998);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offsetX+4.166656,offsetY+12.8369998);
  ctx.lineTo(offsetX+21,offsetY+12.8369998);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offsetX+4.166656,offsetY+16.1719998);
  ctx.lineTo(offsetX+21,offsetY+16.1719998);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offsetX+4.166656,offsetY+19.5069998);
  ctx.lineTo(offsetX+21,offsetY+19.5069998);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.restore();
}
