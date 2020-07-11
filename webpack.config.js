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
            test: /\.(woff|woff2|ttf)$/,
            use: 'file-loader'
			},
            {
            test: /\.(jpg|jpeg|png|svg|webp)$/,
            use: 'file-loader?name=./images/[name].[ext]&esModule=false'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({ // настроили плагин
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};