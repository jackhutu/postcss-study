import path from 'path'
import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'							//添加浏览器私有前缀
import postcssSimpleVars from 'postcss-simple-vars' //支持变量
import postcssNested from 'postcss-nested'	//支持嵌套
import postcssMixins from 'postcss-mixins'	//支持mixin
import cssgrace from 'cssgrace'		//兼容更低版本IE,实现了大部分常用的 IE Hack
import cssnext from 'cssnext'			//用下一代CSS书写方式兼容现在浏览器
import scss from 'postcss-scss'  //可以转换scss代码成css
import del from 'del'
import precss from 'precss' 		//可以在css文件中像写scss一样的语法结构//本身包含了一些其它插件
import sequence from 'gulp-sequence'
import sourcemaps from 'gulp-sourcemaps'


gulp.task('css',()=>{
	var processors = [
			autoprefixer({
	      browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 10"]
	    }),
			postcssSimpleVars,
			postcssNested,
			postcssSimpleVars,
	    cssnext(),
	    cssgrace
	]
	return gulp.src([
			path.join(__dirname, 'src/*.css'),
			path.join(__dirname, 'src/*.scss'),
			path.join('!'+ __dirname, 'src/precss.css')
		])
			.pipe(sourcemaps.init())
			.pipe(postcss(processors,{syntax: scss}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(path.join(__dirname,'dist')))
})

//precss 本身包含了一些插件
gulp.task('precss', function () {
  return gulp.src(path.join(__dirname, 'src/precss.css'))
    .pipe(sourcemaps.init())
    .pipe(
        postcss([
            require('precss')({ /* options */ })
        ])
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(__dirname,'dist')))

})

gulp.task('clean',()=>{
	return del([
			path.join(__dirname, 'dist'),
			path.join(__dirname, 'wpdist')
		])
})

gulp.task('watch', function(){
  gulp.watch('./src/*.css', ['css','precss','webpack'])
})

//在gulp中使用webpack
import webpack from 'webpack-stream'
import config from './webpack.config.babel'

gulp.task('webpack',()=>{
	return gulp.src(path.join(__dirname,'src/main.js'))
						.pipe(webpack(config))
						.pipe(gulp.dest(path.join(__dirname,'wpdist')))
})

gulp.task('default',sequence('watch',['css','precss'],'webpack'))
gulp.task('build',sequence('clean',['css','precss'],'webpack'))
