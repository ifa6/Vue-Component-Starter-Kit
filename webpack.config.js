var path = require("path");
var webpack = require("webpack");
var fs = require('fs');

module.exports = {
    context: __dirname + "/app/components",
    entry: {
        vendor:['vue','director'],
        sandbox:'sandbox',
        table:'./blocks/table/table'
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        publicPath: 'js/',
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: "vue" },
            { test:/\.html$/, loader:"html-loader"},
            { test: /\.json$/, loader:'json-loader'},
            { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' },
        ]
    },
    postcss: [
        require('autoprefixer-core')
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'components']
    },
    plugins: [
        new webpack.ProvidePlugin({
            router:"director",
            Vue:"vue"
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ],
    devtool: 'source-map'
};
