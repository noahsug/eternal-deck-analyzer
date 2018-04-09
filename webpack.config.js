const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      DEV
        ? {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          }
        : {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader',
            }),
          },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.csv$/,
        use: 'csv-loader',
      },
    ],
  },

  plugins: DEV
    ? []
    : [
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([{ from: 'src/index.html', to: '.' }]),
      ],

  mode: DEV ? 'development' : 'production',
}
