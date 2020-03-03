const paths = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [paths.src + "/index.js"],
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: paths.static,
        to: "assets",
        ignore: ["*.DS_Store"]
      }
    ]),
    new HtmlWebpackPlugin({
      title: "Facade",
      favicon: paths.src + "/images/favicon.png",
      template: paths.src + "/index.html",
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 }
          },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      }
    ]
  }
};
