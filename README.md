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