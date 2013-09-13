/** Visual node */
var Node = function(id, data)
{
  var TEXT_HEIGHT = 12;
  var LINE_WIDTH = 5.0;
  var BORDER_WIDTH = 2.0;

  var _position = new UIPoint(0.0, 0.0);
  var height = 55.0 + Math.random() * 20.0 -10;      //TODO: actual size. Depends on its content (mainly name label)
  var width = 100 + Math.random() * 40.0 -20;
  var _scale = 1.0;

  var _hittable = false;
  var _colorKey = null;
  
  this.isHittable = function() {return _hittable;};
  this.setHittable = function(hittable) {
    _hittable = hittable;

    if (_hittable === true) {
      _colorKey = HitService.getInstance().registerControl(this);
    }
    else {
      HitService.getInstance().unregisterColorKey(_colorKey);
      _colorKey = null;
    }
  };

  this.isDraggable = function() { return true; };



  var drawnRect = new Frame(0, 0, 3, 3);

  var nameLabel = new Label(this, data.displayname, TEXT_HEIGHT, TEXT_HEIGHT + 'px Verdana');
  var idLabel = new Label(this, id, 10, '10px Verdana');

  this.id = id;
  this.isSelected = false;          //TODO: super-class VisualElement? Maybe.
  this.data = typeof(data) !== 'undefined' ? data : null;
  this.getScale = function() {return _scale;};
  this.setScale = function(scale) {
    _scale = scale;

    //Set scale also to all children. TODO: foreach above _children
    nameLabel.setScale(scale);
    idLabel.setScale(scale);
  };
  this.getHeight = function() {return _scale * height;};
  this.getWidth = function() {return _scale * width;};

  this.getPosition = function() {
    return _position.multiply(_scale);//TODO: could be precomputed? (measure performance)
  };
  this.setPosition = function(uiPoint) { _position = uiPoint; };


  this.draw = function(ctx)
  {
    var hitCtx;
    if (_hittable === true) {
      hitCtx = HitService.getInstance().getContext();
      hitCtx.fillStyle = _colorKey;
    }

    var s = this.getPosition();
    drawnRect = new Frame(s.getX() - this.getWidth()/2.0, s.getY() - this.getHeight()/2.0, this.getWidth(), this.getHeight());

    ctx.save();
    if (this.isSelected)
    {
      ctx.save();
      ctx.strokeStyle = "orange";
      ctx.lineWidth = _scale * LINE_WIDTH;
      ctx.strokeRect(drawnRect.x-3, drawnRect.y-3, drawnRect.width+3+3, drawnRect.height+3+2);
      ctx.restore();
    }
    else
      ctx.fillStyle = "#F3EA8C";

    ctx.fillStyle = "#F2EFD9";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = _scale * BORDER_WIDTH;

    ctx.fillRect(drawnRect.x, drawnRect.y, drawnRect.width, drawnRect.height);
    ctx.strokeRect(drawnRect.x, drawnRect.y, drawnRect.width, drawnRect.height);

    //Stamp in hit-canvas
    if (_hittable === true)
      hitCtx.fillRect(drawnRect.x, drawnRect.y, drawnRect.width, drawnRect.height);

    // clip drawing within rectangle
    ctx.beginPath();
    ctx.rect(drawnRect.x+2, drawnRect.y+2, drawnRect.width-4, drawnRect.height-4);
    ctx.clip();

    //edu: "icon"
    ctx.fillStyle = "#AA7777";
    ctx.fillRect(s.getX() - this.getWidth()/2.0 + (_scale *4), s.getY() - this.getHeight()/2.0 + (_scale * 4), _scale*20, _scale*20);

    if (_hittable === true) {     //TODO: of course you ask the "icon"
      hitCtx.save();
      hitCtx.fillStyle = "pink";
      hitCtx.fillRect(s.getX() - this.getWidth()/2.0 + (_scale *4), s.getY() - this.getHeight()/2.0 + (_scale * 4),
                      _scale*20, _scale*20);
      hitCtx.restore();
    }

    //Labels
    nameLabel.draw(s.getX() - this.getWidth()/2.0 + (_scale*28), s.getY() - this.getHeight()/2.0 + (_scale*7), ctx);
    idLabel.draw(s.getX() - this.getWidth()/2.0 + (_scale*28), s.getY() - this.getHeight()/2.0 + (_scale*20), ctx);

    //DEBUG
//    ctx.fillStyle = "black";
//    ctx.fillText("X=" + this.getPosition().getX().toFixed(2) + ", Y=" + this.getPosition().getY().toFixed(2), s.x - width/2.0 + 10, s.y - height/2.0 + 46);

    ctx.restore();
  };
};


var NodeData = function(nodeId, displayName)
{
  this.userid = nodeId;
  this.displayname = displayName;

  this.neighbors = 1;     //DEBUG so far
};
