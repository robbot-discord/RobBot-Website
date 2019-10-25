const path = require("path")
const webpack = require("webpack")

const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CircularDependencyPlugin = require("circular-dependency-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const paths = {
  dist: path.resolve(__dirname, "dist"),
  src: path.resolve(__dirname, "src"),
  static: path.resolve(__dirname, "static"),
}

const babelLoader = {
  loader: "babel-loader",
  options: {
    babelrc: true,
    cacheDirectory: true,
  },
}

module.exports = {
  devServer: {
    contentBase: paths.dist,
    compress: true,
    hot: true,
    inline: true,
    port: 8080,
    progress: true,
    watchContentBase: true,
  },
  entry: ["index.tsx"],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loaders: [
          {
            loader: "ts-loader",
          },
          babelLoader,
        ],
        test: /\.tsx?$/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loaders: [babelLoader],
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader",
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)(\?\S*)?$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
      chunks: "all",
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          ecma: 8,
          module: true,
          compress: { warnings: false, passes: 3, toplevel: true },
          mangle: { safari10: true, toplevel: true },
          output: { safari10: true },
        },
        sourceMap: true,
      }),
    ],
  },
  output: {
    chunkFilename: "[name].[hash:8].chunk.js",
    filename: "[name].[hash:8].bundle.js",
    futureEmitAssets: true,
    path: paths.dist,
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
    }),
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
      inject: true,
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    modules: [paths.src, paths.static, "node_modules"],
  },
  target: "web",
}
