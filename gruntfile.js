const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: [{
            expand: true,
            cwd: 'src/assets/styles',
            src: ['*.scss'],
            dest: 'temp/assets/styles',
            ext: '.css'
        }]
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: [{
            expand: true,
            cwd: 'src/assets/scripts',
            src: ['*.js'],
            dest: 'temp/assets/scripts',
            ext: '.js'
        }]
      }
    },
   //  imagemin:{
   //    	release:{
   //        	files:[{
   //            	expand:true,
   //            	['dist/images/*']:['src/assets/images/**']
   //        	}],
   //        	options:{
   //            	optimizationLevel:3
   //        	}
   //    	}
	  // },
	  // cssmin: {
	  //   target: {
	  //       files: [{
	  //           expand: true,
	  //           cwd: 'dist/css', //需要压缩的css路径
	  //           src: '*.css', //需要压缩的css
	  //           dest:'dist/css', //压缩之后的路径
	  //           ext: '.min.css' //压缩之后的css后缀名
	  //       }]
	  //   }
	  // },
    web_swig:{
      options: {
        swigOptions: {
          cache: false
        },
        getData: function(tpl){
          return data
        }
      },
      main: {
        files: [
          {
            expand: true,
            cwd: "src/",
            src: "**.html",
            dest: 'temp'
          }
        ]
      }  
    },
    clean: {
      files: 'dist/**' 
    },
    browserSync: {
      bsFiles: {
        src: [
          'temp/assets/styles/*.css',
          'temp/assets/scripts/*.js',
          'temp/*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir:'temp/',
          routes: {
            '/node_modules': 'node_modules'
          }
        }
      }
    },
    // useminPrepare: {
    //   html: 'dist/*.html',
    //   options: {
    //     dest: 'dist'
    //   }
    // },
    // useref:{
    //   html: 'dist/*.html',
    //   temp: ['dist','.'],
    //   dest: 'dist'
    // },
    usemin: {
      html: 'temp/*.html',
      css: 'temp/assets/styles/*.css',
      options: {
        assetsDirs: ['temp','.']
      }
    },
    htmlmin: {
      file: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          // true would impact styles with attribute selectors
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: {
          expand: true,
          cwd: 'temp',
          src: ['**/*.html'],
          dest: 'dist'
        }
      }
    },
    uglify: {//压缩js文件
      payment: {
        files: [{
          expand: true,
          cwd: 'temp/assets/scripts', //js源文件目录
          src: '*.js', //所有js文件
          dest: 'dist/assets/scripts' //输出到此目录下
        }]
      }
    },
    cssmin: { //压缩css
      payment: {
        files:[
        {
          expand: true,
          cwd: 'temp/assets/styles', //js源文件目录
          src: '*.css', //所有js文件
          dest: 'dist/assets/styles' //输出到此目录下
        }
        ]
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
      },
      html: {
        files: ['src/*.html'],
        tasks: ['web_swig']
      }
    }
  })
  loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务
  // grunt.loadNpmTasks('grunt-htmlmin');
  // grunt.registerTask('htmlmin',)
  // grunt.registerTask('default', ['clean', 'sass', 'babel', 'web_swig', 'htmlmin', 'usemin', 'browserSync', 'watch'])
  grunt.registerTask('default', ['clean', 'sass', 'babel', 'web_swig', 'uglify', 'cssmin', 'browserSync', 'watch'])
}