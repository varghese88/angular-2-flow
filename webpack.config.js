var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var path = require('path');
var config = {
    entry :{
        'app':'./src/app.ts',
        'vendor':'./src/vendor.ts',
        'polyfills':'./src/polyfills.ts'
    },
    devtool:'inline-source-map',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].js'
    },
    resolve:{
        extensions : ['.ts','.scss','.js','.css']
    },
    module:{
        loaders:[
            {
                test:/\.ts$/,
                loaders:['awesome-typescript-loader','angular2-template-loader']
            },
            {
                test:/\.html$/,
                loader:'raw-loader'
            },
            {
                test:/\.scss$/,
                loader:['sass','style','css','postcss']
            }
        ]
    },
    plugins:[
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './src')
        ),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.NoEmitOnErrorsPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        })
    ]
}
 module.exports = config;