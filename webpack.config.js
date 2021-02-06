const path = require('path');
// import path from 'path'

module.exports = {
  entry: './scripts/script.js', // точка входа - главный js файл
  output: { // точка выхода - куда положить новый, преобразованный файл (он же бандл - bundle)
    path: path.resolve(__dirname, 'dist'), // destination - назначение пути
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    open: true // сайт будет открываться сам при запуске npm run dev
  }
};