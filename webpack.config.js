const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: {
        app: ['./src/app.js', './src/scss/main.scss'],
        background: './src/background.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [
                    path.resolve(__dirname, './src')
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader?importLoaders=1'
                })
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(
                    ['css-loader', 'sass-loader']
                )
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            optipng: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        // Creates CSS file with all styles
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true
        }),

        // Creates index.html and injects stylesand script bundles
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true,
            chunks: ['index']
        }),

        // Copies manifest and icons
        new CopyWebpackPlugin([
            {
                from: './src/manifest.json'
            },
            {
                context: './src/assets',
                from: 'icon-**',
                to: 'assets'
            }
        ])
    ]
};
