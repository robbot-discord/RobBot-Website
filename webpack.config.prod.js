const common = require("./webpack.config.common")
const merge = require("webpack-merge")

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge.smart(common, {
  devtool: "source-map",
  mode: "production",
  // module: {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       loaders: [
  //         {
  //           loader: "ts-loader",
  //           options: {
  //             transpileOnly: true,
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // optimization: {
  //   splitChunks: {
  //     // name: false,
  //   },
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
      inject: true,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: true,
    // }),
  ],
})
