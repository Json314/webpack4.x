const path = require('path');										               // node模块
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');			 // html插件

module.exports = {
  entry: {
    index: './index.js',
    main: './main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ['babel-loader']
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192&name=img/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true
    })
  ]
}
