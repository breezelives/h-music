module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://mobilecdnbj.kugou.com',
        ws: true,
        changeOrigin: true
      },
      '/kugou': {
        target: 'http://www.kugou.com',
        pathRewrite: {
          '^/kugou': ''
        },
      },
      '/m': {
        target: 'http://m.kugou.com',
        pathRewrite: {
          '^/m': ''
        },
      }
    }
  }
}