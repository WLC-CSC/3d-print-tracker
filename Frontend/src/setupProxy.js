const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api1",
        createProxyMiddleware({
            target: "http://127.0.0.1:5000",
            changeOrigin: true,
            pathRewrite: {
                "^/api1": "checkUser",
            },
        })
    );
    app.use(
        "/api2",
        createProxyMiddleware({
            target: "http://127.0.0.1:5000",
            changeOrigin: true,
            pathRewrite: {
                "^/api2": "addUser",
            },
        })
    );
    app.use(
        "/api3",
        createProxyMiddleware({
            target: "http://127.0.0.1:5000",
            changeOrigin: true,
            pathRewrite: {
                "^/api3": "addPrint",
            },
        })
    );
    app.use(
        "/api4",
        createProxyMiddleware({
            target: "http://127.0.0.1:5000",
            changeOrigin: true,
            pathRewrite: {
                "^/api4": "getPrints",
            },
        })
    );
};
