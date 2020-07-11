const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': ['src/assets/styles/*.scss']
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': ['src/assets/scripts/*.js']
        }
      }
    },
 //    imagemin:{
 //      	release:{
 //          	files:[{
 //              	expand:true,
 //              	['dist/images/*']:['src/assets/images/**']
 //          	}],
 //          	options:{
 //              	optimizationLevel:3
 //          	}
 //      	}
	// },
	cssmin: {
	    target: {
	        files: [{
	            expand: true,
	            cwd: 'dist/css', //需要压缩的css路径
	            src: '*.css', //需要压缩的css
	            dest:'dist/css', //压缩之后的路径
	            ext: '.min.css' //压缩之后的css后缀名
	        }]
	    }
	},
    watch: {
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass']
      }
    }
  })

  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务

  grunt.registerTask('default', ['sass', 'babel','cssmin', 'watch'])
}