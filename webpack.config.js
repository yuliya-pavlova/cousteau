const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
            use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                name: '[../images][name].[ext]',
            },
            },
            {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                    'file-loader?name=../images/[name].[ext]', // указали папку, куда складывать изображения
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    },
                ]
            }
        ]
    },
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: 'style.css'
    //     })
    // ]
};