const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "."),
    compress: true,
    port: 8080
  },
  plugins: [
  ]
};
