const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssEtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist')
// console.log({outputPath})
module.exports = {
  entry: './src/index.js', // バンドル対象の設定
  output: { // バンドル結果のjsファイルの名前とファイルの設置場所の設定
    filename: 'main.js',
    path: outputPath
  },
  module: {
    rules: [
      {// 一番上に記述するということは一番最後に実行されることになるが、
        // babel-loader等で形を変更された後では無く、自分が書いた状態のものをlinkして欲しいので
        // もっと早めに実行させる必要がある。
        enforce: "pre", // enforce：preを持たないloaderよりも早く実行されるので順番をあまり気にしなくて良くなる。
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      { 
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      // { 
      //   test: /\.css$/,
      //   use: [// この順番超大事！！！
      //     // ここは後ろから読み込む。css-loader => style-loaderの順番。
      //     // 'style-loader', // バンドルしたcssを読み込む
      //     MiniCssEtractPlugin.loader, // style-loaerの違いは別のcssファイルが作成されるところ。
      //     'css-loader' // cssをバンドルする
      //   ]
      // },
      { 
        test: /\.(sc|c)ss$/, //  /\.s?css$/じゃダメなのか？？
        use: [// この順番超大事！！！
          // ここは後ろから読み込む。css-loader => style-loaderの順番。
          // 'style-loader', // バンドルしたcssを読み込む
          MiniCssEtractPlugin.loader, // style-loaerの違いは別のcssファイルが作成されるところ。
          'css-loader', // cssをバンドルする
          'sass-loader' // scssをバンドルする(その後node-sassによってcssにトランスパイルされる)(sass-loaderが依存しているので必要。)
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg|ico)$/i,
        loader: 'url-loader', // Q.ここはurl-loaderのままでもfile-loaderが動くのか？？
        // A. 動く。optionsを指定することでfile-loaderが動作するようだ。limitで指定した約2kb以上の場合は
        // file-loaderが動作して、それ以下の場合はurl-loaderが動作する。
        // 逆にloaderにfile-loaderを指定した場合はlimitが無視されてどんな場合でもfile-loaderが動く。
        options: {
          limit: 2048, // images配下に画像があるみたいになる
          name: './images/[name].[ext]'
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  // devServer: { // ドキュメントルートの設定。reactが導入されるとpluginsの設定に上書きされて意味がなくなる？？
  //   contentBase: outputPath
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      file: './index.html'
    }),
    new MiniCssEtractPlugin({ 
      // proxyによってキャッシュされて変更が更新されない可能性があるのでhashを入れてファイル名をいちいち変更することで回避している。
      filename: '[name].[hash].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: 'eval-source-map'
}
