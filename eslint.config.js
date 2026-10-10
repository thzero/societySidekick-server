// Same rules as the @thzero libraries' eslint.config.mjs, so the server is held
// to what they are.
const nodeGlobals = {
	// library_common installs these onto the global String
	String: 'writable',
	Buffer: 'readonly',
	clearInterval: 'readonly',
	clearTimeout: 'readonly',
	console: 'readonly',
	performance: 'readonly',
	process: 'readonly',
	setInterval: 'readonly',
	setTimeout: 'readonly',
	structuredClone: 'readonly',
	URL: 'readonly'
};

export default [
	{
		// common is its own repository (societySidekick-common) and is linted there.
		ignores: [ 'node_modules/**', 'dist/**', 'common/**' ]
	},
	{
		files: [ '**/*.js' ],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: nodeGlobals
		},
		rules: {
			'no-undef': 'error',
			'use-isnan': 'error',
			// args is 'none' deliberately: base class methods declare a signature
			// for subclasses and often use none of it.
			'no-unused-vars': [ 'error', { args: 'none', ignoreRestSiblings: true } ],
			'no-bitwise': 'error',
			'eqeqeq': 'error',
			'no-dupe-class-members': 'error',
			'no-dupe-keys': 'error',
			'no-unreachable': 'error',
			'no-constant-condition': [ 'error', { checkLoops: false } ],
			'no-self-compare': 'error',
			'no-sequences': 'error',
			'no-useless-catch': 'error',
			'no-self-assign': 'error',
			'no-unused-expressions': 'error'
		}
	},
	{
		files: [ 'webpack.config.js' ],
		languageOptions: {
			sourceType: 'commonjs',
			globals: { ...nodeGlobals, __dirname: 'readonly', module: 'writable', require: 'readonly' }
		}
	}
];
