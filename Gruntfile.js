module.exports = function(grunt){

  grunt.initConfig({
	clean : {
		  dist:['./orion/client/build/**/*','build']
	},
    pkg: grunt.file.readJSON('package.json'),
	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> <%= pkg.contexts.first %> */\n',
	footer: '/* By Kulwant Singh */\n',
	path: {
		src: {
			html:['./orion/client/index.tmpl.html'],
			js : './orion/client/**/*.js',
			css: './orion/client/**/*.css'
		},
		dest: {
			html: './orion/client/index.html',
			js : './orion/client/build/app.js',
			jsMin: './orion/client/build/app.min.js',
			cssmin: './orion/client/build/main.min.css'
		}
	},
	
	/*	
	 * Compact format 
	 *  
	 * */
    uglify: {
      options: {
    	soureMap: true,
		//compress: true,
		mangle:true,
		sourceMapIn: '<%= path.dest.js %>.map',
        banner: '<%= banner %>',
		footer: '<%= footer %>'
      },
      build: {
		// expand:true,
        src: '<%= path.src.js %>',
        dest: '<%= path.dest.jsMin %>'
		// ext:'.js'
      }
    },
    
    /*
     * File array format 
     * 
    */
	cssmin: {
	  target: {
		files: [{
		  src: '<%= path.src.css %>',
		  dest: '<%= path.dest.cssmin %>',
		  ext: '.min.css'
		}]
	  }
	},
	
	/*
	 * File Object format 
	 * 
	*/
	processhtml:{
		build:{
			files:{
				'<%= path.dest.html %>' : '<%= path.src.html %>'
			}
		}
	},
	
	/*
	 * Array of File Object
	 * 
	*/
	compress: {
		  main: {
		    options: {
		      archive: 'build.zip'
		    },
		    files: [
			  {expand:true,src: ['main/**/*'], dest: '../build/'}, // includes files in path
			  {expand:true,src: ['test/**/*'], dest: '../build/'}, // includes files in path and its subdirs
			  
			  {expand: true, src: ['orion/server/**/*'], dest: '../build/'}, // makes all src relative to cwd
			  {expand: true, src: ['orion/*'], dest: '../build/',filter:'isFile'}, // makes all src relative to cwd
			  {expand: true, src: ['orion/client/build/**/*'], dest: '../build/'}, // makes all src relative 
			  {expand: true, src: ['orion/client/index.html'], dest: '../build/'}, // makes all src relative 
			  {expand: true, src: ['*'], dest: '../build/',filter:'isFile'}, // makes all src relative  single level
			]
		  }
		}
  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-compress');
  
  grunt.registerTask('default', ['clean','uglify', 'cssmin', 'processhtml','compress']);
  grunt.registerTask('build', ['compress']);

};