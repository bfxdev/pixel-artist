// webpack configuration to build a library bundled with other dependencies
// See https://webpack.js.org/guides/author-libraries

// See https://nodejs.org/api/path.html
const path = require('path');

// See https://webpack.js.org/configuration
module.exports =
{
  // Generated as es6 module by tsc
  entry: './es6/pixel-artist.js',

  // Production mode, i.e. minimize code size
  mode: 'production',

  output:
  {
    filename: 'pixel-artist.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "pixart",
    libraryTarget: "var"
  }

};
