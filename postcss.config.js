module.exports = {
	plugins: {
		'postcss-preset-env': {
			'autoprefixer': {
				overrideBrowserslist: ['last 2 version'],
				cascade: false
			}
		},
		'postcss-import': {},
		'postcss-url': {},
		'postcss-pxtorem': {
			remUnit: 75
		}
	}
}