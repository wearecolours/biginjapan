module.exports = function(grunt) {

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			dist: {
				files: {
					'dist/biginjapan.min.js': ['src/biginjapan.js']
				}
			}
		},

		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			dist: {
				expand: true,
				flatten: true,
				src: [
					'src/biginjapan.js'
				],
    			dest: 'demo/',
			}
		},

		// http://www.browsersync.io/docs/grunt/
		browserSync: {
			bsFiles: {
				src : [
					'demo/biginjapan.js'
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
					'src/biginjapan.js'
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
