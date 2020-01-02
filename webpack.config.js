const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')
console.log({outputPath})
module.exports = {
  entry: './src/index.js', // バンドル対象の設定
  output: { // バンドル結果のjsファイルの名前とファイルの設置場所の設定
    filename: 'main.js',
    path: outputPath
  },
  devServer: { // ドキュメントルートの設定。
    contentBase: outputPath
  }
}
