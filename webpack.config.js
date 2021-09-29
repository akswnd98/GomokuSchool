const path = require('path');
const process = require('process');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const manifest = require('./manifest.json');
const { models } = require('@tensorflow/tfjs-layers');

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@/icons': path.resolve(__dirname, 'icons'),
      '@/assets': path.resolve(__dirname, 'assets'),
      '@/src': path.resolve(__dirname, 'src'),
      '@/models': path.resolve(__dirname, 'models')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.(png|jpe?g)$/i,
        use: {
          loader: 'file-loader',
          options: {
            context: './'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new WebpackPwaManifest(manifest),
    new InjectManifest({
      swSrc: path.resolve(process.cwd(), 'src/sw.js'),
      swDest: 'sw.js',
      maximumFileSizeToCacheInBytes: 500 * 1024 * 1024,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'models', to: 'models' }
      ]
    })
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    historyApiFallback: true,
    https: {
      key: fs.readFileSync(path.resolve(process.cwd(), 'certificates/server.key')),
      cert: fs.readFileSync(path.resolve(process.cwd(), 'certificates/server.crt')),
      ca: fs.readFileSync(path.resolve(process.cwd(), 'certificates/rootCA.crt'))
    }
  }
}