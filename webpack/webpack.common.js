const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: [
    'babel-polyfill', // 它会仿效一个完整的 ES2015+ 环境，并意图运行于一个应用中而不是一个库/工具
    path.resolve(__dirname, '../src/index.js'), // 指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
  ],
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出的路径
    filename: '[name]_[hash:8].js'  // 打包后文件
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({// 生成新的html文件
      template: path.resolve(__dirname, '../src/index.template.html'),
      inject: true
    }),
    new CleanWebpackPlugin(['../dist']), // 在每次构建前清理 /dist 文件夹
  ],
  optimization: {// CommonsChunkPlugin 替代 //代码分离
    splitChunks: {
      cacheGroups: {
        // commons: {
        //   name: 'commons',
        //   chunks: 'initial',
        //   minChunks: 2
        // },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
}