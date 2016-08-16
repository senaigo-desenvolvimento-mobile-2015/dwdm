/**
* Módulos GRUNT ambiente de desenvolvimento
*/
(function(){
	"use strict";

	var pkgJson = require('./package.json');

	module.exports = function (grunt) {
		var gruntConfig = {			
			uglify: {
				options: {
					preserveComments: false,
					mangle: true,
					beautify:false,
					report: 'gzip'
				},
				my_target: {
					files: {
						'exercicio-aula-2-dist/AppConfig.js': 'exercicio-aula-2/AppConfig.js',
						'exercicio-aula-2-dist/app/app.js': 'exercicio-aula-2/app/app.js',
						'exercicio-aula-2-dist/app/todo/Todo.js': 'exercicio-aula-2/app/todo/Todo.js',
						'exercicio-aula-2-dist/app/todo/TodoManager.js': 'exercicio-aula-2/app/todo/TodoManager.js'						
					}
				}
			},
			htmlmin: {
				dist: {
					options: {
						removeComments: true,
						collapseWhitespace: true
					},
					files: {
						'exercicio-aula-2-dist/index.html': 'exercicio-aula-2/index.html'						
					}
				}
			},
			cssmin: {
				options: {
					shorthandCompacting: false,
					roundingPrecision: -1
				},
				target: {
					files: {
						'exercicio-aula-2-dist/css/style.css': 'exercicio-aula-2/css/style.css'						
					}
				}
			},
			copy: {
				main: {
					files: [
						{expand: true, src: ['exercicio-aula-2/lib/bootstrap/dist/**'], dest: 'exercicio-aula-2-dist/'},												
						{expand: true, src: ['exercicio-aula-2/lib/requirejs/require.js'], dest: 'exercicio-aula-2-dist/'},
						{expand: true, src: ['exercicio-aula-2/lib/jquery/dist/jquery.min.js'], dest: 'exercicio-aula-2-dist/'}
					],
				},
			}
		};

		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-htmlmin');
		grunt.loadNpmTasks('grunt-contrib-cssmin');		
		grunt.loadNpmTasks('grunt-contrib-copy');		
		grunt.initConfig(gruntConfig);

		var keys  = Object.keys(gruntConfig);
		var tasks = [];
		var i = 1;
		for(i in keys){
			tasks.push(keys[i]);
		}
		grunt.registerTask('default', tasks);		
	};

}());