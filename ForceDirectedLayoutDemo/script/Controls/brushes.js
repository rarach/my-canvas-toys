var TextBrush = function(pixelHeight, fontFamily, colorFill)
{
  var that = this;

  this.height = pixelHeight;
  this.font = fontFamily;
  this.color = colorFill;       //fillStyle TODO: should also be applied to strokeStyle
  
  
  this.getFontStyle = function(){
    return that.height + "px " + that.font;
  }
  
};


//TODO: ctx extension method setTextBrush(textBrush)
