var TOOLTIP_OFFSET = 15;

var showCoordsToolTip = function(e) {
  var canvas = this;

  //Translate global page coordinates to relative to given canvas.
  var rect = canvas.getBoundingClientRect();
  var borders = canvas.style.borderLeftWidth + canvas.style.borderRightWidth;
  var _x = Math.floor((e.clientX - rect.left) * (canvas.width / (rect.width - borders)));
  var _y = Math.floor((e.clientY - rect.top) * (canvas.height / (rect.height - borders)));

  var toolTip = document.getElementById("toolTip");
  toolTip.innerHTML = "X=" + _x + " Y=" + _y;
  toolTip.style.display = "block";
  toolTip.style.left = TOOLTIP_OFFSET + e.clientX + "px";
  toolTip.style.top = TOOLTIP_OFFSET + e.clientY + "px";
};

var hideCoordsToolTip = function(e) {
  var toolTip = document.getElementById("toolTip");
  toolTip.style.display = "none";
};

/**
 * Compare canvas drawing to referential image. The image should depict the correct visual content of canvas. If so, the function
 * returns string "OK", otherwise text describing conflict (ex. position of first pixel of canvas that differs from image).
 * 
 * @param{HTMLCanvasElement}  canvas  dynamically drawn canvas
 * @param{HTMLImageElement}  image  reference image
 * @param{Number}  tolerance  allowed difference between RGB values of canvas and image on the same pixel position
 * 
 * @return{String}
 */
var compareContents = function(canvas, image, tolerance) {
  tolerance = tolerance || 0;
  if (canvas.width != image.width)
    return "CONFLICT: different dimensions [canvas.width=" + canvas.width + " / image.width=" + image.width + "]";
  if (canvas.height != image.height)
    return "CONFLICT: different dimensions [canvas.height=" + canvas.height + " / image.height=" + image.height + "]";

  var canContext = canvas.getContext("2d");
  var imgCanvas = document.createElement("canvas");
  imgCanvas.width = canvas.width;
  imgCanvas.height = canvas.height;
  var imgContext = imgCanvas.getContext("2d");

  imgContext.drawImage(image, 0, 0);

  //Go by lines of pixels and left-to-right on both canvases, and compare
  for (var h = 0; h < canvas.height; h++) {
    for (var w = 0; w < canvas.width; w++) {
      var colorData1 = canContext.getImageData(w, h, 1, 1).data;
      var colorData2 = imgContext.getImageData(w, h, 1, 1).data;

      var red1 = colorData1[0];
      var green1 = colorData1[1];
      var blue1 = colorData1[2];
      var alpha1 = colorData1[3];

      var red2 = colorData2[0];
      var green2 = colorData2[1];
      var blue2 = colorData2[2];
      var alpha2 = colorData2[3];

      if (Math.abs(red1 - red2) > tolerance || Math.abs(green1 - green2) > tolerance ||
          Math.abs(blue1 - blue2) > tolerance || Math.abs(alpha1 - alpha2) > tolerance ) {

        canvas.addEventListener("mousemove", showCoordsToolTip);
        canvas.addEventListener("mouseout", hideCoordsToolTip);

        return "CONFLICT: color mismatch at position X=" + w + ", Y=" + h +
               " [image: R=" + red2 + ",G=" + green2 + ",B=" + blue2 + ", A=" + alpha2 + " / " +
               "canvas: R=" + red1 + ",G=" + green1 + ",B=" + blue1 + ", A=" + alpha1 + "]";
      }
    }
  }

  return "OK";
};
