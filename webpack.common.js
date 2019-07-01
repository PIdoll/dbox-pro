const path = require('path');

// define path
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

const HappyPack = require('happypack');

module.exports = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'dbox-pro.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      'assets': path.resolve(__dirname, 'src/assets'),
      'page': path.resolve(__dirname, 'src/page'),
      'components': path.resolve(__dirname, 'src/components'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'api': path.resolve(__dirname, 'src/api'),
      'style': path.resolve(__dirname, 'src/style'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: ['happypack/loader?id=babel'],
        // use: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(css|less)$/,
        use: ['happypack/loader?id=less-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|webp|ico)$/,
        use: ['happypack/loader?id=file-loader'],
        // exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(jsx|js)$/,
        use: ['happypack/loader?id=eslint-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: process.env.NODE_ENV === 'development' ? 'fonts/[name].[ext]' : '[sha256:hash:10].[ext]',
          },
        }]
      }
    ]
  },
  optimization: {
    runtimeChunk: { // 打包后将包之间的依赖关系放进 runtime.js 中，此时不修改源文件，打包后的 hash 就不会变化了
      name: 'runtime' // 可自定义名称
    },
    splitChunks: {
      chunks: 'all',
      // chunks: 'async', // async表示只对异步代码进行分割
      minSize: 30000, // 当超过指定大小时做代码分割
      // maxSize: 200000,  // 当大于最大尺寸时对代码进行二次分割
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '_',
      name: true,
      cacheGroups: { // 缓存组：如果满足 vendor 的条件，就按 vender 打包，否则按default打包
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 权重越大，打包优先级越高
          // filename: 'js/vender.js', // 将代码打包成名为 vender.js 的文件
          name: 'vender'
        },
        default: {
          minChunks: 2,
          priority: -20,
          name: 'common',
          // filename: 'js/common.js',
          reuseExistingChunk: true // 是否复用已经打包过的代码
        },
        // 将公用的 css 单独抽离出来
        common: {
          test: /(css[\\/]common.css)/,
          name: 'common',
          minChunks: 1, // 最小公用次数
          reuseExistingChunk: true
        }
      }
    },
    usedExports: true // 使得 tree shaking 能够生效,将 css 从代码中拆分出来
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory=true']
    }),
    new HappyPack({
      id: 'less-loader',
      loaders: [
        {
          loader: 'style-loader',
          options: {
            singleton: true
          }
        }, {
          loader: 'css-loader',
          options: {
            import: true
          }
        }, {
          loader: 'less-loader',
          options: {
            // modifyVars: {
            //   'primary-color': 'red', // 修改dbox-ui主题色
            // },
            javascriptEnabled: true,
          }
        }
      ]
    }),
    new HappyPack({
      id: 'file-loader',
      loaders: ['file-loader']
    }),
    new HappyPack({
      id: 'eslint-loader',
      loaders: [{
        loader: 'eslint-loader',
        options: {
          quiet: true
        }
      }]
    }),
  ]
};
