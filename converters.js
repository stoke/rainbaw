function RGBtoHSV(r, g, b) {
  var min, max, h, s, v, delta;
  
  r /= 255;
  g /= 255;
  b /= 255;

  min = Math.min(r, g, b);
  v = max = Math.max(r, g, b);

  delta = max - min;

  if (!delta) return [0, 0, v * 100];

  s = delta / max;

  var del_R = (((max - r) / 6) + (delta / 2)) / delta;
  var del_G = (((max - g) / 6) + (delta / 2)) / delta;
	var del_B = (((max - b) / 6) + (delta / 2)) / delta;
 
  h = (max === r) ? del_B - del_G :
      (max === g) ? (1 / 3) + del_R - del_B :
      (max === b) ? (2 / 3) + del_G - del_R : 0;

  if (h < 0) h += 1;
  if (h > 1) h -= 1;

  h *= 360;
  s *= 100;
  v *= 100;

  return [h, s, v].map(Math.floor);
}

function HSVtoRGB(h, s, v) {
  var i, o, t, p;
  var rgb = [];
  
  h /= 360;
  s /= 100;
  v /= 100;

  if (!s) return [v * 255, v * 255, v * 255];

  i = Math.floor(h * 6);
  o = v * (1 - s);
  t = v * (1 - s * (h * 6 - i));
  p = v * (1 - s * (1 - (h * 6 - i)));

  (i === 0) ? rgb.push(v, p, o) :
  (i === 1) ? rgb.push(t, v, o) :
  (i === 2) ? rgb.push(o, v, p) :
  (i === 3) ? rgb.push(o, t, v) :
  (i === 4) ? rgb.push(p, o, v) :
              rgb.push(v, o, t);

  return rgb.map(function(x) {
    return Math.floor(x * 255);
  });
}

function RGBtoCMYK(r, g, b) {
  var cmy, k;

  r /= 255;
  g /= 255;
  b /= 255;

  cmy = [1 - r, 1 - g, 1 - b];
  k = Math.min.apply(Math, cmy);

  return cmy.map(function(x) {
    return (x - k) / (1 - k);
  }).concat(k);
}

function CMYKtoRGB(c, m, y, k) {
  return [c, m, y].map(function(x) {
    return (1 - (x * (1 - k) + k)) * 255;
  }).map(Math.floor);
}

exports.RGBtoHSV = RGBtoHSV;
exports.HSVtoRGB = HSVtoRGB;
exports.RGBtoCMYK = RGBtoCMYK;
exports.CMYKtoRGB = CMYKtoRGB;
