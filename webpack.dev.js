const merge = require('webpack-merge');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  // 服务器配置
  devServer: {
    port: '8081',
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: true, // 解决单页面路由问题，
    contentBase: '../dist',
    open: true, // 自动打开浏览器
    hot: true, // 开启热替换, css代码跟新不刷新页面
    // hotOnly: true 开启后只有手动配置才能更新，即使 hot 为 true 也不刷新浏览器
    proxy: {
      index: '', // 将 index 设置为空，可以对根路径进行转发
      'api/get': 'xxxx.com/api', // 第一种方式，直接代理到 api 路径
      'api/qb': { // 第二种方式，在路径需要临时替换时使用
        target: 'xxxx.com/api',
        pathRewrite: {
          'head': 'demo' // 此时访问head路径将被代理到demo下
        },
        secure: false, // 对 https 请求的配置，false 为支持 https
        changeOrigin: true // 做代理分发时允许访问其他网站，突破网站限制，建议在开发环境使用
      },
    }
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'webpack 打包应用',
      filename: 'index.html',
      template: './template/index.html',
      inject: true
    }),
    // will cause the relative path of the module to be displayed when HMR is enabled
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    // show error infomation
    new FriendlyErrorsPlugin()
  ]
});
