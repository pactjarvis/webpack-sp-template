const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
  },
  module: {
    rules: [
      // { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(ts|js)x?$/, use: 'babel-loader', exclude: /node_modules/ }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  performance: {
    hints: false
  }
};