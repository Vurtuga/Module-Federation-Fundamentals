const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
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
                test: /\.scss|\.css$/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters:{
                BASE_URL: `http://localhost:8081/`
            }
        }),
        new VueLoaderPlugin()
    ],
};