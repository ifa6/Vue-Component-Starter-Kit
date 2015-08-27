var path = require("path");
var webpack = require("webpack");
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var block_isolation = './utilities/styles/isolation.scss';
var block_path = './blocks'
var jsonToSassVars = require('./libs/webpack/jsonToSassVars.js');
var sassGlobals = require('./app/components/utilities/sassGlobals.json');
var sass = JSON.stringify(sassGlobals);

module.exports = {
    context: __dirname + "/app/components",
    entry: {
        vendor:['vue','director'],
        sandbox:'sandbox',
        block:[block_isolation, block_path +'/block/block']
    },
    output: {
        path: path.join(__dirname, "dist/build"),
        publicPath: 'build/',
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: "vue" },
            { test:/\.html$/, loader:"html-loader"},
            { test: /\.json$/, loader:'json-loader'},
            { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"+
                "!sass-loader?sourceMap"+
                "!jsontosass?"+ sass +
                "!postcss-loader") },
            { test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader' }
        ]
    },
    postcss: [
        require('autoprefixer-core'),
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'components']
    },
    plugins: [
        new ExtractTextPlugin('[name].css', { allChunks: true }),
        new webpack.ProvidePlugin({
            router:"director",
            Vue:"vue"
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ],
    devtool: 'source-map'
};
