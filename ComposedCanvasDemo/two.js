
function init() {
  var leftContext = document.getElementById('canvas_0_0').getContext('2d');
  var rightContext = document.getElementById('canvas_0_1').getContext('2d');

  leftContext.save();
  leftContext.strokeStyle = "blue";
  leftContext.lineCap = "round";
  leftContext.lineWidth = 3;
  leftContext.moveTo(400, 200);
  leftContext.lineTo(750, 400);
  leftContext.stroke();
  leftContext.restore();

  rightContext.save();
  rightContext.strokeStyle = "navy";
  rightContext.lineCap = "round";
  rightContext.lineWidth = 3;
  rightContext.moveTo(-100, 200);
  rightContext.lineTo(250, 400);
  rightContext.stroke();
  rightContext.restore();



  //Place the preview "button". Of course it should be done dynamically!
  var prv = document.getElementById('preview');
  prv.style.left = '900px';
  prv.style.top = '750px';
}


function scrollUp (pixels) {
  var holder = document.getElementById('holder');
  holder.scrollTop -= pixels;
}
