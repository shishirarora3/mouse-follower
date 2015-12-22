var gulp = require('gulp'),
  gutil = require('gulp-util' ),
  source = require('vinyl-source-stream' ),
  browserify = require('browserify' ),
  watchify = require('watchify' ),
  reactify = require('reactify' ),
  livereload = require('gulp-livereload'),
  chalk = require('chalk'),
  notifier = require('node-notifier'),
  NotificationCenter = require('node-notifier').NotificationCenter;
// Error reporting function
function mapError(err) {
  var message,
  errorTitle,
  filePath;
  if (err.fileName) {
    errorTitle = 'Regular error';
    message = chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description);
    // Regular error
    filePath = err.fileName.replace(__dirname + '/src/js/', '')
    
  } else {
    // Browserify error..
    errorTitle = 'Browserify error..';
    message = chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message);
    
  }
  
gutil.log( message );
  new NotificationCenter().notify({
      'title': err.name + ' |Line  ' + err.lineNumber,
      'message': err.description,
      'sound': 'Purr', // Case Sensitive string of sound file (see below) 
      'icon': 'Terminal Icon', // Set icon? (Absolute path to image) 
      /*'sender': 'com.sublimetext.2'*//*err.fileName.replace(__dirname + '/src/js/', ''),*/ // URL to open on click 
      'execute' : 'open ' + filePath
    });
}

gulp.task('default', function(){
  
  var bundler = watchify(browserify({
    entries: ['./src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));
  function build(file) {
    if ( file ) {
      gutil.log( 'Recompiling ' + file );
      new NotificationCenter().notify({
      'title': 'Recompiling:  ' + (file+'').split('/').pop(),
      'message': 'chilax',
      'execute' : 'open ' + file
      });
    }
    return bundler
      .bundle()
      .on( 'error', mapError /*gUtil.log.bind( gUtil, 'Browzerify Error' )*/ )
      .pipe( source( 'main.js' ) )//equal to concat
      .pipe( gulp.dest( './' ) );

    }
  build();
  bundler.on('update',build);
});