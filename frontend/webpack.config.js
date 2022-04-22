const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      }, {
        test: /\.css$/,
        use: {
            loader: "css-loader"
        }
      }, {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use:{
            loader: 'url-loader?limit=100000' }
        }
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV' : JSON.stringify('development'),
        'process.env.REACT_APP_MAPBOX_ACCESS_TOKEN' : JSON.stringify(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
    })
  ],
};