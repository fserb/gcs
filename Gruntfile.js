/* global module */

module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      scripts: {
        files: [ 'src/**/*.js' ],
        tasks: [ 'build'],
        options: {
          interrupt: true,
        }
      }
    },

    eslint: {
      gcs: [ 'src/**/*.js', 'tests/**/*.js' ]
    },

    rollup: {
      options: {
        moduleName: 'gcs',
        format: 'umd',
      },

      gcs: {
        files: {
          'out/gcs.js' : [ 'src/gcs.js' ]
        },
        options: {
          sourceMap: 'inline'
        }
      },

      gcsdoc: {
        files: {
          'out/gcs.js' : [ 'src/gcs.js' ]
        },
        options: {
          sourceMap: ''
        }
      }
    },

    uglify: {
      options: {
      },
      gcs: {
        files: {
          'out/gcs.min.js': ['out/gcs.js']
        }
      }
    }
  });

  grunt.registerTask('package', ['uglify']);
  grunt.registerTask('build', ['rollup:gcs']);
  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('release', ['lint', 'build', 'package']);
  grunt.registerTask('export', ['release']);

  grunt.registerTask('default', ['lint', 'build']);
};
