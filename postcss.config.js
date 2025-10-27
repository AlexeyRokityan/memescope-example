const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

const scaleFunction = require('./postcss/scale-function');

module.exports = {
  plugins: [tailwindcss, scaleFunction(), autoprefixer],
};
