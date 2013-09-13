/*
  Wrapping label. Only word delimiter considered is space. If there is a word longer than line width,
  it'll simply stick out, not trimming.
  Returns number of lines used.
*/
CanvasRenderingContext2D.prototype.label = function(text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";
  var count = 1;

  var len = words.length;
  for (var n = 0; n < len; n++) {
      var testLine = line + words[n] + " ";
      var metrics = this.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth) {
          this.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
          count++;
      }
      else {
          line = testLine;
      }
  }
  this.fillText(line, x, y);
  
  return count;
}


CanvasRenderingContext2D.prototype.countLines = function (text, maxWidth) {
  var words = text.split(" ");
  var line = "";
  var count = 1;

  var len = words.length;
  for (var n = 0; n < len; n++) {
      var testLine = line + words[n] + " ";
      var metrics = this.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth) {
          line = words[n] + " ";
          count++;
      }
      else {
          line = testLine;
      }
  }

  return count;
}
