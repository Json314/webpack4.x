const path = require('path');
const Webpack = require('webpack');
const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',					    		          // 源文件映射
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),      // 热加载模块
  ],
  devServer: {									                   // webpack-dev-server配置
    contentBase: path.resolve(__dirname,'dist'), 	 // 最好设置成绝对路径,
    host: '192.168.80.8',						// 设置为ip
    port: 8080,
    open: true,
    hot: true				                // 热加载，设置为true必须配置HotModuleReplacementPlugin
  }
});
