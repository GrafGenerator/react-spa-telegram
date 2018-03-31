"use strict";

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CheckerPlugin, TsConfigPathsPlugin } = require("awesome-typescript-loader");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    const sharedConfig = () =>
        ({
            stats: { modules: false },
            resolve: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                plugins: [
                    new TsConfigPathsPlugin(),
                ],
            },
            output: {
                filename: "[name].js",
                publicPath: "/react-spa-telegram",
                path: "dist",
            },
            devServer: {
                contentBase: path.resolve(__dirname, "./wwwroot/dist"),
            },
            module: {
                rules: [
                    { test: /\.tsx?$/, include: /ClientApp/, use: "awesome-typescript-loader?silent=true" },
                    { test: /\.(png|jpg|jpeg|gif|svg)$/, use: "url-loader?limit=25000" },
                    {
                        test: /\.scss$/,
                        use: ExtractTextPlugin.extract({
                            fallback: "style-loader",
                            use: [
                                {
                                    loader: "css-loader",
                                    options: {
                                        modules: true,
                                        sourceMap: true,
                                        importLoaders: 2,
                                        localIdentName: "[name]__[local]___[hash:base64:5]",
                                    },
                                },
                                "sass-loader",
                            ],
                        }),
                    },
                ],
            },
            plugins: [
                new ExtractTextPlugin({ filename: "styles.css", allChunks: true }),
                new CheckerPlugin(),
                new HtmlWebpackPlugin({
                    template: "./ClientApp/index.html",
                    inject: "body",
                    minify: false,
                }),
            ],
        });

    const clientBundleOutputDir = "./wwwroot/dist";
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { "main-client": "./ClientApp/boot-client.tsx" },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map",
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, "[resourcePath]"),
            }),
        ] : [
            new webpack.optimize.UglifyJsPlugin(),
        ]),
    });

    return clientBundleConfig;
};
