const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: {
    devtool: 'cheap-module-source-map' // 新增这个 调试模式
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8717',
        changeOrigin: true,
        ws: true
      }
    }
  }
})
