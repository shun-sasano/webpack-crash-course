const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')
// __dirnameはその__dirnameが使われている場所のディレクトリ名。
console.log({outputPath})
module.exports = {
  entry: './src/index.js', // バンドル対象の設定
  output: {
    filename: 'oshiruko.js',
    path: outputPath
  }
}
