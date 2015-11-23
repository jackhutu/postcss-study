import path         from 'path'
import webpack      from 'webpack'
import autoprefixer from 'autoprefixer'
import precss       from 'precss'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
	entry:[
		path.join(__dirname,'src/main.js')
	],
	output:{
		path:path.join(__dirname,'wpdist'),
		filename:'[name].js'
	},
	module:{
		loaders:[
			{ test: /\.js$/, loader: 'babel'},
			{ test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') }
		]
	},
	postcss: function () {
	    return [autoprefixer, precss];
	},
	plugins:[
		new ExtractTextPlugin('style.css', { allChunks: true })
	]
}