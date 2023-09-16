const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

require('dotenv').config(); // Load .env file
const themeName = process.env.THEME_NAME;
console.log(themeName);

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    main: './src/js/index.js', // Replace with the path to your main JavaScript file
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(
      __dirname,
      'wp',
      'wp-content',
      'themes',
      themeName,
      'assets',
    ), // Corrected path
    publicPath: '/wp-content/themes/' + themeName + '/assets/', // Specify the public path here
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        include: path.resolve(__dirname, 'src/img'), // Adjust the path to your image folder
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]', // Adjust the output path and filename as needed
            },
          },
        ],
      },
      // Add more rules for handling other asset types (e.g., images, fonts) as needed
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.min.css', // Specify the name for your CSS file
    }),
    new CleanWebpackPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost', // Change to your WordPress development server host
      port: 3000, // Change to an available port if needed
      proxy: 'http://localhost:8080/', // Your WordPress development server URL
      files: [
        `./wp-content/themes/${themeName}/**/*.php`, // Adjust the path to your theme files
        `./wp-content/themes/${themeName}/assets/*.css`, // Include any CSS files
        `./wp-content/themes/${themeName}/assets/*.js`, // Include any JavaScript files
      ],
      reloadDelay: 500, // Adjust the delay as needed
      injectChanges: true,
      notify: false,
    }),
    new CopyWebpackPlugin({
      // Configure the copy-webpack-plugin
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'img'), // Source path of your images
          to: path.resolve(
            __dirname,
            'wp',
            'wp-content',
            'themes',
            themeName,
            'assets',
            'img',
          ), // Destination path in your theme folder
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // Add this line to minify CSS
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'wp', 'themes', themeName), // Serve from your theme directory
    },
    hot: true, // Enable HMR
  },
};
