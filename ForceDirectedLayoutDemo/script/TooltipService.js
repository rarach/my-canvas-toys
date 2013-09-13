
var TooltipService = (function(){
  var TooltipServiceClass = function(hitService, leftOffset, topOffset) {
    var TOOLTIP_DELAY = 500;      //TODO: param? Maybe, but with some minimum (50ms?) that can't be underset
    var _xOffset = leftOffset;    //TODO: maybe I wouldn't have to mess with global offsets if the canvas (Scene) was accesible. The _holder would be appended to it instead of body
    var _yOffset = topOffset - 6; //6 is magic offset not to have the tool-tip stuck right on the pointer
    var _hitService = hitService;
    var _timerHandle;
    var _hoveredControl = null;
    var _tooltipVisible = false;

    var _lastX = 0;
    var _lastY = 0;

    var _holder = document.createElement("div");
    _holder.style.position = "absolute";
    _holder.style.display = "inline";

    var _registeredControls = new Array();    //key=control's ID, value=HTMLElement instance


    var _onMouseStop = function() {
      clearInterval(_timerHandle);

      if (_hoveredControl != null && _registeredControls[_hoveredControl.id]) {
        //First remove old content
        while (_holder.hasChildNodes())
          _holder.removeChild(_holder.lastChild);

        _holder.appendChild(_registeredControls[_hoveredControl.id].cloneNode(true));
        _holder.style.visibility = "hidden";
        document.body.appendChild(_holder);
        _holder.style.top = (_lastY + _yOffset - _holder.offsetHeight) + "px";
        _holder.style.left = (_lastX + _xOffset) + "px";
        _holder.style.visibility = "";

        _tooltipVisible = true;
      }
    };


    /**
     * Register control's tool-tip. The control MUST be properly registered at HitService.
     * @param {Number} controlId  ID of a control
     * @param {HTMLElement} htmlContentElement  an HTML node that will be content of the tool-tip
     */
    this.registerControl = function(controlId, htmlContentElement) {
      _registeredControls[controlId] = htmlContentElement;
    };

    /**
     * Unregister control from tool-tip service.
     * @param {Number} controlId  ID of registered control that doesn't wish to show tool-tips anymore.
     */
    this.unregisterControl = function(controlId) {
      delete _registeredControls[controlId];
    };

    /**
     * Decides whether tool-tip will be shown for given canvas position. If the cursor is hovered
     * enough time above the position and a control with registered tool-tip is underneath,
     * the tool-tip apears.
     * @param {Number} posX  X coordinate of mouse cursor above canvas
     * @param {Number} posY  Y coordinate of mouse cursor above canvas
     */
    this.handlePosition = function(posX, posY) {
      var control = _hitService.getControlAt(posX, posY);

      //Hovered some unregistered control
      if (control != null && !_registeredControls[control.id])
        control = null;

      if (control != null) {
        _lastX = posX;
        _lastY = posY;

        if (control != _hoveredControl) {
          _hoveredControl = control;
          if (_tooltipVisible)
            document.body.removeChild(_holder);
          _tooltipVisible = false;
        }
        //else still inside the hovered controle => don't change anything
      }
      else {
        _hoveredControl = null;
        if (_tooltipVisible)
            document.body.removeChild(_holder);
        _tooltipVisible = false;
      }

      clearInterval(_timerHandle);
      _timerHandle = setInterval(function(){_onMouseStop()}, TOOLTIP_DELAY);
    };
  };


  var _singleton = null;

  return {
    initialize : function(hitService, leftOffset, topOffset) {
      if (_singleton !== null)
        throw "Invalid operation: TooltipService already initialized!";

      _singleton = new TooltipServiceClass(hitService, leftOffset, topOffset);
      _singleton.constructor = null;
    },

    /** Singleton instance of ToolTipService */
    getInstance : function() {return _singleton;}
  };
})();
