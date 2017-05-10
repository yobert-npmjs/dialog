var path = require('path')

module.exports = {
	name: 'main',
	entry: './src/main.js',
	output: {
		path: __dirname,
		filename: 'main_packed.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'base': path.resolve(__dirname, 'src'),
		},
	},
	module: {
		loaders: [{
			test:    /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				plugins: ['transform-runtime'],
				presets: ['es2015', 'react', 'stage-2'],
			}
		}, {
			test:   /\.json$/,
			loader: 'json'
		}],
	},

};
