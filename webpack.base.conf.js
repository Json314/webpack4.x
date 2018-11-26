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
    publicPath: '/',                      // 解决图片路径问题
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
        loader: 'url-loader?limit=8192&name=img/[name].[hash:8].[ext]'
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
