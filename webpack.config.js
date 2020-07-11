const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { main: './src/js/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                options: {
                    plugins: ['transform-class-properties']
                }
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        },
        {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: './images/[name].[ext]',
                        esModule: false
                    },
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true, // webpack@1.x
                        disable: true, // webpack@2.x and newer
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
                },
            ]
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};