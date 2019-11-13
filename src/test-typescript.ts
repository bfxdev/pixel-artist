import * as fs from 'fs';
import Jimp from 'jimp';
import {PixelArtist, Palette, palettes} from './pixel-artist';

Jimp.read('pics/duck.png').then(image =>
{
  let pa = new PixelArtist(palettes["RGB332"]);
  pa.setOutline(1, "Black", true);
  pa.setEdge(3, "White", false, -1);
  pa.setFinalFrame(2);
  pa.render(image).write('test/result.png');
});

Jimp.read('pics/rgb-reference.png').then(image =>
{
  let text:String = "|Name|#Colors|![Reference picture](pics/rgb-reference.png)|\n|--|--|--|\n";
  for (let entry of Object.entries(palettes))
    {
      let name = entry[0];
      let pal = entry[1];
      let pa = new PixelArtist(pal);
      let res = pa.render(image);
      res.write("test/rgb-reference-" + name + ".png");
      let respal:Palette = new Palette(res);
      text += "|" + name + "|" + pal.count() + "|";
      text += "![Example with " + name + "](pics/rgb-reference-" + name + ".png)|\n";
    }

  fs.writeFile("test/palettes.md", text, (err) =>
    { if (err) throw err; });
});

