let express = require('express'),
	proxyMiddleware = require('http-proxy-middleware'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackDevServer = require('webpack-dev-server'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config');
var open = require('open');
let app = express(),
	compiler = webpack(webpackConfig);
/**
 * 设置代理
 */
let proxyOptions = {
	target: 'http://localhost:3000', // target host
	changeOrigin: true,               // needed for virtual hosted sites
	ws: true,                         // proxy websockets
	pathRewrite: {
		'^/api': '/',     // rewrite path
		// '^/api/remove/path': '/path'           // remove base path
	},
	router: {}
};
app.use('/api', proxyMiddleware(proxyOptions));
app.use(webpackDevMiddleware(compiler, {        //fixme
	publicPath: webpackConfig.output.publicPath, // Same as `output.publicPath` in most cases.
	stats: {
		colors: true,
	},
	inline: false,
	hot: true,
	noInfo: true,
	// display no info to console (only warnings and errors)
	quiet: false,
	// display nothing to the console
}));
// app.use(webpackHotMiddleware(compiler, {
// 	overlay: true,
// 	report: true
// }));

app.listen(3000, function () {
     open('http://localhost:3000');
});

