const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "eot", "ttf"];

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  productionSourceMap: process.env.NODE_ENV === 'development', // productionにはソースマップを出さない。
  pages: {
    main: {
      entry: "src/main.ts", // エントリーポイントとなるjs
      template: "public/index.html", // テンプレートのHTML
      filename: "index.html" // build時に出力されるファイル名
    },
    chatLog: {
      entry: "src/chatLog.ts",
      template: "public/chatLog.html",
      filename: "chatLog.html"
    }
  },
  devServer: {
    // sock.js用に仮想環境のIPとポートを指定
    public: "192.168.50.10:8080",
    historyApiFallback: {
      rewrites: [
        {
          from: new RegExp(`/${process.env.VUE_APP_BASE_URL}/chatLog.html`),
          to: "chatLog.html"
        },
        {
          from: new RegExp(`/${process.env.VUE_APP_BASE_URL}/`),
          to: "index.html"
        } // index.html に飛ばす
      ]
    },
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
      // firebaseはデフォルトでgzip圧縮するので、gzファイルは別途不要
      // new CompressionWebpackPlugin({
      //   filename: "[path].gz[query]",
      //   algorithm: "gzip",
      //   test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
      //   threshold: 1024,
      //   minRatio: 0.8
      // })
      // buildの後にanalyzerが動いてctrl + Cで終わらなければならなくなるのでコメントアウト
      // new BundleAnalyzerPlugin()
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
};
