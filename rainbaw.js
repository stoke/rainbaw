var converters = require('./converters');

function Rainbaw(c) {
  (typeof c === 'string')    ? this.fromHex(c)  :
  (c.r && c.g && c.b)        ? this.fromRGB(c)  :
  (c.h && c.s && c.v)        ? this.fromHSV(c)  :
  (c.c && c.m && c.y && c.k) ? this.fromCMYK(c) :
                               this.incorrect();
}

Rainbaw.prototype.incorrect = function() {
  throw new Error('incorrect color format');
};

Rainbaw.prototype.convert = function() {
  ['Hex', 'CMYK', 'HSV'].forEach(function(x) {
    if (!this[x])
      this['to' + x]();
  }, this);
};

Rainbaw.prototype.fromHex = function(s) {
  this.rgb = s.match(/.{1,2}/g).map(function(x) { 
    return parseInt(x, 16);
  });

  this.hex = s;

  this.convert();
};

Rainbaw.prototype.fromRGB = function(rgb) {
  this.rgb = [rgb.r, rgb.g, rgb.b];

  this.convert();
};

Rainbaw.prototype.fromHSV = function(hsv) {
  this.hsv = [hsv.h, hsv.s, hsv.v];
  this.rgb = converters.HSVtoRGB.apply(this, this.hsv);

  this.convert();
};

Rainbaw.prototype.fromCMYK = function(cmyk) {
  this.cmky = [cmyk.c, cmyk.m, cmyk.y, cmyk.k];
  this.rgb = converters.CMYKtoRGB.apply(this, this.cmky);

  this.convert();
};

Rainbaw.prototype.toHex = function() {
  this.hex = this.rgb.map(function(x) {
    return x.toString(16);
  }).join('');
};

Rainbaw.prototype.toHSV = function() {
  this.hsv = converters.RGBtoHSV.apply(this, this.rgb);

  ['h', 's', 'v'].forEach(function(x, idx) {
    this[x] = this.hsv[idx];
  }, this);
};

Rainbaw.prototype.toCMYK = function() {
  this.cmyk = converters.RGBtoCMYK.apply(this, this.rgb);

  ['c', 'm', 'y', 'k'].forEach(function(x, idx) {
    this[x] = this.cmyk[idx];
  }, this);
};

module.exports = function(c) {
  return new Rainbaw(c);
};
