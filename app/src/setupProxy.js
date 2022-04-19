const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/media',
    createProxyMiddleware({
      target: 'http://0.0.0.0:8000',
      changeOrigin: true,
    })
  );
};
