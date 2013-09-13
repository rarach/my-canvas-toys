function drawDetailReportButton(ctx) {        //Company, mouse-out, enabled
  var COMPANY_BORDER_BRUSH = "#a8afbc";
  
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0)';
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 0.5;

  ctx.save();
  var g=ctx.createLinearGradient(0,0,0,25);
  g.addColorStop(0,"rgba(255, 255, 255, 1)");
  g.addColorStop(1,"rgba(255, 255, 255, 0.1)");
  ctx.fillStyle = g;
  ctx.strokeStyle = COMPANY_BORDER_BRUSH;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(5,0);
  ctx.lineTo(20,0);
  ctx.quadraticCurveTo(25,0,25,5);
  ctx.lineTo(25,20);
  ctx.quadraticCurveTo(25,25,20,25);
  ctx.lineTo(5,25);
  ctx.quadraticCurveTo(0,25,0,20);
  ctx.lineTo(0,5);
  ctx.quadraticCurveTo(0,0,5,0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.lineWidth = 5;
  ctx.font = "italic bold 20.0px 'Times New Roman'";
  ctx.fillStyle = COMPANY_BORDER_BRUSH;
  ctx.strokeStyle = COMPANY_BORDER_BRUSH;
  ctx.fillText("i",9,19);
  ctx.restore();
  ctx.restore();
}
