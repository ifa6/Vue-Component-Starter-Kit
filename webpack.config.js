var path = require("path");
var webpack = require("webpack");
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + "/app",
    entry: "./src/entry.js",
    output: {
        path: path.join(__dirname, "app/build"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: "vue" },
            { test:/\.html$/, loader:"html-loader"},
            { test: /\.json$/, loader:'json-loader'},
            { test: /\.(svg)$/, loader: 'raw-loader'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap&module&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') }
        ]
    },
    postcss: [
        require('autoprefixer-core')
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'components']
    },
    plugins: [
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.ProvidePlugin({
            router:"director"
        })
    ],
    devtool: 'source-map'
};

