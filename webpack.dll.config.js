const webpack = require('webpack')
const path = require('path')
// const dependencies = require('./package.json').dependencies

// const vendors = [];
// for (let x in dependencies) {
// 	if (x === 'zmexamda') return;
// 	vendors.push(x)
// 	console.log(vendors)
// }
console.log('-------------------------------------------');
const library = '[name]_[chunkhash]'
module.exports = {
	mode: 'production',
	entry: {
		// vendors: vendors,
		react: ['react', 'react-dom']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, 'dll'),
		library
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, 'dll/[name]-manifest.json'),
			// same with library name in output
			name: library,
			context: __dirname
		}),
	]
}
