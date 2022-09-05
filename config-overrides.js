const Dotenv = require('dotenv-webpack');

module.exports = function override(config, env) {
	return {
		...config,
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'sass-loader',
							options: {
								additionalData: `@import 'src/assets/scss/package/package.scss';`,
							},
						},
					],
				},
			],
		},

		plugins: [...(config.plugins || []), new Dotenv()],
	};
};
