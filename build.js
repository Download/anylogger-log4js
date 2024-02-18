import fs from 'fs'
import UglifyJS from 'uglify-js'
import { gzipSizeSync } from 'gzip-size'

// be cool and use anylogger-log4js to print the logging in the build of anylogger-log4js :)
import 'anylogger-log4js';
import anylogger from 'anylogger'
import log4js from "log4js";
const log = anylogger('anylogger-log4js')
log4js.getLogger('anylogger-log4js').level = 'debug'

var [ processName, script, command, ...args ] = process.argv
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
var v = pkg.version

;(function(){
  var data = fs.readFileSync(pkg.iife, 'utf8')

  if (!command || command == 'minify') {
    data = UglifyJS.minify(data);
    if (data.error) {
      return log('error', data)
    }
    data = data.code;
    fs.writeFileSync(pkg.min, data, 'utf8')
  }
  else {
    data = fs.readFileSync(pkg.min, 'utf8')
  }

  var min = data.length
  var gzip = gzipSizeSync(data)

  if (!command || command == 'minify') {
    log('info', 'created ' + pkg.min + ' (' + min + 'B, gzipped ~' + gzip + 'B)')
  }

  var av = pkg.devDependencies.anylogger.substring(1)
  var lv = pkg.devDependencies.log4js.substring(1)

  if (!command || command == 'docs') {
    var readme = fs.readFileSync('README.md', 'utf-8')
    readme = readme.replace(/minified \d\d\d bytes/g, `minified ${min} bytes`)
    readme = readme.replace(/\[\d\d\d\]\(#gzip-size\)/g, '[' + gzip + '](#gzip-size)')
    readme = readme.replace(/\<sub\>\<sup\>\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\<\/sup\>\<\/sub\>/g, `<sub><sup>${v}</sup></sub>`)
    readme = readme.replace(/anylogger-log4js\@\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\//g, `anylogger-log4js@${v}/`)
    readme = readme.replace(/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\//g, `anylogger@${av}/`)
    fs.writeFileSync('README.md', readme, 'utf8')
    log.info('updated readme')
  }
})()