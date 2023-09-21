const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
    mode : 'development',
    entry: path.resolve(__dirname, "./src/main.js"),
    output:{
        publicPath: `http://localhost:8081/`,
    },
    devServer:{
        port:8081
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
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ],
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'container',
            remotes :{
                mfe1: 'mfe1app@http://localhost:8082/remoteEntry.js'
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters:{
                BASE_URL: `http://localhost:8081/`
            }
        }),
        new VueLoaderPlugin()
    ],
};