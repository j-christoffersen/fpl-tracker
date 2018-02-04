const path = require("path");
module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'client/src') + '/index.jsx'],
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
