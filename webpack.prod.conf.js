const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")		// 提取css文件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");			  // 压缩输出的js文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");	// 压缩css文件

module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),   // 删除dist文件夹
    new MiniCssExtractPlugin({					// 提取css文件
      filename: 'css/[name].[contenthash:12].css',
      chunkFilename: 'css/[name].[contenthash:12].css'
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({					     // 压缩输出的js文件
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})		// 压缩输出的css文件
    ],
    splitChunks: {
      cacheGroups: {
        styles: {							          // 抽离所有css chunk到一个文件
          name: 'styles',
          test: /\.scss|css$/,
          chunks: 'all',   				      // merge all the css chunk to one file
          enforce: true
        },
        commons: {
          chunks: 'all',				        // 三选一： "initial" | "all" | "async"
          name: 'conmmons',			        // 打包后chunk的名字
          minChunks: 2,				          // 多入口文件，共用chunk的最小次数
          // maxInitialRequests: 5,			// 最大初始化加载次数
          priority: 5,
          minSize: 0
        },
        // 抽取引入的第三方chunk
        vendor: {						           // 将node_modules的引用模块打包为vendor.js
          test: /node_modules/,			   // 可以写成数组形式，引入多个
          chunks: 'initial',
          name: 'vendor',				       // 缓存分离出来的chunk名称
          priority: 10
        }
      }
    }
  }
});
