const path = require('path');

module.exports = {
  // entry: './index.ts',
  entry: './index',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'tik-sdk.js',
    library: 'tikSDK',
    libraryTarget: 'var'
  },
};
