/** 
 * Manages mouse click on given canvas, detects hit on registered elements.
 * @param {HTMLCanvasElement} primaryCanvas
 */
var HitService = (function(){
  var HitServiceClass = function(mainCanvas) {

    var _mainCanvas = mainCanvas;
    var _mainCanvasDisplay = mainCanvas.style.display;

    var _hitCanvas = document.createElement('canvas');
    _hitCanvas.width = mainCanvas.width;
    _hitCanvas.height = mainCanvas.height;
    _hitCanvas.style.display = 'none';
    //Add to DOM on main canvas' place, to show temporarily when debugging
    _mainCanvas.parentNode.insertBefore(_hitCanvas, mainCanvas);

    var _context = _hitCanvas.getContext('2d');

    var _registeredControls = new Array();   //key=color code, value=hittable control


    /** Registers a control in this HitService. Returns a unique color key. */
    this.registerControl = function(control) {
      var key = _getRandomKey();

      while(typeof(_registeredControls[key]) !== 'undefined') {
        key = _getRandomKey();
      }

      _registeredControls[key] = control;

      return key;
    };

    /** Unregisters a control identified by its color key. */
    this.unregisterColorKey = function(key) {
      delete _registeredControls[key];
    };

    var _getRandomKey = function() {
      var red = Math.round(Math.random() * 256).toString(16);
      if (red.length == 1)
        red = '0' + red;

      var green = Math.round(Math.random() * 256).toString(16);
      if (green.length == 1)
        green = '0' + green;

      var blue = Math.round(Math.random() * 256).toString(16);
      if (blue.length == 1)
        blue = '0' + blue;

      return '#' + red + green + blue;
    };

    /** Hit-canvas context. Hittable element's "shadow" needs to be drawn here. */
    this.getContext = function() {
      return _context;
    };

    /**
     *  Core method. Gets topmost control laying on given canvas coordinate. If there is none,
     *  returns NULL.
     *  @param {Number} hitX  X coordinate on main canvas
     *  @param {Number} hitY  Y coordinate on main canvas
     */
    this.getControlAt = function(hitX, hitY) {
      var colorData = _context.getImageData(hitX, hitY, 1, 1).data;
      var red = colorData[0];
      var green = colorData[1];
      var blue = colorData[2];

      if (0==red && 0==green && 0==blue)
        return null;

      red = red.toString(16);
      if (red.length == 1)
        red = '0' + red;

      green = green.toString(16);
      if (green.length == 1)
        green = '0' + green;

      blue = blue.toString(16);
      if (blue.length == 1)
        blue = '0' + blue;

      var key = '#' + red + green + blue;

      return _registeredControls[key];
    };

    this.clear = function() {
      _context.clearRect(0, 0, _hitCanvas.width, _hitCanvas.height);
    }

    /** Replaces primary canvas with hit-canvas. Merely for debugging purposes. */
    this.show = function() {
      _mainCanvas.style.display = 'none';
      _hitCanvas.style.display = _mainCanvasDisplay;
    };
    /** Hides the auxiliary canvas, restore the main content canvas. */
    this.hide = function() {
      _hitCanvas.style.display = 'none';
      _mainCanvas.style.display = _mainCanvasDisplay;
    };
  };


  var _singleton = null;

  return {
    initialize : function(primaryCanvas) {
      if (_singleton !== null)
        throw 'Invalid operation: HitService already initialized!';

      _singleton = new HitServiceClass(primaryCanvas);
      _singleton.constructor = null;
    },
    
    /** Singleton instance of HitService */
    getInstance : function() {return _singleton;}
  };
})();
