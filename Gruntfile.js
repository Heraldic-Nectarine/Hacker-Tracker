module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ' '
      },
      dist: {
        
        src: ['client/*.js'],
        // the location of the resulting JS file
        dest: 'dist/trackerConcat.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/tracker.min.js': ['dist/trackerConcat.js']
        }
      }
    },

    jshint: {
      files: [
        // Add filespec list here
        'server/*.js', 'client/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        
      }
    },

    cssmin: {
        // Add filespec list here
        target: {
          files: {
            'dist/minifiedcss.css': ['style.css']
          }
        }
        
    },

    watch: {
      scripts: {
        files: [
          'client/*.js',
          'server/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // grunt.registerTask('test', [
  //   'mochaTest'
  // ]);

  // grunt.registerTask('build', [ 'jshint', 'concat', 'uglify' , 'cssmin'
  // ]);

  // grunt.registerTask('upload', function(n) {
  //   if(grunt.option('prod')) {
      
  //   } else {
  //     grunt.task.run([ 'server-dev' ]);
  //   }
  // });

  // grunt.registerTask('deploy', [
      
  //     'test', 'build', 'upload'
  // ]);


};
