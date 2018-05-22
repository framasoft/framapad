const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const root = (process.env.NODE_ENV === 'preview') ? '/framapad/' : '/';

let config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, `public${root}`),
    publicPath: root,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.ya?ml$/,
        loader: 'yaml-import-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader'],
        }))
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }))
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new ExtractTextWebpackPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './app/assets/fonts'), to: 'fonts' },
      { from: path.resolve(__dirname, './app/assets/icons'), to: 'icons' },
      { from: path.resolve(__dirname, './app/assets/img'), to: 'img' },
      { from: path.resolve(__dirname, './app/assets/js'), to: 'js' },
      { from: path.resolve(__dirname, './app/assets/vendor'), to: 'vendor' },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: 'eval-source-map'
}

module.exports = config;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preview') {
  const locales = ['en', 'fr'];
  const routes = [ root ];
  for (let i = 0; i < locales.length; i += 1) {
    // Localized routes
    routes.push(`${root}${locales[i]}`);
  }
  module.exports.devtool = '#source-map'
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: ((process.env.NODE_ENV === 'preview') ? '"preview"' : '"production"'),
      }
    }),
    new HtmlWebpackPlugin({
      title: 'PRODUCTION prerender-spa-plugin',
      template: 'index.html',
      filename: path.resolve(__dirname, 'public/index.html'),
    }),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'public'),
      routes,
      renderer: new Renderer({
        headless: true,
        renderAfterDocumentEvent: 'render-event',
        inject: {
          prerender: true
        },
      }),
    })
  );
} else {
  // NODE_ENV === 'development'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      title: 'DEVELOPMENT prerender-spa-plugin',
      template: 'index.html',
      filename: 'index.html',
    }),
  ])
}

