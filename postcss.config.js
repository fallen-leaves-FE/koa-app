module.exports = {
	plugins: {
		'postcss-preset-env': {
			'autoprefixer': {
				overrideBrowserslist: ['last 6 version'],
				cascade: false
			}
		},
		'postcss-import': {},
		'postcss-url': {},
		'postcss-minify': {},
		'postcss-px-to-viewport': {
			unitToConvert: 'px',
			viewportWidth: 750,
			unitPrecision: 5,
			propList: ['*'],
			viewportUnit: 'vw',
			fontViewportUnit: 'vw',
			selectorBlackList: [],
			minPixelValue: 1,
			mediaQuery: false,
			replace: true,
			exclude: undefined,
			include: undefined,
			landscape: false,
			landscapeUnit: 'vw',
			landscapeWidth: 1136
		}
	}
}
