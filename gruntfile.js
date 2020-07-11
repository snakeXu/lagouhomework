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
            dest: 'dist/assets/styles',
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
            dest: 'dist/assets/scripts',
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
            src: "*.html",
            dest: 'dist'
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
          'dist/assets/styles/*.css',
          'dist/assets/scripts/*.js',
          'dist/*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir:'dist/',
          routes: {
            '/node_modules': 'node_modules'
          }
        }
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
  loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务

  grunt.registerTask('default', ['clean','sass', 'babel', 'web_swig', 'browserSync', 'watch'])
}