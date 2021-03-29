const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  resolve: {
    alias: {
        'vue': 'vue/dist/vue.js'
    }
},
  mode: 'development',
  //最初的引用
  // entry: './src/index.js',
  // entry: {
  //   //双入口文件写法
  //   // app: './src/index.js',
  //   // print: './src/print.js'
  //   app: './src/index.js'
  // },
  //babel-polyfill写法（会导致打包js多余乱码）
  entry:['babel-polyfill','./src/index.js'],
  //当文件报错时显示原本的报错文件位置而不是打包文件
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',

    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '管理输出',
      template:'./index.html'
    }),
    //这会导致打包js文件多余乱码
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  output: {
    //最初的引用
    // filename: 'main.js',
    //update的引用
    filename: '[name].main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
      rules: [
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'less-loader' // compiles Less to CSS
          }]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,// 不转换 node_modules 中的文件模块
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        },
        {
          test: /\.vue$/,
          use:[
            'vue-loader'
          ]
        }
      ]
    },
    devServer:{
      port:8080,
      proxy:{
        '/api':{
          target:'http://localhost:3000',
          pathRewrite:{'^/api':''}
        }
      }
    },
    externals: {
      jquery: 'jQuery',
      vue:'Vue',
      axios:'axios',
      lodash:'_'
    },
};
