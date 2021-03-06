const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]'}]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]'}]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
};

module.exports = {
    main: Object.assign(
        {
            target: 'electron-main',
            entry: {
                main: './src/main.ts'
            }
        },
        commonConfig),
    renderer: Object.assign(
        {
            target: 'electron-renderer',
            entry: {
                gui: './src/index.tsx',
            },
            plugins: [
                new HtmlWebpackPlugin(),
            ],
        },
        commonConfig)
};