import * as fs from 'fs';
import Jimp from 'jimp';
import {PixelArtist, Palette, palettes} from './pixel-artist';

// Duck big
Jimp.read('pics/duck.png').then(image =>
{
  let pa = new PixelArtist(palettes["RGB"]);
  pa.setFinalFrame(2,3);
  pa.render(image).write('test/duck-big.png');
});

// Duck AAP64
Jimp.read('pics/duck.png').then(image =>
{
  let pa = new PixelArtist(palettes["AAP64"]);
  pa.setFinalFrame(2,3);
  pa.render(image).write('test/duck-AAP64.png');
});

// Duck CPC
Jimp.read('pics/duck.png').then(image =>
{
  let pa = new PixelArtist(palettes["AAP64"]);
  pa.setFinalFrame(2,3);
  pa.render(image).write('test/duck-AAP64.png');
});
  
// Duck C64
Jimp.read('pics/duck.png').then(image =>
{
  let pa = new PixelArtist(palettes["C64"]);
  pa.setFinalFrame(2,3);
  pa.render(image).write('test/duck-C64.png');
});
  

Jimp.read('pics/duck.png').then(image =>
{
  let pa = new PixelArtist(palettes["RGB"]);
  pa.setOutline(1, "Black", false);
  pa.setFinalFrame(2,3);
  pa.render(image).write('test/duck-outline-thin.png');
});

Jimp.read('pics/duck.png').then(image =>
  {
    let pa = new PixelArtist(palettes["RGB"]);
    pa.setOutline(1, "Black", true);
    pa.setFinalFrame(2,3);
    pa.render(image).write('test/duck-outline-thick.png');
  });

Jimp.read('pics/duck.png').then(image =>
  {
    let pa = new PixelArtist(palettes["RGB"]);
    pa.setOutline(3, "Brown", false);
    pa.setFinalFrame(2,3);
    pa.render(image).write('test/duck-outline-thin-3-pixels.png');
  });
    
Jimp.read('pics/duck.png').then(image =>
  {
    let pa = new PixelArtist(palettes["RGB"]);
    pa.setEdge(1, "Black", false, 0.5);
    pa.setFinalFrame(2,3);
    pa.render(image).write('test/duck-edge-solid.png');
  });

Jimp.read('pics/duck.png').then(image =>
  {
    let pa = new PixelArtist(palettes["RGB"]);
    pa.setEdge(2, "Black", false, -1);
    pa.setFinalFrame(2,3);
    pa.render(image).write('test/duck-edge-shade.png');
  });
        
      
Jimp.read('pics/duck.png').then(image =>
  {
    let pa = new PixelArtist(palettes["AAP64"]);
    pa.setEdge(2, "Black", false, -1);
    pa.setFinalFrame(2,3);
    pa.render(image).write('test/duck-edge-shade-AAP64.png');
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

