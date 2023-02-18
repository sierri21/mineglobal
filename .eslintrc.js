// eslint-disable-next-line no-undef
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/essential',
		'plugin:vue/vue3-recommended'
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'vue'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		// 'linebreak-style': [
		// 	'error',
		// 	'windows'
		// ],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'vue/no-v-html': 0
	}
}
