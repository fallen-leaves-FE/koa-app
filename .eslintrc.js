module.exports = {
	'root': true,
	'parserOptions': {
		'parser': 'babel-eslint'
	},
	'env': {
		'browser': true
	},
	'extends': [
		'standard'
	],
	'plugins': [
		'promise',
		'html',
		'node',
		'import'
	],
	'rules': {
		'generator-star-spacing': 'off',
		'no-debugger': 'error',
		'indent': [
			'error',
			'tab'
		],
		'no-tabs': 'off',
		'no-return-await': 'off'
	}
}
