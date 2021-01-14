module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/main.scss";'
      }
    }
  },
  configureWebpack: {
    devServer: {
      clientLogLevel: "info",
      watchOptions: {
        poll: true
      }
    }
  }
};
