const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

const extractSass = new MiniCssExtractPlugin({
	filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
    chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
})

const conf = function () {
	const config = {
		mode: process.env.NODE_ENV,
		entry: {},
		output: {
			path: path.resolve(__dirname, './app/static'),
			filename: devMode ? 'js/[name].js' : 'js/[name].[hash].js',
			chunkFilename: devMode ? 'js/[id].js' : 'js/[id].[hash].js',
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
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					]
				},
				{
					test: /\.(scss|sass)$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader'
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
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: ['js/**/*', 'css/**/*', 'images/**/*']
			}),
			extractSass,
			new OptimizeCssAssetsPlugin()
		]
	}
	const views = fs.readdirSync(path.join(__dirname, './template')).filter(item => (/.html$/).test(item))
	const entries = fs.readdirSync(path.join(__dirname, './src')).filter(item => (/.js$/).test(item))
	const components = fs.readdirSync(path.join(__dirname, './template/common')).filter(item => (/.html$/).test(item))
	components.forEach(item => {
		config.plugins.push(new HtmlWebpackPlugin({
			template: `html-loader!./template/common/${item}`,
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
		config.entry[name] = `./src/${name}.js`
		if (!hasEntry) {
			fs.writeFileSync(`${path.join(__dirname, './src')}/${name}.js`, '')
		}
		config.plugins.push(new HtmlWebpackPlugin({
			template: `html-loader!./template/${item}`,
			filename: `../views/${item}`,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		}))
	})
	return config
}
module.exports = conf()