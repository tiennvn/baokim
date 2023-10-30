const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
module.exports = {
  performance : {
    hints : false
  },
  devServer: {
    watchFiles: ["src/**/*"],
    port: 1700,
    hot: true,
  },
  stats: {
    children: true,
  },
  entry: {
    index: {
      import:'./src/index.js',
      filename: 'static/js/bundle.js'
    },
    counter: {
      import:'./src/js/counter.js',
      filename: 'js/counter.js'
    },
  },
  output: {
    clean: true,
    path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: ["babel-loader"]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
       new HtmlMinimizerPlugin(),
       new CssMinimizerPlugin(),
       new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin('Name: WEB-17 ; Version-Deployment : v2.0; Version-Test: v2.10'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jquery: "jQuery",
      "window.jQuery": "jquery"
    }),
    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/view/index.html',
      inject: "body",
      chunks: ['index', 'counter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'blog.html',
      template: './src/view/blog.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'blog-detail.html',
      template: './src/view/blog-detail.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.html',
      template: './src/view/contact.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'introduction.html',
      template: './src/view/introduction.html',
      inject: "body",
      chunks: ['index', 'counter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'product.html',
      template: './src/view/product.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'product-detail.html',
      template: './src/view/product-detail.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: './src/view/404.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'category.html',
      template: './src/view/category.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'category-search.html',
      template: './src/view/category-search.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'cart.html',
      template: './src/view/cart.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'searchOrder.html',
      template: './src/view/searchOrder.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'searchProduct.html',
      template: './src/view/searchProduct.html',
      inject: "body",
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'searchBlog.html',
      template: './src/view/searchBlog.html',
      inject: "body",
      chunks: ['index'],
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].min.css",
    }),
    
  ],
};
