function drawCollapsedButton(ctx, shiftX, shiftY) {        //Normal state (enabled, mouse out) for Person
  var PLUS_SIGN_CENTER_OFFSET = 3.0;    //It's x and y
  var PERSON_BORDER_BRUSH = "rgba(0, 0, 0, 0.50196)";
  
  ctx.save();

  ctx.strokeStyle = 'rgba(0,0,0,0)';
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 4;
  ctx.save();
  g=ctx.createLinearGradient(0,0,0,25);
  g.addColorStop(0,"rgba(255, 255, 255, 1)");
  g.addColorStop(1,"rgba(255, 255, 255, 0.1)");
  ctx.fillStyle = g;
  ctx.strokeStyle = "#c3b18f";
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

  //Plus sign
  ctx.save();
  ctx.translate(PLUS_SIGN_CENTER_OFFSET, PLUS_SIGN_CENTER_OFFSET);
  ctx.fillStyle = PERSON_BORDER_BRUSH;
  ctx.beginPath();
  ctx.moveTo(8,0);
  ctx.lineTo(11,0);
  ctx.bezierCurveTo(11.552284,0,12,0.44771525,12,0.99999988);
  ctx.lineTo(12,7);
  ctx.lineTo(18,7);
  ctx.bezierCurveTo(18.552284,7,19,7.4477153,19,8);
  ctx.lineTo(19,11);
  ctx.bezierCurveTo(19,11.552285,18.552284,12,18,12);
  ctx.lineTo(12,12);
  ctx.lineTo(12,18);
  ctx.bezierCurveTo(12,18.552284,11.552284,19,11,19);
  ctx.lineTo(8,19);
  ctx.bezierCurveTo(7.4477153,19,7,18.552284,7,18);
  ctx.lineTo(7,12);
  ctx.lineTo(1,12);
  ctx.bezierCurveTo(0.44771528,12,0,11.552285,0,11);
  ctx.lineTo(0,8);
  ctx.bezierCurveTo(0,7.4477153,0.44771528,7,1,7);
  ctx.lineTo(7,7);
  ctx.lineTo(7,0.99999988);
  ctx.bezierCurveTo(7,0.44771525,7.4477153,0,8,0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}
