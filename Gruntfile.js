/**
* Módulos GRUNT ambiente de desenvolvimento
*/
(function(){
	"use strict";	

	module.exports = function (grunt) {

        grunt.initConfig({
            pkg : grunt.file.readJSON("package.json"),
            dist: "dist/<%=pkg.name%>-<%=pkg.version%>",
            uglify: {
				options: {
					preserveComments: false,
					mangle: true,
					beautify:false,
					report: 'gzip'
				},
				my_target: {
					files: {
						'<%=dist%>/AppConfig.js': 'exercicio-aula-2/AppConfig.js',
						'<%=dist%>/app/app.js': 'exercicio-aula-2/app/app.js',
						'<%=dist%>/app/todo/Todo.js': 'exercicio-aula-2/app/todo/Todo.js',
						'<%=dist%>/app/todo/TodoManager.js': 'exercicio-aula-2/app/todo/TodoManager.js'						
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
						'<%=dist%>/index.html': 'exercicio-aula-2/index.html'						
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
						'<%=dist%>/css/style.css': 'exercicio-aula-2/css/style.css'						
					}
				}
			},
			copy: {
				main: {
					files: [
						{expand: true, cwd: 'exercicio-aula-2', src: ['lib/bootstrap/dist/**'], dest: '<%=dist%>/'},												
						{expand: true, cwd: 'exercicio-aula-2', src: ['lib/requirejs/require.js'], dest: '<%=dist%>/'},
						{expand: true, cwd: 'exercicio-aula-2', src: ['lib/jquery/dist/jquery.min.js'], dest: '<%=dist%>/'},
						{expand: true, cwd: 'exercicio-aula-2', src: ['manifest.webmanifest'], dest: '<%=dist%>/'}
					],
				},
			}
        });
        grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-htmlmin');
		grunt.loadNpmTasks('grunt-contrib-cssmin');		
		grunt.loadNpmTasks('grunt-contrib-copy');

        grunt.registerTask('default', ['uglify', 'htmlmin', 'cssmin', 'copy']);  
        		
	};

}());