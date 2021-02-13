var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  entry: {
    indexPage: './src/js/indexPage.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      },
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.(jpe?g|png|svg|ico|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  output: {
    filename: 'js/[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/indexPage.html',
      chunks: ['indexPage']
    }),
  ],
  mode: 'development'
}