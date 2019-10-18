
import Jimp from 'jimp';

/**
 * Map of CSS/X11 colors all lowercase and without space character
 */
const webColors:{[key: string]: string} = {"aliceblue" : "#F0F8FF", "antiquewhite" : "#FAEBD7",
"aqua" : "#00FFFF", "aquamarine" : "#7FFFD4", "azure" : "#F0FFFF", "beige" : "#F5F5DC", "bisque" : "#FFE4C4",
"black" : "#000000", "blanchedalmond" : "#FFEBCD", "blue" : "#0000FF", "blueviolet" : "#8A2BE2",
"brown" : "#A52A2A", "burlywood" : "#DEB887", "cadetblue" : "#5F9EA0", "chartreuse" : "#7FFF00",
"chocolate" : "#D2691E", "coral" : "#FF7F50", "cornflowerblue" : "#6495ED", "cornsilk" : "#FFF8DC",
"crimson" : "#DC143C", "cyan" : "#00FFFF", "darkblue" : "#00008B", "darkcyan" : "#008B8B",
"darkgoldenrod" : "#B8860B", "darkgray" : "#A9A9A9", "darkgreen" : "#006400", "darkkhaki" : "#BDB76B",
"darkmagenta" : "#8B008B", "darkolivegreen" : "#556B2F", "darkorange" : "#FF8C00", "darkorchid" : "#9932CC",
"darkred" : "#8B0000", "darksalmon" : "#E9967A", "darkseagreen" : "#8FBC8F", "darkslateblue" : "#483D8B",
"darkslategray" : "#2F4F4F", "darkturquoise" : "#00CED1", "darkviolet" : "#9400D3", "deeppink" : "#FF1493",
"deepskyblue" : "#00BFFF", "dimgray" : "#696969", "dodgerblue" : "#1E90FF", "firebrick" : "#B22222",
"floralwhite" : "#FFFAF0", "forestgreen" : "#228B22", "fuchsia" : "#FF00FF", "gainsboro" : "#DCDCDC",
"ghostwhite" : "#F8F8FF", "gold" : "#FFD700", "goldenrod" : "#DAA520", "gray" : "#808080", "green" : "#008000",
"greenyellow" : "#ADFF2F", "honeydew" : "#F0FFF0", "hotpink" : "#FF69B4", "indianred" : "#CD5C5C",
"indigo" : "#4B0082", "ivory" : "#FFFFF0", "khaki" : "#F0E68C", "lavender" : "#E6E6FA", "lavenderblush" : "#FFF0F5",
"lawngreen" : "#7CFC00", "lemonchiffon" : "#FFFACD",
"lightblue" : "#ADD8E6", "lightcoral" : "#F08080", "lightcyan" : "#E0FFFF", "lightgoldenrodyellow" : "#FAFAD2",
"lightgreen" : "#90EE90", "lightgrey" : "#D3D3D3", "lightpink" : "#FFB6C1", "lightsalmon" : "#FFA07A",
"lightseagreen" : "#20B2AA", "lightskyblue" : "#87CEFA", "lightslategray" : "#778899", "lightsteelblue" : "#B0C4DE",
"lightyellow" : "#FFFFE0", "lime" : "#00FF00", "limegreen" : "#32CD32", "linen" : "#FAF0E6", "magenta" : "#FF00FF",
"maroon" : "#800000", "mediumaquamarine" : "#66CDAA", "mediumblue" : "#0000CD", "mediumorchid" : "#BA55D3",
"mediumpurple" : "#9370DB", "mediumseagreen" : "#3CB371", "mediumslateblue" : "#7B68EE",
"mediumspringgreen" : "#00FA9A", "mediumturquoise" : "#48D1CC", "mediumvioletred" : "#C71585",
"midnightblue" : "#191970", "mintcream" : "#F5FFFA", "mistyrose" : "#FFE4E1", "moccasin" : "#FFE4B5",
"navajowhite" : "#FFDEAD", "navy" : "#000080", "oldlace" : "#FDF5E6", "olive" : "#808000", "olivedrab" : "#6B8E23",
"orange" : "#FFA500", "orangered" : "#FF4500", "orchid" : "#DA70D6", "palegoldenrod" : "#EEE8AA",
"palegreen" : "#98FB98", "paleturquoise" : "#AFEEEE", "palevioletred" : "#DB7093", "papayawhip" : "#FFEFD5",
"peachpuff" : "#FFDAB9", "peru" : "#CD853F", "pink" : "#FFC0CB", "plum" : "#DDA0DD", "powderblue" : "#B0E0E6",
"purple" : "#800080", "red" : "#FF0000", "rosybrown" : "#BC8F8F", "royalblue" : "#4169E1", "saddlebrown" : "#8B4513",
"salmon" : "#FA8072", "sandybrown" : "#F4A460", "seagreen" : "#2E8B57", "seashell" : "#FFF5EE", "sienna" : "#A0522D",
"silver" : "#C0C0C0", "skyblue" : "#87CEEB", "slateblue" : "#6A5ACD", "slategray" : "#708090", "snow" : "#FFFAFA",
"springgreen" : "#00FF7F", "steelblue" : "#4682B4", "tan" : "#D2B48C", "teal" : "#008080", "thistle" : "#D8BFD8",
"tomato" : "#FF6347", "turquoise" : "#40E0D0", "violet" : "#EE82EE", "wheat" : "#F5DEB3", "white" : "#FFFFFF",
"whitesmoke" : "#F5F5F5", "yellow" : "#FFFF00", "yellowgreen" : "#9ACD32"};


/**
 * RGBA color in sRGB space with CIELAB distance
 */
export class Color
{
  /**
   * Gamma-encoded red component from 0 to 255
   */
  R:number=0;

  /**
   * Gamma-encoded green component from 0 to 255
   */
  G:number=0;

  /**
   * Gamma-encoded blue component from 0 to 255
   */
  B:number=0;

  /**
   * Not gamma-encoded alpha component from 0 to 255
   */
  A:number=0;

  /**
   * L component from 0 to around 100 (CIELAB color space)
   */
  L: number = 0;

  /**
   * a component (CIELAB color space)
   */
  a: number = 0;

  /**
   * b component (CIELAB color space)
   */
  b: number = 0;

  /**
   * Initializes this object with the given parameter or set to transparent black if no parameter is given
   * @param color Either a **32-bits number** (RGBA values), a web color string e.g. "Light Blue"/"lightblue" or
   * "#123456" (non-given alpha set to opaque) or another Color object
   */
  constructor(color?:number|string|Color)
  {
    if (color !== undefined)
      this.set(color);
  }

  /**
   * Sets the internal components according to the parameter
   * @param color Either a **32-bits number** (RGBA values), a web color string e.g. "Light Blue"/"lightblue" or
   * "#123456" (non-given alpha set to opaque) or another RGB object
   * @returns This object
   */
  set(color:number|string|Color):Color
  {
    // Copies input object
    if (color instanceof Color)
      return Object.assign(this, color as Color);

    // Sets this object from a number as defined in Jimp (32 bits RGBA)
    else if (typeof color === 'number')
    {
      this.setAlpha((color as number) % 256);
      return this.setRGB((color as number / 256/256/256) & 0xFF,
                         (color as number / 256/256    ) & 0xFF,
                         (color as number / 256        ) & 0xFF);
    }
    // Uses a named web color
    else if (typeof color === 'string')
    {
      // Transforms string to make it comparable to keys in map
      let s:string = (color as string).replace(" ", "").toLowerCase();

      // Gets the color from the dictionary of web colors if found
      if (webColors.hasOwnProperty(s))
        s = webColors[s];

      // Decodes web color or throws exception
      if(s.length==7 && s[0]=="#")
      {
        // Converts from hexadecimal values to opaque value
        let R = parseInt((s[1]+s[2]), 16);
        let G = parseInt((s[3]+s[4]), 16);
        let B = parseInt((s[5]+s[6]), 16);

        // Checks that the conversion was possible
        if(isNaN(R) || isNaN(G) || isNaN(B))
          throw Error(`Could not convert "${s}"`);
        else
        {
          this.setAlpha(255);
          return this.setRGB(R, G, B);
        }
      }
      else
        throw Error(`Not a web color "${s}"`);
    }

    // Just to please the compiler, normally this line is never reached
    return this;
  }

  /**
   * Sets the components after clamping value to 0..255
   * @param R Gamma-encoded red component from 0 to 255
   * @param G Gamma-encoded green component from 0 to 255
   * @param B Gamma-encoded blue component from 0 to 255
   * @returns This object
   */
  setRGB(R:number, G:number, B:number): Color
  {
    this.R = Math.min(255, Math.max(0, Math.round(R)));
    this.G = Math.min(255, Math.max(0, Math.round(G)));
    this.B = Math.min(255, Math.max(0, Math.round(B)));
    return this.updateFromRGB();
  }

  /**
   * Sets the alpha component
   * @param A Linear alpha component from 0 to 255
   * @returns This object
   */
  setAlpha(A:number): Color
  {
    this.A = Math.min(255, Math.max(0, Math.round(A)));
    return this;
  }

  /**
   * Returns a 32-bits integer color computed from the current RGBA values
   * @returns Color as a 32-bits number
   */
  toNumber(): number
  {
    return ((this.R*256 + this.G)*256 + this.B)*256 + this.A;
  }

  /**
   * Returns the current color as a web color string
   * @returns Color in the form #ABCDEF
   */
  toString(): string
  {
    return "#" + (this.R<16?"0":"") + this.R.toString(16) +
                 (this.G<16?"0":"") + this.G.toString(16) +
                 (this.B<16?"0":"") + this.B.toString(16);
  }

  /**
   * Mixes with the given color including Alpha channels
   * @param col Color to mix
   * @param ratio Mix factor from 0.0 (this color) to 1.0 (color given as argument)
   * @returns This object
   */
  mix(col:Color, ratio:number=0.5):Color
  {
    this.setRGB(this.R*(1-ratio)+col.R*ratio,
                this.G*(1-ratio)+col.G*ratio,
                this.B*(1-ratio)+col.B*ratio); 
    return this.setAlpha(this.A*(1-ratio)+col.A*ratio);
  }

  /**
   * Gamma-encodes given values and sets the color components (keeps alpha)
   * @param red   Linear red component from 0.0 to 1.0
   * @param green Linear green component from 0.0 to 1.0
   * @param blue  Linear blue component from 0.0 to 1.0
   * @param gamma Alpha exponent (around 2.2), or standard PNG/sRGB gamma-encoding if not given
   * @returns This object
   */
  setLinearRGB(red:number, green:number, blue:number, gamma?:number): Color
  {
    return this.setRGB(255*this.encodeGamma(red, gamma),
                       255*this.encodeGamma(green, gamma),
                       255*this.encodeGamma(blue, gamma));
  }

  /**
   * Gamma-decode given value
   * @param val   The value to decode
   * @param gamma Alpha exponent (around 2.2), or standard PNG/sRGB gamma-encoding if not given
   */
  protected decodeGamma(val:number, gamma?:number): number
  {
    if(gamma === undefined)
      return val<=0.04045 ? val/12.92 : Math.pow((val+0.055)/1.055, 2.4);
    else
      return Math.pow(val, gamma);
  }

  /**
   * Gamma-encode given value
   * @param val   The value to encode
   * @param gamma Alpha exponent (around 2.2), or standard PNG/sRGB gamma-encoding if not given
   */
  protected encodeGamma(val:number, gamma?:number): number
  {
    if(gamma === undefined)
      return val<=0.0031308 ? val*12.92 : 1.055*Math.pow(val, 1/2.4)-0.055;
    else
      return Math.pow(val, 1/gamma);
  }

  /**
   * Corrects the gamma encoding on the internal component values (keeps alpha)
   * @param exponent The exponent factor to gamma, 1.0 has no effect, more than 1.0 for darker color,
   *                 less than 1.0 for lighter color
   */
  correctGamma(exponent:number): Color
  {
    return this.setRGB(255*Math.pow(this.R/255, exponent),
                       255*Math.pow(this.G/255, exponent),
                       255*Math.pow(this.B/255, exponent));
  }

   /**
   * Reduces the bit depth of the RGB values, i.e. divides each value, rounds it
   * then shifts it back to the left
   * @param redDepth   Number of bits for red component
   * @param greenDepth Number of bits for green component
   * @param blueDepth  Number of bits for blue component
   */
  reduceDepth(redDepth:number, greenDepth:number, blueDepth:number): Color
  {
    this.R = Math.min(255, (Math.round( this.R / (1<<(8-redDepth))   << (8-redDepth))));
    this.G = Math.min(255, (Math.round( this.G / (1<<(8-greenDepth)) << (8-greenDepth))));
    this.B = Math.min(255, (Math.round( this.B / (1<<(8-blueDepth))  << (8-blueDepth))));
    return this;
  }

  /**
   * Called after any modification of the internal RGB components to update CIELAB members
   */
  protected updateFromRGB(gamma?:number): Color
  {
    // Gamma transformation
    let r:number = this.decodeGamma(this.R/255, gamma);
    let g:number = this.decodeGamma(this.G/255, gamma);
    let b:number = this.decodeGamma(this.B/255, gamma);

    // Matrix transformation and scale to around 100
    let X:number = 100 * ( r * 0.4124 + g * 0.3576 + b * 0.1805 );
    let Y:number = 100 * ( r * 0.2126 + g * 0.7152 + b * 0.0722 );
    let Z:number = 100 * ( r * 0.0193 + g * 0.1192 + b * 0.9504 );

    // XYZ reference as D65 for observer at 2° (daylight, sRGB)
    let x:number = X /  95.0489;
    let y:number = Y / 100.0;
    let z:number = Z / 108.8840;

    // Adapt values, with linear part to prevent infinite slope at zero
    x = x <= 0.008856 ? 7.787*x + 4/29 : Math.pow(x, 1/3);
    y = y <= 0.008856 ? 7.787*y + 4/29 : Math.pow(y, 1/3);
    z = z <= 0.008856 ? 7.787*z + 4/29 : Math.pow(z, 1/3);

    // Final values
    this.L = 116*y - 16;
    this.a = 500*(x - y);
    this.b = 200*(y - z);

    return this;
  }

  /**
   * Distance to another color according to CIE94 in CIELAB color space
   * Remark: a distance of 2.3 corresponds to a JND (Just Noticeable Difference)
   */
  distance(col:Color): number
  {
    // Prepares helper values
    let dL:number = this.L - col.L;
    let C1:number = Math.sqrt(this.a*this.a + this.b*this.b);
    let C2:number = Math.sqrt(col.a*col.a + col.b*col.b);
    let dC:number = C1 - C2;
    let da:number = this.a - col.a;
    let db:number = this.b - col.b;
    let dH:number = Math.sqrt(da*da + db*db - dC*dC);

    // Returns final distance
    return Math.sqrt( dL*dL + dC/(1+0.045*C1)*dC/(1+0.045*C1) + dH/(1+0.015*C1)*dH/(1+0.015*C1));
  }
}

export interface ColorMatch
{
  closestColor:Color;
  closestDistance:number;
  closestIndex:number;
  mixColor:Color;
  mixDistance:number;
  mixIndex:number;
}

/**
 * Palette based on bit depth and/or list of colors
 */
export class Palette
{
  /**
   * Bit depth of red component
   */
  redDepth:number = 8;

  /**
   * Bit depth of green component
   */
  greenDepth:number = 8;
 
  /**
   * Bit depth of blue component
   */
  blueDepth:number = 8;

  /**
   * List of colors (if empty, bit depths used only)
   */
  colors:Map<number, Color> = new Map<number, Color>();

  constructor(colors?:Jimp|(number|string)[], redDepth?:number, greenDepth?:number, blueDepth?:number)
  {
    // Retrieves given depths
    if (redDepth !== undefined)
      this.redDepth = redDepth;
    if (greenDepth !== undefined)
      this.greenDepth = greenDepth;
    if (blueDepth !== undefined)
      this.blueDepth = blueDepth;

    // Retrieves given colors
    if (colors !== undefined)
      this.setColors(colors);
  }

  setColors(colors:Jimp|(number|string)[]):Palette
  {
    // Empties list of colors
    this.colors = new Map<number, Color>();
  
    // Imports Image object
    if (colors instanceof Jimp)
    {
      for (let y=0; y<(colors as Jimp).getHeight(); y++)
        for (let x=0; x<(colors as Jimp).getWidth(); x++)
        {
          let c:Color = new Color((colors as Jimp).getPixelColor(x,y));
          c.reduceDepth(this.redDepth, this.greenDepth, this.blueDepth);
          c.setAlpha(0xFF);
          this.colors.set(c.toNumber(), c);
        }
    }
    // Imports array of strings or numbers
    else if ((colors instanceof Array) && (colors.length>0))
      for (let i=0; i<colors.length; i++)
      {
        let c:Color = new Color(colors[i]);
        c.reduceDepth(this.redDepth, this.greenDepth, this.blueDepth);
        this.colors.set(c.toNumber(), c);
      }

    return this;
  }

  getClosestColor(source:Color, destination?:Color): Color
  {
    // Creates color if no destination given
    let res:Color = (destination===undefined ? new Color() : destination);

    // Returns depth-reduced color if no palette is defined
    if (!this.isDiscrete())
    {
      res.set(source);
      res.reduceDepth(this.redDepth, this.greenDepth, this.blueDepth);
    }
    // Returns reference on Color object in Palette (use with caution!)
    else
    {
      let mindist:number = 1e50;
      let col:Color;
      for (let c of Array.from(this.colors.values()))
      {
        let dist:number = source.distance(c);
        if (dist<mindist)
        {
          mindist = dist;
          res.set(c);
        }
      }
    }

    return res;
  }

  getColorMatch(color:Color):ColorMatch
  {
    // Determines the closest and mix colors with discrete palettes
    if (this.isDiscrete())
    {
      // Determines color with minimum distances
      let closestDistance:number = 1e50, closestIndex:number=-1, closestColor:Color = new Color();
      let index:number = 0;
      for (let c of Array.from(this.colors.values()))
      {
        let dist:number = color.distance(c);
        if (dist < closestDistance)
        {
          closestDistance = dist;
          closestIndex = index;
          closestColor.set(c);
          closestColor.setAlpha(color.A);
        }
        index++;
      }

      
      // Determines "mix color", i.e. color such that the result of the mix of it with the closest
      //  color is the closest to the original color
      let mixDistance:number = 1e50, mixIndex:number=-1, mixColor:Color = new Color();
      index = 0;
      for (let c of Array.from(this.colors.values()))
      {
        let col:Color = (new Color(closestColor)).mix(c);
        let dist:number = col.distance(color);
        if (dist < mixDistance)
        {
          mixDistance = dist;
          mixIndex = index;
          mixColor.set(c);
          mixColor.setAlpha(color.A);
        }
        index++;
      }

      return {closestColor:closestColor, closestDistance:closestDistance, closestIndex:closestIndex,
              mixColor:mixColor, mixDistance:mixDistance, mixIndex:mixIndex}
      }
      else
      {
        let closestColor:Color = (new Color(color)).reduceDepth(this.redDepth, this.greenDepth, this.blueDepth);
        let mixColor:Color = (new Color(color)).setRGB(2*color.R-closestColor.R,
                                                       2*color.G-closestColor.G,
                                                       2*color.B-closestColor.B);
        mixColor.reduceDepth(this.redDepth, this.greenDepth, this.blueDepth);

        return {closestColor:closestColor, closestDistance:color.distance(closestColor), closestIndex:0,
                mixColor:mixColor, mixDistance:color.distance(mixColor), mixIndex:0};
      }
  }

  /**
   * Returns true if the palette contains a list of discrete colors, false if the
   * colors are determined only by the bit depths
   */
  isDiscrete():boolean
  {
    return this.colors.size>0;
  }


  /**
   * Returns the number of colors available in the palette, i.e. number of discrete colors
   * or theoretical number of colors
   * @returns Number of available colors in palette
   */
  count():number
  {
    if (this.isDiscrete())
      return this.colors.size;
    else
      return (1<<this.redDepth)*(1<<this.greenDepth)*(1<<this.blueDepth);
  }

  toString():string
  {
    let res:string = "";
    for (let c of Array.from(this.colors.values()))
      res += (res.length>0?", ":"") + "0x" + c.toNumber().toString(16);
    return "[" + res + "]";
  }

}

//export const palettes:Map<string, Palette> = new Map<string, Palette>(Object.entries({
export const palettes:{[key: string]: Palette} = {
  "CPC" : new Palette([0xff, 0x80ff, 0xf8ff, 0x800000ff, 0x800080ff, 0x8000f8ff, 0xf80000ff, 0xf80080ff,
    0xf800f8ff, 0x8000ff, 0x8080ff, 0x80f8ff, 0x808000ff, 0x808080ff, 0x8080f8ff,
    0xf88000ff, 0xf88080ff, 0xf880f8ff, 0xfc00ff, 0xfc80ff, 0xfcf8ff, 0x80fc00ff,
    0x80fc80ff, 0x80fcf8ff, 0xf8fc00ff, 0xf8fc80ff, 0xf8fcf8ff]),
  "AAP64" : new Palette([0x408ff, 0x101010ff, 0x381420ff, 0x701428ff, 0xb02028ff, 0xd83c20ff, 0xf86808ff,
    0xf8a018ff, 0xf8d440ff, 0xf8fc40ff, 0xd0f060ff, 0x98d840ff, 0x58c030ff, 0x10a028ff, 0x187838ff,
    0x205038ff, 0x102020ff, 0x103460ff, 0x285cc0ff, 0x209cd8ff, 0x20d4c0ff, 0xa0fcd8ff, 0xf8fcf8ff,
    0xf8f0c0ff, 0xf8d4b8ff, 0xf0a090ff, 0xe86870ff, 0xb84898ff, 0x783880ff, 0x403050ff, 0x202030ff,
    0x201c18ff, 0x302828ff, 0x704038ff, 0xb87440ff, 0xd8a460ff, 0xf0d098ff, 0xd8e0e8ff, 0xb0b8d0ff,
    0x8890a8ff, 0x687488ff, 0x485460ff, 0x303840ff, 0x402430ff, 0x583038ff, 0x885050ff, 0xb87468ff,
    0xe8b4a0ff, 0xe0e4f8ff, 0xb8bcf8ff, 0x8098e0ff, 0x588cb8ff, 0x407c80ff, 0x206448ff, 0x308460ff,
    0x58ac88ff, 0x90dcb8ff, 0xc8f4e0ff, 0xe0d0a8ff, 0xc0b088ff, 0xa08460ff, 0x786450ff, 0x584c40ff,
    0x403830ff]),
  "Apple2" : new Palette([0xff, 0x682840ff, 0x403478ff, 0xd83cf0ff, 0x105440ff, 0x808080ff,
    0x2094f0ff, 0xb8b4f8ff, 0x404800ff, 0xd86808ff, 0xe8a8b8ff, 0x20c008ff, 0xb8c880ff,
    0x90d4b8ff, 0xf8fcf8ff]),
  "CGA" : new Palette([0xff, 0xa8ff, 0xa800ff, 0xa8a8ff, 0xa80000ff, 0xa800a8ff, 0xa85400ff,
    0xa8a8a8ff, 0x505450ff, 0x5054f8ff, 0x50fc50ff, 0x50fcf8ff, 0xf85450ff, 0xf854f8ff,
    0xf8fc50ff, 0xf8fcf8ff]),
  "C64" : new Palette([0xff, 0xf8fcf8ff, 0x883830ff, 0x60b4b8ff, 0x883c90ff, 0x50a048ff,
    0x403088ff, 0xb8cc70ff, 0x885428ff, 0x504000ff, 0xb86860ff, 0x505050ff, 0x787878ff,
    0x90e088ff, 0x7868c0ff, 0x989c98ff]),
  "Fantasy24" : new Palette([0x182408ff, 0x385418ff, 0xa08c20ff, 0xe8ac28ff, 0xe8d8a0ff,
    0xa85c18ff, 0x183c38ff, 0xe86828ff, 0xe8b470ff, 0xa06040ff, 0x703420ff, 0x704010ff,
    0x281c08ff, 0x382818ff, 0x684c38ff, 0x907c68ff, 0x206468ff, 0xe83808ff, 0x402008ff,
    0x389c98ff, 0x981808ff, 0x301408ff, 0x500c08ff, 0x300c08ff]),
  "Jewel15" : new Palette([0x301c28ff, 0x602430ff, 0xb82818ff, 0xd06810ff, 0xf0c438ff,
    0xf0e898ff, 0xd8b478ff, 0xb87860ff, 0x784068ff, 0x506090ff, 0x488ca8ff, 0x48c0b0ff,
    0x70e078ff, 0x7080a0ff, 0x98acb8ff]),
  "MSX" : new Palette([0xff, 0x38b848ff, 0x70d078ff, 0x5854e0ff, 0x8074f0ff, 0xb85c50ff,
    0x60d8e8ff, 0xd86458ff, 0xf88878ff, 0xc8c058ff, 0xd8d080ff, 0x38a040ff, 0xb064b0ff,
    0xc8ccc8ff, 0xf8fcf8ff]),
  "NES" : new Palette([0x484848ff, 0x858ff, 0x878ff, 0x870ff, 0x380050ff, 0x580010ff,
    0x580000ff, 0x400000ff, 0x100000ff, 0x1800ff, 0x1c00ff, 0x1820ff, 0xff, 0xa0a0a0ff,
    0x48b8ff, 0x830e0ff, 0x5818d8ff, 0xa008a8ff, 0xd00058ff, 0xd01000ff, 0xa02000ff,
    0x604000ff, 0x85800ff, 0x6800ff, 0x6810ff, 0x6070ff, 0xf8f8f8ff, 0x20a0f8ff, 0x5078f8ff,
    0x9868f8ff, 0xf868f8ff, 0xf870b0ff, 0xf87068ff, 0xf88018ff, 0xc09800ff, 0x70b000ff, 0x28c020ff,
    0xc870ff, 0xc0d0ff, 0x282828ff, 0xa0d8f8ff, 0xb0c0f8ff, 0xd0b8f8ff, 0xf8c0f8ff, 0xf8c0e0ff,
    0xf8c0c0ff, 0xf8c8a0ff, 0xe8d888ff, 0xc8e090ff, 0xa8e8a0ff, 0x90e8c8ff, 0x90e0e8ff, 0xa8a8a8ff]),
  "RGB" :    new Palette([], 8, 8, 8),
  "RGB332" : new Palette([], 3, 3, 2),
  "RGB444" : new Palette([], 4, 4, 4),
  "RGB565" : new Palette([], 5, 6, 5),
  "Spectrum" : new Palette([0xff, 0xc0ff, 0xc00000ff, 0xc000c0ff, 0xc000ff, 0xc0c0ff,
    0xc0c000ff, 0xc0c0c0ff, 0xf8ff, 0xf80000ff, 0xf800f8ff, 0xfc00ff, 0xfcf8ff,
    0xf8fc00ff, 0xf8fcf8ff]),
  "Steam16" : new Palette([0x203820ff, 0x386048ff, 0x487450ff, 0xa09c78ff, 0x707448ff, 0x705c48ff,
    0x603838ff, 0x382030ff, 0x100c18ff, 0x282038ff, 0x403860ff, 0x485070ff, 0x607088ff,
    0x7894a0ff, 0xa0b8b8ff, 0xc0d0c8ff]),
  "Sweetie16" : new Palette([0x181c28ff, 0x582458ff, 0xb03c50ff, 0xe87c50ff, 0xf8cc70ff,
    0xa0f070ff, 0x38b460ff, 0x207078ff, 0x283468ff, 0x385cc8ff, 0x40a4f0ff, 0x70ecf0ff,
    0xf0f4f0ff, 0x90b0c0ff, 0x506c80ff, 0x303c50ff]),
  "Tandy" : new Palette([0xff, 0x780038ff, 0x880010ff, 0x881800ff, 0xd05838ff, 0x282c28ff,
    0x6058ff, 0x586000ff, 0x7c38ff, 0x307c00ff, 0x8818ff, 0x88c00ff, 0x58d030ff, 0x3878ff,
    0x380078ff, 0x1488ff, 0x180088ff, 0x7824c0ff, 0x18ac98ff, 0x60f4d8ff, 0x600060ff,
    0xa01ca8ff, 0xe060f0ff, 0xa0a018ff, 0xf0e060ff, 0xc8fc60ff, 0x787878ff, 0xf8d4d0ff,
    0xf8fcf8ff, 0x783c00ff, 0xc07c20ff, 0x80c020ff, 0xd03460ff, 0x20c470ff, 0x38d058ff,
    0x3060c8ff, 0x80fc90ff, 0x68fcb0ff, 0x60d4f8ff, 0x78acf8ff, 0x583cd0ff, 0xf864d0ff,
    0xc02088ff, 0xd0d4f8ff, 0xd0fcd0ff, 0xb8f8f8ff, 0xf8fcb8ff, 0xf0fcb8ff, 0xa8fcf8ff,
    0xf8b8f8ff, 0xf89488ff, 0xf8fca8ff, 0xf8a8f8ff, 0xf8bc68ff, 0x9088f8ff, 0xf878a8ff,
    0xa0fc78ff, 0xb86cf8ff, 0x2088b8ff]),
  "Teletext" : new Palette([0xff, 0xf8ff, 0xf80000ff, 0xf800f8ff, 0xfc00ff, 0xfcf8ff,
    0xf8fc00ff, 0xf8fcf8ff]),
  "VIC20" : new Palette([0xff, 0xf8fcf8ff, 0x782820ff, 0x80d4d8ff, 0xa85cb0ff,
    0x50a048ff, 0x403088ff, 0xb8cc70ff, 0xa87448ff, 0xe8b488ff, 0xb86860ff, 0xc0fcf8ff,
    0xe89cf0ff, 0x90e088ff, 0x8070c8ff, 0xf8fcb0ff])
    };

class Pixel
{
  /**
   * Original color in source picture
   */
  original:Color = new Color();

  /**
   * Information returned by Palette.getColorMatch
   */
  match:ColorMatch = {closestColor:new Color(), closestDistance:1e6, closestIndex:0,
                      mixColor:new Color(), mixDistance:1e6, mixIndex:0};

  /**
   * Set to true if the pixel is on a transparent background, for edge detection
   */
  isTransparent:boolean = false;

  /**
   * Set to true if the pixel is on the edge (inside)
   */
  isEdge:boolean = false;

  /**
   * Set to true if the pixel is on the outline (outside)
   */
  isOutline:boolean = false;

  /**
   * Layer on which the edge/outline was detected
   */
  layer:number = 0;

  /**
   * Outline/Edge final color
   */
  frontier:Color = new Color();

  /**
   * Oriented colors corresponding to the surrounding pixels
   */
  colors:OrientedColor[] = [];

  /**
   * Dithered color
   */
  dithered:Color = new Color();

  /**
   * Final color to be exported as Jimp object
   */
  final:Color = new Color();

  /**
   * Initializes object with default values
   * @param original The original color given as Color/string/number (typically from Jimp object)
   */
  constructor(original:string|number|Color)
  {
    this.original.set(original);
  }

}

export const matrices:{[key: string]: number[][]} = {
  "Bayer2x2": [[1/4, 2/4], [3/4, 0]],
  "Bayer4x4": [[5/16, 9/16, 6/16, 10/16], [13/16, 1/16, 14/16, 2/16],
               [7/16, 11/16, 4/16, 8/16], [15/16, 3/16, 12/16, 0]],
  "Bayer8x8": [[21/64, 37/64, 25/64, 41/64, 22/64, 38/64, 26/64, 42/64],
               [53/64, 5/64, 57/64, 9/64, 54/64, 6/64, 58/64, 10/64],
               [29/64, 45/64, 17/64, 33/64, 30/64, 46/64, 18/64, 34/64],
               [61/64, 13/64, 49/64, 1/64, 62/64, 14/64, 50/64, 2/64],
               [23/64, 39/64, 27/64, 43/64, 20/64, 36/64, 24/64, 40/64], 
               [55/64, 7/64, 59/64, 11/64, 52/64, 4/64, 56/64, 8/64],
               [31/64, 47/64, 19/64, 35/64, 28/64, 44/64, 16/64, 32/64],
               [63/64, 15/64, 51/64, 3/64, 60/64, 12/64, 48/64, 0]]
};

/**
 * Defines a type of virtual surrounding of the image:
 * - [[Uniform]]  for a constant uniform color
 * - [[Tiled]]    for wrapping infinitely the image
 * - [[Extended]] to use the nearest pixel color on the edge of the image
 */
export enum WrapMode {Uniform='U', Tiled='T', Extended='E'}

// export enum OutlineMode {None, Inside, Outside, Both, Optimized}

/**
 * Used internally to map colors and deltas
 */
interface OrientedColor
{
  dx:number;
  dy:number;
  color:Color;
}

/**
 * Used internally to store data related to outline and edge
 */
interface Frontier
{
  width:number;
  colors:OrientedColor[];
}

export class PixelArtist
{
  /**
   * Mandatory palette object
   */
  protected palette:Palette;

  /**
   * Width of the work array
   */
  protected width:number = 0;

  /**
   * Height of the work array
   */
  protected height:number = 0;

  /**
   * Work array
   */
  protected image:Pixel[][] = [];

  /**
   * Transparency level (from 0.0 to 1.0) to determine if pixel is considered transparent,
   * to be adjusted for half-transparent pictures, or Color considered transparent
   */
  protected transparency:number|Color = 0.5;

  /**
   * Outline related information (line drawn outside on transparent areas)
   */
  protected outline:Frontier = {width:0, colors:[]};

  /**
   * Edge related information (line drawn inside on de edges of the non-transparent areas)
   */
  protected edge:Frontier = {width:0, colors:[]};

  /**
   * Factor to mix colors of the edge
   */
  protected edgeMixRatio:number = 0.5;

  /**
   * Wrap mode for top edge
   */
  protected wrapModeTop:WrapMode = WrapMode.Uniform;

  /**
   * Wrap mode for right edge
   */
  protected wrapModeRight:WrapMode = WrapMode.Uniform;

  /**
   * Wrap mode for bottom edge
   */
  protected wrapModeBottom:WrapMode = WrapMode.Uniform;

  /**
   * Wrap mode for left edge
   */
  protected wrapModeLeft:WrapMode = WrapMode.Uniform;

  /**
   * Pixel with uniform color if necessary for the wrap mode, default transparent black
   */
  protected wrapUniformPixel:Pixel = new Pixel(0);

  protected finalScale:number = 1;
  protected finalBorder:number = 0;

  protected ditheringMatrix:number[][] = [];
  protected ditheringLevel:number = 0;

  /**
   * Initializes object with default value, no allocated work area
   * @param palette The mandatory palette to take colors from
   */
  constructor(palette:Palette)
  {
    this.palette = palette;
  }

  /**
   * Imports a picture into the work area (called by render())
   * @param source The source picture as a Jimp object
   */
  protected import(source:Jimp)
  {
    // Stores image dimensions
    this.width = source.getWidth();
    this.height = source.getHeight();

    // Allocates new work structure
    this.image = new Array<Array<Pixel>>(this.width);
    for (let x=0;x<this.width;x++)
    {
      this.image[x] = new Array<Pixel>(this.height);

      // Fills line with new Pixel objects initialized from Jimp color 32-bits numbers
      for (let y=0; y<this.height; y++)
        this.image[x][y] = new Pixel(source.getPixelColor(x, y));
    }
  }

  /**
   * Returns the pixel object according to the defined wrap modes
   * @param x X coordinate of the pixel, possibly outside the bounds of the image
   * @param y Y coordinate of the pixel, possibly outside the bounds of the image
   * @returns Reference to a pixel object on the work area or the uniform color
   */
  protected getPixel(x:number, y:number): Pixel
  {
    // Normal case: coordinates within image bounds
    if (x>=0 && x<this.width && y>=0 && y<this.height)
      return this.image[x][y];

    // Checks if the uniform color must be returned (has priority)
    if (y<0            && this.wrapModeTop===WrapMode.Uniform || 
        x>=this.width  && this.wrapModeRight===WrapMode.Uniform ||
        y>=this.height && this.wrapModeBottom===WrapMode.Uniform ||
        x<0            && this.wrapModeLeft===WrapMode.Uniform)
      return this.wrapUniformPixel;

    // Right/left edges
    if (x<0           && this.wrapModeLeft===WrapMode.Tiled ||
        x>=this.width && this.wrapModeRight===WrapMode.Tiled)
      x = ((x % this.width)  + this.width)  % this.width;
    else if (x<0           && this.wrapModeLeft===WrapMode.Extended ||
             x>=this.width && this.wrapModeRight===WrapMode.Extended)
      x = Math.min(this.width-1, Math.max(0, x));

    // Top/bottom edges
    if (y<0            && this.wrapModeTop===WrapMode.Tiled ||
        y>=this.height && this.wrapModeBottom===WrapMode.Tiled)
      y = ((y % this.height) + this.height) % this.height;
    else if (y<0            && this.wrapModeTop===WrapMode.Extended ||
             y>=this.height && this.wrapModeBottom===WrapMode.Extended)
    y = Math.min(this.height-1, Math.max(0, y));

    return this.image[x][y];
  }

  /**
   * Calls Palette.getColorMatch on each pixel of the work area (called by render())
   */
  protected determineColorMatches()
  {
    // Determines color according to closest color in palette
    for (let y=0; y<this.height; y++)
      for (let x=0; x<this.width; x++)
        this.image[x][y].match = this.palette.getColorMatch(this.image[x][y].original);
  }

  /**
   * Returns true if the given pixel is considered transparent (transparency
   *  threshold or transparent color)
   */
  protected isTransparent(pixel:Pixel):boolean
  {
    if (typeof(this.transparency) === "number")
      return pixel.original.A <= 255*(this.transparency as number);
    else
      return Math.floor(pixel.original.toNumber()/256) ==
             Math.floor((this.transparency as Color).toNumber()/256);
  }

  /**
   * Creates a structure used in detection of outline/edge
   * @param colors Color(s) given as a single or tuple value used to initialize colors
   * @param isThick If true the returned list contains objects for angle pixels
   * @param isRotated If true the top/bottom and left/right colors are swapped
   * @returns Array of OrientedColor objects
   */
  protected getOrientedColors(colors:number|string|Color|[number|string|Color,number|string|Color,number|string|Color,
                              number|string|Color], isThick:boolean, isRotated=false) : OrientedColor[]
  {
    // Gets colors after possible rotation and resolution tuple vs single color
    let top:Color =    new Color(colors instanceof Array ? colors[isRotated?2:0] : colors);
    let right:Color =  new Color(colors instanceof Array ? colors[isRotated?3:1] : colors);
    let bottom:Color = new Color(colors instanceof Array ? colors[isRotated?0:2] : colors);
    let left:Color =   new Color(colors instanceof Array ? colors[isRotated?1:3] : colors);

    // Creates array with 4 surrounding oriented colors
    let res:OrientedColor[] = [{dx:0, dy:-1, color:top},    {dx: 1, dy: 0, color:right},
                               {dx:0, dy: 1, color:bottom}, {dx:-1, dy: 0, color:left}];

    // Adds 4 further surrounding oriented colors
    if (isThick)
    {
      let tr:Color = new Color(top).mix(right), tl:Color = new Color(top).mix(left);
      let br:Color = new Color(bottom).mix(right), bl:Color = new Color(bottom).mix(left);
      res.push({dx: 1, dy:-1, color:tr});
      res.push({dx: 1, dy: 1, color:br});
      res.push({dx:-1, dy: 1, color:bl});
      res.push({dx:-1, dy:-1, color:tl});
    }

    return res;
  }



  /**
   * Retrieves references on Pixel objects surrounding the pixel at given position
   * @param x X coordinate in work area
   * @param y Y coordinate in work area
   * @param colors Array of OrientedColor objects as returned by getOrientedColors
   * @returns The related array of references on Pixel objects
   */
  protected getSurroundingPixels(x:number, y:number, colors:OrientedColor[]):Pixel[]
  {
    let res:Pixel[] = [];
    for (let i=0; i<colors.length; i++)
      res.push(this.getPixel(x + colors[i].dx, y + colors[i].dy));
    return res;
  }

  /**
   * Fills the isTransparent, isOutline and isEdge fields in the work area (called by render())
   */
  protected determineTransparencyFrontiers()
  {
    // Determines the isTransparent fields to prepare edge/outline
    this.wrapUniformPixel.isTransparent = this.isTransparent(this.wrapUniformPixel);
    for (let y=0; y<this.height; y++)
      for (let x=0; x<this.width; x++)
        this.image[x][y].isTransparent = this.isTransparent(this.image[x][y]);

    // Repeat several times the same procedure to generate thick outline/edge
    for (let layer=0; layer<Math.max(this.outline.width,this.edge.width); layer++)
    {
      // Two passes are necessary to avoid effect of local changes
      // 1st pass: fills the colors fields with the detected OrientedColor objects
      for (let y=0; y<this.height; y++)
        for (let x=0; x<this.width; x++)
        {
          // Retrieves current pixel
          let p = this.image[x][y];

          // Determines outline pixels, i.e. at least transparent and not already set as outline
          if (layer<this.outline.width && p.isTransparent && !p.isOutline)
          {
            // Selects current pixel as outline if at least one of the surrounding pixels
            // is not transparent (or already an outline), then keeps related colors
            let pixels:Pixel[] = this.getSurroundingPixels(x, y, this.outline.colors);
            for (let i in pixels)
              if (pixels[i].isOutline || !pixels[i].isTransparent)
                p.colors.push(this.outline.colors[i]);
          }

          // Determines edge pixels, i.e. at least not transparent and not already set as edge
          if (layer<this.edge.width && !p.isTransparent && !p.isEdge)
          {
            // Selects current pixel as edge if at least one of the surrounding pixels
            // is transparent or already an edge, then keeps related colors
            let pixels:Pixel[] = this.getSurroundingPixels(x, y, this.edge.colors);
            for (let i in pixels)
              if (pixels[i].isEdge || pixels[i].isTransparent)
                p.colors.push(this.edge.colors[i]);
          }
        }

      // 2nd pass: fills the isOutline/isEdge fields and determine color
      //console.log(layer);
      for (let y=0; y<this.height; y++)
        for (let x=0; x<this.width; x++)
          if (!this.image[x][y].isEdge && !this.image[x][y].isOutline)
          {
            // Sets outline/edge depending on transparency if some colors were kept
            let p = this.image[x][y];
            p.isOutline = p.colors.length>0 && p.isTransparent;
            p.isEdge = p.colors.length>0 && !p.isTransparent;

            // Mixes found oriented colors (without using direction dx,dy)
            if (p.isOutline || p.isEdge)
            {
              let R:number=0, G:number=0, B:number=0, A:number=0;
              for (let i in p.colors)
              {
                R += p.colors[i].color.R; G += p.colors[i].color.G;
                B += p.colors[i].color.B; A += p.colors[i].color.A;
              }
              p.frontier.setRGB(R/p.colors.length, G/p.colors.length, B/p.colors.length);
              p.frontier.setAlpha(A/p.colors.length);
            }

            // Mix ratio for edges
            if (p.isEdge)
            {
              let ratio:number = this.edgeMixRatio>=0 && this.edgeMixRatio<=1 ? 1-this.edgeMixRatio :
                                                                       (1+layer)/(1+this.edge.width);
              //console.log(ratio);
              p.frontier.mix(p.original, ratio);
            }

            // Finally keeps the color in the palette
            p.frontier.set(this.palette.getClosestColor(p.frontier));
        }
    }
  }

  protected determineDithering()
  {
    // Gets height of the dithering matrix
    let height:number = this.ditheringMatrix.length;

    // Use a simple color replacement if no dithering matrix was set
    if (this.ditheringMatrix.length===0 || this.ditheringLevel<=0)
      for (let y=0; y<this.height; y++)
        for (let x=0; x<this.width; x++)
          this.image[x][y].dithered.set(this.image[x][y].match.closestColor);
    else
    {
      let width:number = this.ditheringMatrix[0].length;
      for (let y=0; y<this.height; y++)
        for (let x=0; x<this.width; x++)
        {
          let match:ColorMatch = this.image[x][y].match;
          let ratio:number = match.mixDistance/match.closestDistance;
          if ( ratio >= this.ditheringLevel &&
              this.ditheringMatrix[x % width][y % height] >= ratio-this.ditheringLevel)
            this.image[x][y].dithered.set(match.mixColor);
          else
            this.image[x][y].dithered.set(match.closestColor);
        }
    }
  }


  protected finalize()
  {
    // Mixes different parts
    for (let y=0; y<this.height; y++)
      for (let x=0; x<this.width; x++)
        if(this.image[x][y].isOutline || this.image[x][y].isEdge)
          this.image[x][y].final = this.image[x][y].frontier;
        else
          this.image[x][y].final = this.image[x][y].dithered;
  }

  protected export():Jimp
  {
    // Create output image
    let res:Jimp = new Jimp((this.width+2*this.finalBorder)*this.finalScale,
                            (this.height+2*this.finalBorder)*this.finalScale);
    //console.log("w:"+res.getWidth()+" h:"+res.getHeight()+" b:"+this.finalBorder);
    for (let y=0; y<res.getHeight(); y++)
      for (let x=0; x<res.getWidth(); x++)
      {
        let pixel:Pixel = this.getPixel(Math.floor(x/this.finalScale)-this.finalBorder,
                                        Math.floor(y/this.finalScale)-this.finalBorder); 
        res.setPixelColor(pixel.final.toNumber(), x, y);
      }
    return res;
  }

  /**
   * Specifies how the pixel just after the edges need to be considered. By default
   * the source image is considered surrounded by an infinite black transparent
   * solid color. See [[WrapMode]] for other possibilities.
   * @param top Wrap mode for top edge
   * @param right Wrap mode for right edge
   * @param bottom Wrap mode for bottom edge
   * @param left Wrap mode for left edge
   * @param color Color to use if one of the modes is Uniform
   * @returns The current object
   */
  setWrapMode(top:WrapMode   = WrapMode.Uniform, right:WrapMode = WrapMode.Uniform,
    bottom:WrapMode = WrapMode.Uniform, left:WrapMode = WrapMode.Uniform,
    color:string|number|Color=0):PixelArtist
  {
    // Saves provided parameters
    this.wrapModeTop = top;
    this.wrapModeRight = right;
    this.wrapModeBottom = bottom;
    this.wrapModeLeft = left;
    this.wrapUniformPixel = new Pixel(color);
    return this;
  }

  /**
   * Post-production upscale and borders
   * @param scale Size of pixels on rendered picture (upscale)
   * @param border Number of up-scaled pixels to add on borders, colors added according to the
   *                defined WrapMode (useful to debug).
   * @returns This object
   */
  setFinalFrame(scale:number=1, border:number=0):PixelArtist
  {
    this.finalScale = Math.max(1, Math.round(scale));
    this.finalBorder = Math.max(0, Math.round(border));

    return this;
  }

  /**
   * Dithering on some parts of the picture
   * @param matrix Bayer matrix, e.g. part of the exported global variable [[matrices]]
   * @param level Fine-tuning level from 0 (no dithering) to 1 (max dithering)
   */
  setDithering(matrix:number[][], level:number=0.5)
  {
    this.ditheringMatrix = matrix;
    this.ditheringLevel = level;
  }

  /**
   * Sets the outline parameters
   * @param width Width of the edge in pixels
   * @param colors Tuple of 4 colors top/right/bottom/left or single color
   * @param isThick Thicker line if true (8-pixels edge detection instead of 4)
   * @returns This object
   */
  setOutline(width:number=1, colors:number|string|Color|[number|string|Color,number|string|Color,
             number|string|Color,number|string|Color]=255, isThick:boolean=false):PixelArtist
  {
    // Retrieves provided parameters
    this.outline.width = width;
    this.outline.colors = this.getOrientedColors(colors, isThick, true);
    return this;
  }
  /**
   * Sets the edge parameters
   * @param width Width of the edge in pixels
   * @param colors Tuple of 4 colors top/right/bottom/left or single color
   * @param isThick Thicker line if true (8-pixels edge detection instead of 4)
   * @param mixRatio Mix ratio from 0.0 (original color) to 1.0 (edge color), or shade if
   *                   negative or greater than 1
   * @returns This object
   */
  setEdge(width:number=1, colors:number|string|Color|[number|string|Color,number|string|Color,
          number|string|Color,number|string|Color]=255, isThick:boolean=false,
          mixRatio:number=0.5):PixelArtist
  {
    // Retrieves provided parameters
    this.edge.width = width;
    this.edgeMixRatio = mixRatio;
    this.edge.colors = this.getOrientedColors(colors, isThick, false);
    return this;
  }


  /**
   * Sets the property and value used for transparency
   * @param transparency Transparency property given as an alpha threshold from 0 to 1 or a transparent color
   * @returns This object
   */
  setTransparency(transparency:number|Color = 0.5):PixelArtist
  {
    this.transparency = transparency;
    return this;
  }

  /**
   * Transforms a picture using the current settings
   * @param source Input picture read via Jimp
   * @returns Jimp object with transformed picture
   */
  render(source:Jimp):Jimp
  {
    // Fills original fields
    this.import(source);

    // Fills closest color(s) in the work array
    this.determineColorMatches();
    this.determineDithering();

    // Fills outline/edge fields and colors
    this.determineTransparencyFrontiers();

    // Mixes all components
    this.finalize();

    // Creates Jimp object from the final colors
    return this.export();
  }



}

