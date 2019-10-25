const common = require("./webpack.config.common")
const merge = require("webpack-merge")
const webpack = require("webpack")

const HardSourceWebpackPlugin = require("hard-source-webpack-plugin")

module.exports = merge.smart(common, {
  // devtool: "cheap-module-eval-source-map",
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
  ],
})
