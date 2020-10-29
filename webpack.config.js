const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

const extractSass = new MiniCssExtractPlugin({
	filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
	chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css'
})

const conf = function () {
	const config = {
		mode: process.env.NODE_ENV,
		entry: {},
		output: {
			path: path.resolve(__dirname, './app/static'),
			filename: devMode ? 'js/[name].js' : 'js/[name].[hash].js',
			chunkFilename: devMode ? 'js/[name].chunk.js' : 'js/[name].chunk.[hash].js',
			publicPath: '/'
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: true,
								configFile: path.resolve(__dirname, 'tsconfig.json')
							}
						}
					]
				},
				{
					test: /\.(scss|sass)$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader',
						'sass-loader'
					]
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader'
					]
				},
				{
					test: /\.(jpe?g|png|gif)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								name: '[name].[hash].[ext]',
								limit: 8196,
								outputPath: 'images/'
							}
						}
					]
				},
				{
					test: require.resolve('zepto'),
					use: ['exports-loader?window.Zepto', 'script-loader']
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: ['js/**/*', 'css/**/*', 'images/**/*']
			}),
			extractSass,
			new OptimizeCssAssetsPlugin(),
				new BrowserSyncPlugin({
				host: 'localhost',
				port: '8888',
				startPath: '/home',
				proxy: 'http://localhost:3000/'
			})
		]
	}
	if (devMode) {
		config.module.rules[0].use.push({
			loader: 'eslint-loader',
			options: {
				cache: true,
				formatter: require('eslint-friendly-formatter')
			}
		})
	}
	const views = fs.readdirSync(path.join(__dirname, './src/template')).filter(item => (/.html$/).test(item))
	const entries = fs.readdirSync(path.join(__dirname, './src/scripts')).filter(item => (/.ts$/).test(item))
	const components = fs.readdirSync(path.join(__dirname, './src/template/common')).filter(item => (/.html$/).test(item))
	components.forEach(item => {
		config.plugins.push(new HtmlWebpackPlugin({
			template: `html-loader!./src/template/common/${item}`,
			filename: `../views/common/${item}`,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			},
			inject: false
		}))
	})
	views.forEach(item => {
		const name = item.split('.')[0]
		const hasEntry = entries.find(entry => name === entry.split('.')[0])
		config.entry[name] = `./src/scripts/${name}.ts`
		if (!hasEntry) {
			fs.writeFileSync(`${path.join(__dirname, './src/scripts')}/${name}.ts`, '')
		}
		config.plugins.push(new HtmlWebpackPlugin({
			template: `html-loader!./src/template/${item}`,
			filename: `../views/${item}`,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			},
			chunks: [name]
		}))
	})
	return config
}
module.exports = conf()
