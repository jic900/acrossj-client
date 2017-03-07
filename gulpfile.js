/**
 * Created by E84266 on 2/26/2017.
 */

/* GULP TASK SUMMARY
 'admin'     - This task will compile the angular admin interface, serve the admin interface static files, and load the
 admin node server. After loading this task will also create a file watch on the angular admin and
 the admin server and reload if files are changed. Angular web page will automatically refresh on
 file save via livereload.

 'public'    - This task will compile the angular public interface, serve the public interface static files, and load the
 public node server. After loading this task will also create a file watch on the angular public and
 the public server and reload if files are changed. Angular web page will automatically refresh on
 file save via livereload.

 'build'     - This task will create a full build of the project.

 'dist'      - This task will do a full build then generate the distribution archive of
 this project.

 'clean'     - This task will remove /build and /logs directories that are used during development. /dist is not removed.

 'extract'   - Extract translation text

 */

var requireDir = require('require-dir'),
    gulp = require('gulp'),
    clean = require('gulp-clean');

var tasks = requireDir('./gulp/tasks');  // load all tasks in ./tasks directory

// define composite tasks
gulp.task('default', ['dist']);
gulp.task('build', ['admin:build', 'public:build', 'node:build']);
gulp.task('extract', ['gettext:extract']);

// global var holding gulp default directory
//gulpDir = process.cwd();


// remove the build path