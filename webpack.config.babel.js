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
		path:path.join(__dirname,'webpack-dist'),
		filename:'[name].js'
	},
	module:{
		loaders:[
			{ test: /\.js$/, loader: 'babel'},
			//{ test: /cssnext\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!cssnext-loader') },
			{ test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') }
		]
	},
	postcss: function () {
	    return [autoprefixer, precss];
	},
	// cssnext: {
	//   browsers: "last 2 versions",
	// },
	plugins:[
		new ExtractTextPlugin('[name].css', { allChunks: true })
	]
}