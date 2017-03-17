var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractStyles = new ExtractTextPlugin({
    filename: "Styles/app.css",
});

module.exports = {
    bail: true,
    devtool: "eval",
    context: path.resolve(__dirname),
    entry: {
        app: './Library/AppClient'
    },
    output: {
        path: path.join(__dirname, 'Distribution/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: extractStyles.extract({
                  use: ["css-loader", "resolve-url-loader", "sass-loader?sourceMap"]
                })
            },
            {
                test: /\.css$/,
                use: extractStyles.extract({
                  use: ["css-loader", "resolve-url-loader"]
                })
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../Fonts/[name].[ext]',
                        publicPath: '',
                        outputPath: 'Fonts/',
                    }
                }
            }
        ]
    },
    plugins: [
        extractStyles,
        new UglifyJsPlugin({
            sourceMap: true,
            compress: {
              warnings: true
            }
        })
    ]
};