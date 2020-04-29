const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
	filename: 'static/css/[id].[hash].css',
	allChunks: true
})

const conf = function () {
	const config = {
		mode: 'production',
		entry: {},
		output: {
			path: path.resolve(__dirname, './app'),
			filename: 'static/js/[name].[hash].js',
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
					test: /\.scss$/,
					use: extractSass.extract({
						use: [{
							loader: 'css-loader'
						}, {
							loader: 'sass-loader'
						}]
					})
				},
				{
					test: /\.(jpe?g|png|gif)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								name: '[name].[hash].[ext]',
								limit: 8196,
								outputPath: 'static/images/'
							}
						}
					]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: ['static/**/*', 'views/**/*']
			}),
			extractSass,
		]
	}
	const views = fs.readdirSync(path.join(__dirname, './template')).filter(item => (/.html$/).test(item))
	const entries = fs.readdirSync(path.join(__dirname, './src')).filter(item => (/.js$/).test(item))
	const components = fs.readdirSync(path.join(__dirname, './template/common')).filter(item => (/.html$/).test(item))
	components.forEach(item => {
		config.plugins.push(new HtmlWebpackPlugin({
			template: `html-loader!./template/common/${item}`,
			filename: `views/common/${item}`,
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
			filename: `views/${item}`,
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