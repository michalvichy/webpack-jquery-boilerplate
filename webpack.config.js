const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  return {
    entry: {
      'main': './src/scripts/main.js',
      vendor: [
        'jquery',
      ]
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/build'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loaders: ['css-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|ttf|woff|svg|eot)$/i,
          loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]'],
        },
        { test: /\.json$/, loader: "json" },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!sass-loader",
          }),
        },
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQUery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
    ]
  }
};
