const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')
console.log({outputPath})
module.exports = {
  entry: './src/index.js', // バンドル対象の設定
  output: {
    filename: 'main.js',
    path: outputPath
  }
}
