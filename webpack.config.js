const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const outputPath = path.resolve(__dirname, 'dist')
console.log({outputPath})
module.exports = {
  entry: './src/index.js', // バンドル対象の設定
  output: { // バンドル結果のjsファイルの名前とファイルの設置場所の設定
    filename: 'main.js',
    path: outputPath
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      { 
        test: /\.css$/,
        use: [// この順番超大事！！！
          // ここは後ろから読み込む。css-loader => style-loaderの順番。
          'style-loader', // バンドルしたcssを読み込む
          'css-loader' // cssをバンドルする
        ]
      },
      { 
        test: /\.scss$/,
        use: [// この順番超大事！！！
          // ここは後ろから読み込む。css-loader => style-loaderの順番。
          'style-loader', // バンドルしたcssを読み込む
          'css-loader', // cssをバンドルする
          'sass-loader' // scssをバンドルする(その後node-sassによってcssにトランスパイルされる)(sass-loaderが依存しているので必要。)
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg|ico)$/i,
        loader: 'url-loader', //　Q.ここはurl-loaderのままでもfile-loaderが動くのか？？
        // A. 動く。optionsを指定することでfile-loaderが動作するようだ。limitで指定した約2kb以上の場合は
        // file-loaderが動作して、それ以下の場合はurl-loaderが動作する。
        // 逆にloaderにfile-loaderを指定した場合はlimitが無視されてどんな場合でもfile-loaderが動く。
        options: {
          limit: 2048, // images配下に画像があるみたいになる
          name: './images/[name].[ext]'
        },
      },
      {
        test: '/\.html$/',
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
    })
  ]
}
