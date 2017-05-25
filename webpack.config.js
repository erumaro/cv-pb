const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/index.js'
    },
    output: {
        path: path.join(__dirname, ''),
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }),
                test: /\.scss$/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.(png|jpg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        })
    ],
    
    watch: true
};