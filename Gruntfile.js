// SPDX-FileCopyrightText: 2022 Samir Romdhani <samir.romdhani1994@gmail.com>
//
// SPDX-License-Identifier: MIT license

// https://github.com/vojtajina/grunt-bump
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-curl');
  
  grunt.initConfig({

    prompt: {
      patch: {
        options: {
          questions: [{
            config: 'gitmessage',
            type: 'input',
            message: 'Commit message for PATCH version bump:'
          }]
        }
      },
      minor: {
        options: {
          questions: [{
            config: 'gitmessage',
            type: 'input',
            message: 'Commit message for MINOR version bump:'
          }]
        }
      },
      major: {
        options: {
          questions: [{
            config: 'gitmessage',
            type: 'input',
            message: 'Commit message for MAJOR version bump:'
          }]
        }
      }
    },
    curl_whathecommit: {
      'https://t.co/tCCkddoA4m | git commit -F -': ''
    },
    bump: {
      options: {
        files: ['package.json', 'projects/scllib/package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'GIT:/ Version %VERSION%',
        commitFiles: ['-S','-a'],
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    }

  });

  grunt.registerTask('bump-patch', ['prompt:patch', 'bump:patch']);
  grunt.registerTask('bump-minor', ['prompt:minor', 'bump:minor']);
  grunt.registerTask('bump-major', ['prompt:major', 'bump:major']);
  grunt.registerTask('patch', ['bump:patch']);
  grunt.registerTask('minor', ['bump:minor']);
  grunt.registerTask('major', ['bump:major']);
  grunt.registerTask('whatthecommit', ['curl_whathecommit']);
  grunt.registerTask('commit', ['prompt:commit', 'bump']);
}