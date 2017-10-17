let path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
	// FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
	return path.join(__dirname, dir)
}

let outPath = path.resolve(__dirname, '__dist');
module.exports = {
	devtool: 'cheap-source-map', // source-map
	context: path.resolve(__dirname, 'app'),
	entry: {
		app: [
			'webpack-hot-middleware/client',
			'./index.js'],
	},
	output: {
		path: outPath,
		filename: '[name].js',
		publicPath: '',
		chunkFilename: '[hash].commons.js'
	},
	resolve: {
		alias: {
			'@': resolve('app'),
			'$$': path.resolve(__dirname, './app')
		},
	},
	externals: {
		'React': 'React'
	},
	module: {
		// preLoaders: [{
		//     test: /\.js|jsx$/,
		//     exclude: /node_modules/,
		//     loader: "eslint-loader",
		// }],
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: 'awesome-typescript-loader'
				}
			},
			{
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {compact: false}
				},
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: {
						loader: 'css-loader'
					}
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]__[local]___[hash:base64:5]'
							}
						}, {
							loader: 'less-loader',
							options: {
								strictMath: true,
								noIeCompat: true
							}
						}
						// 'postcss-loader'
					]
				})
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'imgs/[name]-[hash].[ext]'
					}
				}
			},
			{
				test: /\.(woff|ttf|eot|svg)$/i,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			/**
			 * 定义全局变量
			 */
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			},
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('app.css', {
			allChunks: true
		}),
		// new webpack.optimize.UglifyJsPlugin({       //过滤console
		//     comments: false,
		//     compress: {
		//         warnings: false,
		//         drop_debugger: true,
		//         drop_console: true
		//     }
		// }),
		new webpack.optimize.MinChunkSizePlugin({   //小于 10kb的块将会被合并
			minChunkSize: 1024, // ~50kb
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 15 //控制chunks最大数量
		}),
		new CommonsChunkPlugin({        //公共块提举
			name: 'commons',
			filename: 'commons.js',
			chunks: ['app', 'commons'],
		}),
		// new FriendlyErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			title: 'Custom template using Handlebars',
			template: path.resolve(__dirname, './app/index.html'),
			chunks: ['app', 'commons']
		}),
		new CopyWebpackPlugin(
			[{
				from: path.resolve(__dirname, './app/worker'),
				to: 'worker',
				ignore: ['.*']
			}]
		)
	]
};