const path = require('path')

module.exports = {
  // entry: './index.ts',
  entry: './index',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'tikSDK',
    filename: 'tik-sdk.js',
    sourceMapFilename: 'tik-sdk.map',
    // libraryTarget: 'var'
    libraryTarget: 'umd',
  },
  plugins: [
    /*
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    */
  ],
  node: {
    process: false,
  },
  devtool: 'source-map',
}
