const path = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
    entry: {
        app: "./public/assets/js/index.js",
        idb: "./public/assets/js/idb.js"

    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
    },
    plugins: [
        new WebpackPwaManifest({
            name: "Bidget Tracker",
            short_name: "Budgeteer",
            description: "An app that allows you to track you expenses.",
            background_color: "#01579b",
            theme_color: "#ffffff",
            fingerprints: false,
            inject: false,
            icons: [{
                src: path.resolve("./public/assets/icons/icon-512x512.png"),
                sizes: [72, 96, 128, 144, 152, 192, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })],
    mode: 'development'
};


