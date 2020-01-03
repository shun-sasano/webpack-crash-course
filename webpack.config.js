const path = require('path')
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
        test: /\.css$/,
        use: [// この順番超大事！！！
          // ここは後ろから読み込む。css-loader => style-loaderの順番。
          'style-loader', // バンドルしたcssを読み込む
          'css-loader' // cssをバンドルする
        ]
      }
    ]
  },
  devServer: { // ドキュメントルートの設定。
    contentBase: outputPath
  }
}
