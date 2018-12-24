module.exports = {
  /* パターン３ */
  baseUrl: "http://localhost:8080/",
  devServer: {
    watchOptions: {
      poll: true
    },
    disableHostCheck: true
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
  /* パターン１
  baseUrl: "./",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
  */
  /* パターン２
  devServer: {
    public: "192.168.11.2:2104",
    host: "0.0.0.0",
    port: "8080",
    watchOptions: {
      poll: true
    }
  }
  */
};
