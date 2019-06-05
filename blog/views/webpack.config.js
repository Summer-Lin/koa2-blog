var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


// 打包文件目录
const publicPath = process.env.NODE_ENV === 'production' ? './' : '/dist/'

module.exports = {
  entry: {
    //后台管理系统
    'backend': './src/pages/backend/main.js',
    //前端播客页面
    'frontend': './src/pages/frontend/main.js'
  },
  output: {
    // 打包文件存放地址
    path: path.resolve(__dirname, './dist'),
    // 打包解析文件的目录，url 相对于 HTML 页面(生成的html文件中，css和js等静态文件的url前缀)
    publicPath: publicPath,
    // 打包后的文件名
    filename: '[name]/[name].bundle.js',
    // [name]也是一个占位符，表示的是模块标识符(module identifier)
    chunkFilename: 'chunk/[name].[chunkhash:6].chunk.js'
  },
  plugins: [
       // 每次启动都删除dist文件
    new CleanWebpackPlugin(),
    
    //后台管理系统
    new HtmlWebpackPlugin({
      chunks: ['backend'], // 引入js的地址，里面的值就是entry里面的属性，在对应的页面里面引入想要的js即可，就可以多页面不同引用了
      inject: 'body', // 把script和link标签放在body底部
      hash: true, // 在生成的文件后面增加一个hash，防止缓存
      title: '后台管理系统', // 它的title，记得要在index.ejs中加入<%= %>
      filename: 'backend.html', // 生成的文件的名称,生成出来的文件和路径，前面会加上output的path
      template: './src/pages/backend/index.ejs', // 通过ejs模板打包成html
    }),

    //前端播客页面
     new HtmlWebpackPlugin({
       chunks: ['frontend'], 
       inject: 'body', 
       hash: true, 
       title: 'summer-blog', 
       filename: 'frontend.html', 
       template: './src/pages/frontend/index.ejs'
     })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      
      {
        // less文件配置
        test: /\.less$/,
        // 使用less-loader处理.less文件
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          //指定输出路径
          outputPath: 'images',
        }
      },
      //引入iview3 样式报错, 用这个loader来解析
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        }
       
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // 可以在引入文件的时候使用@符号引入src文件夹中的文件
      '@': path.resolve('src'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    port: 8963,
    noInfo: true,
    overlay: true, // 浏览器页面上显示错误
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
