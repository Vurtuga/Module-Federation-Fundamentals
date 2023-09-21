# Module-Federation-Fundamentals
Learn Module Federation Fundamentals

# Reproduce Steps
1. Create Container Application & Run it in webpack [Vue2]
2. Create MFE 1 Application & Run it in webpack [React]
3. Apply Module Federation in Container Application
4. Apply Module Federation in MFE 1 Application

## Create Container Application & Run it in webpack [Vue2]
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
#### 7 - install style-loader, css-loader  to handel loading style files and install file-loader to handle loading files in webpack add these loader in webpack config file
`npm install style-loader css-loader file-loader --save-dev`
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
                test: /\.css$/,
                use: ['style-loader','css-loader']
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

## Create MFE 1 Application & Run it in webpack [React]
#### 1 - Create MFE 1 App
`npx create-react-app mfe1`

#### 2 - Install [ webpack , webpack-cli , webpack-dev-server  html-webpack-plugin ] as dev dependencies 
`npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev`

#### 3 - Create webpack.config file to serve Container app 
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode : 'development',
    devServer:{
        port:8082
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
#### 5 - Install Babel Loader Plugin to help webpack read JSX files
`npm install babel-loader --save-dev`
```
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};
```

#### 7 - install style-loader, css-loader to handel loading style files and install file-loader to handle loading files in webpack add these loader in webpack config file
`npm install style-loader css-loader file-loader --save-dev`
```
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};
```
#### 8 - serve mfe1 app 
`npm run _serve` 
##### Note : After running app I get React undefined error and after research for this error i found that i need to add `import React from 'react';` in every react component & it runs Perfect.

## Apply Module Federation in Container Application
#### 1 - Add Module Federation in Plugins in webpack 
we are going to add module federation plugin and set these options :
1. name : name of application module.
2. remotes : object to map names of remote applications with urls where they are hosted.
```
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
```