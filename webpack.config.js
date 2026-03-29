var path = require("path");

module.exports = {
    mode: "development",
    entry: "./main.js",
    resolve: {
        modules: [path.resolve("./"), "node_modules"],
        extensions: [".js"],
        fallback: {
            "crypto": false,
        },
    },
    output: {
        path: path.resolve(__dirname, "bundle/"),
        filename: "main.js",
        publicPath: "bundle/",
    },
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.hbs$/, use: "handlebars-loader" },
            { test: /\.scss$/, use: ["style-loader", "css-loader", {
                loader: "sass-loader",
                options: {
                    api: "modern",
                    sassOptions: {
                        quietDeps: true,
                        silenceDeprecations: ["import", "slash-div", "global-builtin", "color-functions"],
                        loadPaths: [
                            path.resolve(__dirname),
                            path.resolve(__dirname, "node_modules"),
                        ],
                    },
                },
            }] },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: "asset",
                parser: { dataUrlCondition: { maxSize: 10000 } },
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: "asset/resource",
            },
        ],
    },
    devtool: "inline-source-map",
    devServer: {
        allowedHosts: "all",
        hot: true,
        liveReload: true,
        static: {
            directory: path.resolve(__dirname),
        },
        port: 8080,
        watchFiles: {
            paths: ["./"],
            options: {
                usePolling: true,
                interval: 1000,
            },
        },
    },
};
