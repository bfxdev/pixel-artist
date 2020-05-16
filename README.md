
# :construction: Pixel Artist - ALPHA :construction:

Create Pixel Art from input pictures

## Introduction

The purpose of this Typescript node.js library is to transform pictures by adding a Pixel-Art touch.

The library has only one dependency on [Jimp](https://www.npmjs.com/package/jimp) (used to import/export picture files).

Try the [test web page](https://bfxdev.github.io/pixel-artist) hosted through GitHub pages to use the features of Pixel Artist without development.

## Features

Different operations are available, which can be combined in a single rendering.

### Arbitrary palettes

All transformations use colors exclusively from an arbitrary palette. The palette can be defined as a list of colors and/or as RGB bit depths.

Some **well-known predefined palettes** are available:

|Name|#Colors|![Reference picture](pics/rgb-reference.png)|
|--|--|--|
|CPC|27|![Example with CPC](pics/rgb-reference-CPC.png)|
|AAP64|64|![Example with AAP64](pics/rgb-reference-AAP64.png)|
|Apple2|15|![Example with Apple2](pics/rgb-reference-Apple2.png)|
|CGA|16|![Example with CGA](pics/rgb-reference-CGA.png)|
|C64|16|![Example with C64](pics/rgb-reference-C64.png)|
|Fantasy24|24|![Example with Fantasy24](pics/rgb-reference-Fantasy24.png)|
|Jewel15|15|![Example with Jewel15](pics/rgb-reference-Jewel15.png)|
|MSX|15|![Example with MSX](pics/rgb-reference-MSX.png)|
|NES|53|![Example with NES](pics/rgb-reference-NES.png)|
|RGB|16777216|![Example with RGB](pics/rgb-reference-RGB.png)|
|RGB332|256|![Example with RGB332](pics/rgb-reference-RGB332.png)|
|RGB444|4096|![Example with RGB444](pics/rgb-reference-RGB444.png)|
|RGB565|65536|![Example with RGB565](pics/rgb-reference-RGB565.png)|
|Spectrum|15|![Example with Spectrum](pics/rgb-reference-Spectrum.png)|
|Steam16|16|![Example with Steam16](pics/rgb-reference-Steam16.png)|
|Sweetie16|16|![Example with Sweetie16](pics/rgb-reference-Sweetie16.png)|
|Tandy|59|![Example with Tandy](pics/rgb-reference-Tandy.png)|
|Teletext|8|![Example with Teletext](pics/rgb-reference-Teletext.png)|
|VIC20|16|![Example with VIC20](pics/rgb-reference-VIC20.png)|

### Outline

An outline can be added around the non-transparent part of the image. The outline has a single color and is always drawn on transparent pixels.

The outline can be defined according to 2 variants. The first variant creates a single-pixel outline:

![duck-outline-thin](pics/duck-outline-thin.png)

The second variant creates a thicker outline (corner pixels are added in the diagonals):

![duck-outline-thick](pics/duck-outline-thick.png)

In addition, the number of layers of such an outline can be set, as  well as the color, e.g. 3 layers on first variant in brown:

![duck-outline-thin-3-pixels](pics/duck-outline-thin-3-pixels.png)

### Edge

An edge is similar to an outline but it is drawn on the interior, non-transparent pixels:

![duck-edge-solid](pics/duck-edge-solid.png)



![duck-edge-solid](pics/duck-edge-shade.png)


![duck-edge-solid](pics/duck-edge-shade-AAP64.png)



## API

The complete API of the library is available in [doc](doc). The main classes are:

- [`Color`](doc/classes/_pixel_artist_.color.html): RGBA color in sRGB space with CIELAB distance
- [`Palette`](doc/classes/_pixel_artist_.palette.html): Palette based on bit depth and/or list of colors
- [`PixelArtist`](doc/classes/_pixel_artist_.pixelartist.html): Picture transformation object


## Usage in node.js with Typescript

The library is distributed primarily as an CommonJS module in an `npm` package. First of all, install the module in your project:

`npm install pixel-art --save` to use the library as part of the project at run-time
  or
`npm install pixel-art --save-dev` to use it as development dependency

A typical Typescript usage looks like:

```typescript
import Jimp from 'jimp';
import {PixelArtist, palettes} from 'pixel-artist';

Jimp.read('source.png').then(image =>
{
  let pa = new PixelArtist(palettes["AAP64"]);
  pa.setOutline(1, "Black", false);
  pa.render(image).write('result.png');
});
```

## Usage in a web page

A webpack bundle is provided in [dist](dist) to used directly with a \<script\> tag:

```html
<!DOCTYPE html>
<html lang="en">
  <head><script src="dist/pixel-artist.bundle.js"></script></head>
  <body>
    <script>
Jimp.read("pics/duck.png").then(function (img)
{
  // Processes picture
  var pa = (new pixart.PixelArtist(pixart.palettes["AAP64"]));
  pa.setOutline(1, "Black", false);
  pa.setFinalFrame(2);
  let res = pa.render(img);

  // Adds processed picture to end of document
  res.getBase64(Jimp.AUTO, function (err, src)
  {
    var elem = document.createElement("img");
    elem.setAttribute("src", src);
    document.body.appendChild(elem);
  });
});
    </script>
  </body>
</html>
```

## Compilation

To build the library, start by cloning the repository:

`git clone https://github.com/bfxdev/pixel-artist.git`

Change to directory `pixel-artist` and then download the dependencies:

`npm install`

Then start the compilation:

`npm start`

Several targets defined in `package.json` can be chosen to build only a part of the library.

During the compilation, the following folder are used:

- `lib`: CommonJS modules
- `es6`: ES6 modules for packaging
- `dist`: Packaged modules
- `doc`: Documentation generated by `typedoc`


