=================================================================================
 WEBPACK MODULES
=================================================================================

const ora = require('ora');
const path = require('path');
const webpack = require('webpack');

=================================================================================
 WEBPACK OUTPUT PATHS
=================================================================================

const APP_PATHS = {
    'entryAbs'   path.join(__dirname, 'resourcesassetsjsapp.js'),
    'publicAbs'  path.join(__dirname, 'publicassets'),
    'public'     'assets',
    'js'         'js[name].js',
    'css'        'css[name].css',
    'img'        'img[name].[ext]',
    'fonts'      'fonts[name].[ext]'
};

=================================================================================
 WEBPACK PLUGINS
=================================================================================

const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const OptimizeCSSAssets     = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsWebpack = require('friendly-errors-webpack-plugin');

const ExtractCSSPlugin = new ExtractTextPlugin({
    filename APP_PATHS.css,
    disable false,
    allChunks true
});

const UglifyPLugin = new webpack.optimize.UglifyJsPlugin({
    compress {
        warnings false
    },
    sourceMap true
});

const OptimizeCSSPlugin = new OptimizeCSSAssets({
  cssProcessorOptions {
    safe true
  }
});

const NamedModulesPlugin = new webpack.NamedModulesPlugin();
const FriendlyErrorsWebpackPlugin = new FriendlyErrorsWebpack();

=================================================================================
 WEBPACK CONFIG
=================================================================================

const config = {
    entry {
        app APP_PATHS.entryAbs
    },

    output {
        path APP_PATHS.publicAbs,
        filename APP_PATHS.js,
        publicPath APP_PATHS.public
    },

     Make sure Vue is built from the correct source
    resolve {
        alias {
            vue 'vuedistvue.js'
        }
    },

    module {
        loaders [
             Parse JS and React files with Babel
            {
                test .(jsjsx)$,
                include path.resolve(__dirname, 'resourcesassets'),
                use [{
                    loader 'babel-loader',
                    options {
                        presets [es2015,stage-2]
                    }
                }]
            },

             Parse Vue files with vue-loader and extract CSS
            {
                test .vue$,
                loader 'vue-loader',
                options {
                    loaders {
                        css ExtractCSSPlugin.extract([
                            'css-loader',
                            'postcss-loader',
                            'sass-loader'
                        ])
                    },
                    fallbackLoader 'vue-style-loader'
                }
            },

             Parse any plain CSS files and extract CSS
            {
                test .css$,
                use ExtractCSSPlugin.extract([
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ])
            },

             Parse any SASS files and extract CSS
            {
                test .(scsssass)$,
                use ExtractCSSPlugin.extract([
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ])
            },

             Relocate large images to the IMG directory
            {
                test .(pngjpeggifsvg)$,
                use [{
                    loader 'url-loader',
                    options {
                        limit 10000,
                        name APP_PATHS.img
                    }
                }]
            },

             Relocate fonts to the FONTS directory
            {
                test .(woff2eotttfotf)(.)$,
                use [{
                    loader 'url-loader',
                    options {
                        limit 10000,
                        name APP_PATHS.fonts
                    }
                }]
            }
        ]


        rules: [{
            test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
            use: [{
                loader: require.resolve('file-loader'),
                options: {
                    esModule: false
                }
            }]
        }]
    },



    plugins [
        UglifyPLugin,
        ExtractCSSPlugin,
        OptimizeCSSPlugin,
        NamedModulesPlugin,
        FriendlyErrorsWebpackPlugin
    ],

     Enable file watching based on NODE_ENV
    watch false,
    watchOptions {
        aggregateTimeout 300,
        poll 1000,
        ignored node_modules
    }
}

=================================================================================
 WEBPACK EXPORT
=================================================================================

module.exports = config;
