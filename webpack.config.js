const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'source-map',
  entry: [path.join(__dirname, '/src/js', 'app.js')], // Your appʼs entry point
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000, // How often check for changes (in milliseconds)
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ExtractTextPlugin({
      filename: 'css/app.css',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader'],
        include: path.join(__dirname, '/src/js'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader?sourceMap', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader?sourceMap', // compiles Sass to CSS
        }],
      },
      {
        test: /\.(html|jpg|png)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  console.log('Building for production');
  config.devtool = 'cheap-module-source-map';
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      sourceMap: false,
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  );
  config.module.loaders[2] = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
    }),
  };
} else {
  console.log('Running development build');
  config.devtool = 'cheap-module-source-map';
  config.devServer = {
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
  };
  config.module.loaders[2] = {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
  };
}

module.exports = config;
