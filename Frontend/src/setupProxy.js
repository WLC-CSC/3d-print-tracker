const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api1",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
            pathRewrite: {
                "^/api1": "checkUser",
            },
        })
    );
    app.use(
        "/api2",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
            pathRewrite: {
                "^/api2": "addUser",
            },
        })
    );
};
