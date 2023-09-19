# Module-Federation-Fundamentals
Learn Module Federation Fundamentals

# Reproduce Steps
#### 1 - Create Container App
`vue create container`

#### 2 - Install [ webpack , webpack-cli , webpack-dev-server  html-webpack-plugin ] as dev dependencies 
`npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev`

#### 3 - Create webpack.config file to serve Container app 
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode : 'development',
    devServer:{
        port:8081
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};
```
#### 4 - Add webpack serve command in scripts in package.json file
```
"scripts": {
    "_serve": "webpack serve"
},
```

#### 5 - Install Vue Loader Plugin to solve the compatibility with webpack5 use 
`npm i vue-loader@15.10.2 --save-dev`
##### Note : use vue-loader 15 or lower if you using vue 2

#### 6 - add vue loader in webpack config file as plugin and define it as loader for .vue files & add template parameter called BASE_URL to use in loading fav icon
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    mode : 'development',
    devServer:{
        port:8081
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
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
```
#### 7 - install style-loader, css-loader , sass-loader to handel loading style files and install file-loader to handle loading files in webpack add these loader in webpack config file
`npm install style-loader css-loader sass-loader file-loader --save-dev`
```
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
```
#### 8 - serve container app 
`npm run _serve`