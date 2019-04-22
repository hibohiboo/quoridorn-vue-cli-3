const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "eot", "ttf"];

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  baseUrl: process.env.VUE_APP_BASE_URL,
  devServer: {
    // https://uyamazak.hatenablog.com/entry/2018/07/31/115457
    // sock.js用に仮想環境のIPとポートを指定
    public: "192.168.50.10:8080",
    // host: "0.0.0.0",
    // port: "8080",
    watchOptions: {
      poll: true
    },
    disableHostCheck: true,
    hotOnly: true,
    clientLogLevel: "warning",
    inline: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 1024,
        minRatio: 0.8
      }),
      new BundleAnalyzerPlugin()
    ]
  },
  // yamlローダーの追加
  chainWebpack: config => {
    config.module
      .rule("yaml")
      .test(/\.ya?ml$/)
      .use("json-loader")
      .loader("json-loader")
      .end()
      .use("yaml-loader")
      .loader("yaml-loader")
      .end();
  }
  // start value has mixed support, consider using flex-start insteadのエラーがでた
  // , css: {
  //   loaderOptions: {
  //     css: {
  //       // options here will be passed to css-loader
  //     },
  //     postcss: {
  //       //options: { plugins: 'postcss-css-variables': {}}
  //       options: { plugins: [require('autoprefixer')()] }
  //       // options here will be passed to postcss-loader
  //     }
  //   }
  // }
};
