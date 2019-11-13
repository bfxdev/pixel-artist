var Jimp = require('jimp');
var pixart = require('./lib/pixel-artist.js');

Jimp.read('pics/duck.png').then(image =>
{
  var pa = new pixart.PixelArtist(pixart.palettes["AAP64"]);
  pa.setOutline(1, "Black", false);
  pa.render(image).write('test/result.png');
});