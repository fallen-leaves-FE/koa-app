const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		// parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true
		}
	},
	env: {
		browser: true
	},
	extends: [
		'plugin:@typescript-eslint/recommended'
	],
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		'no-tabs': 'off',
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'comma-dangle': 'error',
		semi: ['error', 'never'],
		'jsx-quotes': ['error', 'prefer-double'],
		'comma-spacing': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'arrow-spacing': 'error',
		'block-spacing': ['error', 'always'],
		'object-curly-spacing': ['error', 'always'],
		'switch-colon-spacing': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': 'error',
		'spaced-comment': 'error',
		'no-trailing-spaces': 'error',
		'space-infix-ops': ['error', { int32Hint: false }],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-var-requires': 'off'
	}
})
