import 'mocha';
import {expect} from 'chai';

// import * as fs from 'fs';
import Jimp from 'jimp';

import {Color, Palette, palettes, WrapMode, PixelArtist, matrices} from './pixel-artist';

describe("Color constructor", () =>
{
  let col1:Color = new Color("Light Blue");
  it("Color initialized as 'Light Blue' then reconverted to number", () =>
  {
    expect(col1.toNumber()).to.equal(0xADD8E6FF);
  });

  let col2:Color = new Color("#123456");
  it("Color initialized as '#123456' then reconverted to number", () =>
  {
    expect(col2.toNumber()).to.equal(0x123456FF);
  });
  let col3:Color = new Color(0x89ABCDEF);
  it("Color initialized as 0x89ABCDEF then reconverted to number", () =>
  {
    expect(col3.toNumber()).to.equal(0x89ABCDEF);
  });
  let col4:Color = new Color(col3);
  it("Color initialized as copy of previous one then reconverted to number", () =>
  {
    expect(col4.toNumber()).to.equal(0x89ABCDEF);
  });
});

describe("Color functions", () =>
{
  let col1:Color = new Color("Yellow");
  col1.setAlpha(0x10);
  it("'Yellow' with Alpha set to 0x10", () =>
  {
    expect(col1.toNumber()).to.equal(0xFFFF0010);
  });
  let col2:Color = new Color("Midnight Blue");
  col2.reduceDepth(5, 6, 5);
  it("'Midnight Blue' with reduced depth to RGB565", () =>
  {
    expect(col2.toNumber()).to.equal(0x181870FF);
  });
  let col3:Color = new Color("White Smoke");
  col3.correctGamma(0.3);
  it("'White Smoke' with corrected gamma", () =>
  {
    expect(col3.toNumber()).to.equal(0xFCFCFCFF);
  });
  let col4:Color = new Color("Light Pink");
  it("Distance 'Light Pink' to 'Yellow'", () =>
  {
    expect(col4.distance(col3)).to.be.above(21);
  });
});



// Reads test images
let duck:Jimp, palette:Jimp, marble:Jimp;
let apple:Jimp, wood:Jimp;
async function load()
{
  duck = await Jimp.read("pics/duck.png");
  palette = await Jimp.read("pics/palette.png");
  marble = await Jimp.read("pics/marble.png");
  apple = await Jimp.read("pics/apple.png");
  wood = await Jimp.read("pics/wood.jpg");
} load();

describe("Palette functions", () =>
{
  let pal1:Palette, pal2:Palette, pal3:Palette, pal4:Palette;
  it("Palette with reduced depth only", () =>
  {
    pal1 = new Palette([], 5, 6, 5);
    expect(pal1.colors.size).to.equal(0);
  });

  it("Palette from array", () =>
  {
    pal2 = new Palette([0xFFFFFFFF, "#123456", 0x12345678], 5, 6, 5);
    expect(pal2.colors.size).to.equal(3);
  });

  it("Palette from Jimp object", () =>
  {
    pal3 = new Palette(palette);
    //console.log(pal2.toString());
    expect(pal3.count()).to.equal(27);
  });

  it("Palette from list", () =>
  {
    pal4 = palettes["MSX"];
    expect(pal4.colors.size).to.equal(15);
    //console.log(pal4.toString());
  });

  it("Closest color", () =>
  {
    let col:Color = pal4.getClosestColor(new Color(0x5753e30f));
    expect(col.toNumber()).to.equal(0x5854e0ff);
    //console.log(col.toNumber().toString(16));
  });
});


describe("PixelArtist functions", () =>
{
  let paletteName = "AAP64";
  it("Renders pink-background apple with palette " + paletteName, () =>
  {
    // console.log(entry[0]);
    let pa = new PixelArtist(palettes[paletteName]);
    pa.setTransparency(new Color("#FF00FF"));
    pa.setOutline(1, "Black", true);
    pa.setEdge(3, "White", false, -0.5);
    pa.setDithering(matrices["Bayer8x8"], 0.3);
    pa.setFinalFrame(4,3);
    pa.setWrapMode(WrapMode.Uniform, WrapMode.Uniform,
      WrapMode.Uniform, WrapMode.Uniform, 0xFF00FFFF);
    let res = pa.render(apple);
    res.write("test/apple-" + paletteName + ".png");
    let respal:Palette = new Palette(res);
    expect(respal.count()).lte(palettes[paletteName].count());
  });
});

describe("PixelArtist renders duck with all palettes, edge and outline", () =>
{
  for (let entry of Object.entries(palettes))
    it("1-pixel black outline, 3-pixels shaded orange edge and palette " + entry[0], () =>
    {
      // console.log(entry[0]);
      let pa = new PixelArtist(entry[1]);
      pa.setOutline(1, "Black", false);
      pa.setEdge(3, "Orange", false, -0.5);
      pa.setFinalFrame(4,0);
      pa.setDithering(matrices["Bayer4x4"], 0.8);
      //pa.setWrapMode(WrapMode.Uniform, WrapMode.Uniform, WrapMode.Uniform, WrapMode.Extended);
      let res = pa.render(duck);
      res.write("test/duck-" + entry[0] + "-" + entry[1].count() + ".png");
      let respal:Palette = new Palette(res);
      expect(respal.count()).lte(entry[1].count());
    });

});

