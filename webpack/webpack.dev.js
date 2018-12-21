const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch', // 解决热更新组件状态保存问题
    'webpack-dev-server/client?http://localhost:9090', // 热更新
    'webpack/hot/only-dev-server'// 热更新
  ],
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist',
  //   hot: true,
  //   host: 'localhost'
  // },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ]
})