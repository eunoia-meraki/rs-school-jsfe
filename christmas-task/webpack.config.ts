import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { resolve } from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.analyze;

const nothing = () => {};

const formStylesRule = (useModules = false) => ({
  test: /\.(css|scss|sass)$/,
  [useModules ? 'exclude' : 'include']: /assets\/stylesheets|node_modules/,
  use: [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        url: false,
        importLoaders: 1,
        sourceMap: true,
        ...(useModules && {
          modules: {
            localIdentName: '[local]-[hash:base64:5]',
          },
        }),
      },
    },
    'sass-loader',
  ],
});

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval',
  entry: './src/index.tsx',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[contenthash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts',
        },
      },
      {
        test: /\.mp3$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/audio',
        },
      },
      formStylesRule(false),
      formStylesRule(true),
      {
        test: /\.svg$/,
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [{ removeUselessStrokeAndFill: false }],
            floatPrecision: 2,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.wasm', '.js', '.json', '.mjs', '.cjs', '.jsx', '.d.ts', '.ts', '.tsx'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './src/assets/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
    isAnalyze ? new BundleAnalyzerPlugin() : nothing,
    new CleanWebpackPlugin(),
  ],
};

export default config;
