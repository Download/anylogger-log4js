import replace from 'rollup-plugin-re'
import pkg from './package.json' assert { type: "json" }

export default [
	{
		input: pkg.main,
		output: [
      // commonjs build
			{ file: pkg.cjs,  format: 'cjs', strict: false },
		],
		external: [ 'anylogger', 'log4js' ],
	},
	{
		input: pkg.main,
		output: [
      // browser-friendly build
			{ file: pkg.iife,  format: 'iife', strict: false, globals: { anylogger: 'anylogger', debug: 'debug' } },
		],
		external: [ 'anylogger', 'log4js' ],
		plugins: [
			// remove import bloat from iife bundle
			replace({
				patterns: [
					{
						match: /anylogger-log4js/,
						test: 'import anylogger from \'anylogger\'',
						replace: '',
					}, {
						match: /anylogger-log4js/,
						test: 'import log4js from \'log4js\'',
						replace: '',
					},
				]
			})
		],
	},
];
