const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
    mode : 'development',
    entry: path.resolve(__dirname, "./src/index.js"),
    output:{
        publicPath: `http://localhost:8082/`,
    },
    devServer:{
        port:8082
    },
    module:{
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [
                    { 
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ],
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'mfe1app',
            filename: 'remoteEntry.js',
            exposes:{
                './mfe1app':'./src/index'
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};