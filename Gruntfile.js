module.exports = function(grunt) {

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			dist: {
				files: {
					'dist/jquery.biginjapan.min.js': ['src/jquery.biginjapan.js']
				}
			}
		},

		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			dist: {
				expand: true,
				flatten: true,
				src: [
					'src/jquery.biginjapan.js'
				],
    			dest: 'demo/',
			}
		},

		// http://www.browsersync.io/docs/grunt/
		browserSync: {
			bsFiles: {
				src : [
					'demo/jquery.biginjapan.js'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./demo"
				}
			},
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			js: {
				files: [
					'src/jquery.biginjapan.js'
				],
				tasks: ['copy']
			}
        },
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-notify'); // https://github.com/dylang/grunt-notify

	// Task to run when doing 'grunt' in terminal.
	grunt.registerTask('default', [
		'uglify',
		'copy',
		'browserSync',
		'watch'
	]);
};
