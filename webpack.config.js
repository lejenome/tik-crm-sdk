const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const libs = [
  {
    name: 'full',
    entry: './index',
    library: ['tikSDK'],
    filename: 'tik-sdk.[name].js',
  },
  {
    name: 'core',
    entry: './src/core/index',
    library: ['tikSDK', '[name]'],
    filename: 'tik-sdk.[name].js',
  },
  {
    name: 'crm',
    entry: './src/crm/index',
    library: ['tikSDK', '[name]'],
    filename: 'tik-sdk.[name].js',
  },
]

module.exports = libs.map((lib) => ({
  mode: 'production', // 'development'
  entry: {
    [lib.name]: lib.entry,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: lib.library,
    filename: lib.filename,
    libraryTarget: 'umd', // "var", "this", "window", "commonjs", "amd"
    globalObject: 'this',
  },
  plugins: [
    // new CleanWebpackPlugin(),
    /*
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    */
  ],
  externals: {
    '@sentry/browser': {
      commonjs: '@sentry/browser',
      commonjs2: '@sentry/browser',
      amd: '@sentry/browser',
      root: 'Sentry',
    },
  },
  node: {
    process: false,
  },
  devtool: 'source-map',
  /*
  optimization: {
    runtimeChunk: true,
  },
  */
}))
